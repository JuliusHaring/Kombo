import { Injectable } from '@nestjs/common';
import { DancingService } from './dancing.service';
import { Combination } from './dancing.types';

@Injectable()
export class GenerationService {
  constructor(private dancingService: DancingService) {}

  public async generateCombination(
    danceId: number,
    length: number,
  ): Promise<Combination> {
    const elementRetrievers = [
      () => this.dancingService.getMovesForDance(danceId),
      () => this.dancingService.getPositionsForDance(danceId),
      () => this.dancingService.getTransitionsForDance(danceId),
    ];
    const combination: Combination = [];

    while (combination.length < length) {
      const elementRetriever =
        elementRetrievers[Math.floor(Math.random() * elementRetrievers.length)];
      const elements = await elementRetriever();

      if (elements.length > 0) {
        const selectedElement = this.simpleRandomSelection(elements);
        combination.push(selectedElement);
      }
    }

    return combination;
  }

  private simpleRandomSelection(elements: Array<any>): any {
    // Adjusted selection logic
    if (!elements[0].redancability) {
      // If there's no redancability field, select randomly
      return elements[Math.floor(Math.random() * elements.length)];
    } else {
      // If there's a redancability field, use it to influence the selection
      const totalWeight = elements.reduce(
        (acc, el) => acc + el.redancability,
        0,
      );
      let random = Math.random() * totalWeight;

      for (const element of elements) {
        random -= element.redancability;
        if (random <= 0) {
          return element;
        }
      }
      // Fallback to first element if random selection fails
      return elements[0];
    }
  }
}
