import { Injectable } from '@nestjs/common';
import { DancingService } from './dancing.service';
import { Combination, CombinationElement } from './dancing.types';
import { Database } from 'src/types/supabase.types';
import { PublicTables } from 'src/types/database.types';

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
        const element = elements[Math.floor(Math.random() * elements.length)];
        combination.push(element);
      }
    }

    return combination;
  }
}
