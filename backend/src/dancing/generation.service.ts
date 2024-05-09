import { Injectable } from '@nestjs/common';
import { DancingService } from './dancing.service';
import { Combination, CombinationElement } from './dancing.types';
import { getRandomElement } from 'src/utils/random';

@Injectable()
export class GenerationService {
  constructor(private dancingService: DancingService) {}

  public async generateCombination(
    danceId: number,
    length: number,
  ): Promise<Combination> {
    const elements = {
      moves: await this.dancingService.getMovesForDance(danceId),
      positions: await this.dancingService.getPositionsForDance(danceId),
      transitions: await this.dancingService.getTransitionsForDance(danceId),
    };

    let combination: CombinationElement[] = [];
    let lastType: string = null;
    let lastElement: string = null;

    while (combination.length < length) {
      const nextType =
        combination.length > 0
          ? this.determineNextType(lastElement, lastType)
          : 'position';
      let nextElement = this.selectElementBasedOnType(
        nextType,
        lastElement,
        elements,
      );

      combination.push(nextElement);
      lastElement = nextElement;
      lastType = nextType;
    }
    return combination;
  }

  private determineNextType(lastElement: any, lastType: string): string {
    if (lastType === 'position') {
      return 'transition';
    } else {
      return getRandomElement(
        ['move', 'position', 'transition'],
        [0.7, 0.1, 0.2],
      );
    }
  }

  private selectElementBasedOnType(
    type: string,
    lastElement: any,
    elements: any,
  ): any {
    const typeElements = elements[`${type}s`];

    if (lastElement && Math.random() < lastElement.redancability) {
      return lastElement;
    }
    return getRandomElement(typeElements);
  }
}
