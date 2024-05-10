import { Injectable } from '@nestjs/common';
import { DancingService } from './dancing.service';
import { Combination } from './dancing.types';
import { getRandomElement } from 'src/utils/random';
import { PublicTables } from 'src/types/database.types';

@Injectable()
export class GenerationService {
  constructor(private dancingService: DancingService) {}

  public async generateCombination(
    danceId: number,
    length: number,
  ): Promise<Combination> {
    await this.dancingService.checkDanceExists(danceId);
    const elements = {
      moves: await this.dancingService.getElementsForDance(danceId, 'move'),
      positions: await this.dancingService.getElementsForDance(
        danceId,
        'position',
      ),
      transitions: await this.dancingService.getElementsForDance(
        danceId,
        'transition',
      ),
    };

    let combination: Combination = [];
    let lastType: string = null;
    let nextElement: PublicTables['combination_elements']['Row'];

    while (combination.length < length) {
      let nextType =
        combination.length === 0
          ? 'position'
          : this.determineNextType(lastType);

      const nextElement = this.determineNextElement(elements[`${nextType}s`]);

      combination.push(nextElement);
      lastType = nextType;
    }
    return combination;
  }

  private determineNextType(lastType: string): string {
    // Determines the type of the next element based on the last element's type
    if (lastType === 'position') {
      return 'transition'; // A transition must follow a position
    } else {
      // Randomly decide between 'move', 'position', and 'transition', with more bias towards 'move'
      return getRandomElement(
        ['move', 'position', 'transition'],
        [0.75, 0.1, 0.15],
      );
    }
  }

  private determineNextElement(
    applicableElements: PublicTables['combination_elements']['Row'][],
  ): PublicTables['combination_elements']['Row'] {
    if (applicableElements.some((el) => Number.isNaN(el.redancability))) {
      return getRandomElement(applicableElements);
    } else {
      return getRandomElement(
        applicableElements,
        applicableElements.map((el) => el.redancability),
      );
    }
  }
}
