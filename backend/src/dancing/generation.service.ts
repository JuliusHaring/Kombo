import { Injectable } from '@nestjs/common';
import { DancingService } from './dancing.service';
import { Combination, CombinationElementType } from './dancing.types';
import { getRandomElement } from 'src/utils/random';
import { PublicTables } from 'src/types/database.types';
import { NotFoundError } from 'rxjs';

@Injectable()
export class GenerationService {
  constructor(private dancingService: DancingService) {}

  public async generateCombination(
    danceId: number,
    length: number,
    difficulty: number = 1,
  ): Promise<Combination> {
    await this.dancingService.checkDanceExists(danceId);

    let combination: Combination = [];
    let lastType: string = null;

    while (combination.length < length) {
      let nextType: CombinationElementType =
        combination.length === 0
          ? 'position'
          : this.determineNextType(lastType);

      const lastElementId =
        combination.length === 0
          ? null
          : combination[combination.length - 1].id;

      const applicableElements =
        await this.dancingService.getElementsForDanceOrThrow(
          danceId,
          nextType,
          difficulty,
          lastElementId,
        );

      const nextElement = this.determineNextElement(applicableElements);

      combination.push(nextElement);
      lastType = nextType;
    }
    return combination;
  }

  private determineNextType(lastType: string): CombinationElementType {
    if (lastType === 'transition') {
      return 'move';
    } else {
      return getRandomElement(
        ['move', 'position', 'transition'],
        [0.75, 0.1, 0.15],
      );
    }
  }

  private determineNextElement(
    applicableElements: PublicTables['combination_elements']['Row'][],
  ): PublicTables['combination_elements']['Row'] {
    if (applicableElements.some((el) => !el.redancability)) {
      return getRandomElement(applicableElements);
    } else {
      return getRandomElement(
        applicableElements,
        applicableElements.map((el) => el.redancability),
      );
    }
  }
}
