import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { PublicTables } from 'src/types/database.types';
import { CombinationElementType } from './dancing.types';

@Injectable()
export class DancingService {
  constructor(private supabaseService: SupabaseService) {}

  public async checkDanceExists(danceId: PublicTables['dances']['Row']['id']) {
    const { data } = await this.supabaseService.client
      .from('dances')
      .select('*')
      .eq('id', danceId);

    if (data.length === 0) {
      throw new NotFoundException(`Dance ${danceId} not found`);
    }
  }

  public async getDances(): Promise<PublicTables['dances']['Row'][]> {
    const { data, error } = await this.supabaseService.client
      .from('dances')
      .select('*');
    if (error) throw error;
    return data;
  }

  public async getElementsForDance(
    danceId: PublicTables['dances']['Row']['id'],
    type: CombinationElementType,
    difficulty: number = 1,
    previousId: PublicTables['dances']['Row']['id'] = null,
  ): Promise<PublicTables['combination_elements']['Row'][]> {
    await this.checkDanceExists(danceId);

    // Query to fetch all elements of a specific type
    let query = this.supabaseService.client
      .from('combination_elements')
      .select('*')
      .eq('dance_id', danceId)
      .eq('type', type)
      .lte('difficulty', difficulty);

    // If a previous element is specified, filter based on constraints
    if (previousId) {
      // Fetch constraints that apply to the previous element
      const { data, error } = await this.supabaseService.client
        .from('combination_element_constraints')
        .select('*')
        .eq('element_1', previousId);

      // Exclude any forbidden elements if no required elements are specified
      query = query.not('id', 'in', `(${data.map((el) => el.element_2)})`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  public async getElementsForDanceOrThrow(
    danceId: PublicTables['dances']['Row']['id'],
    type: CombinationElementType,
    difficulty: number = 1,
    previousId: PublicTables['dances']['Row']['id'] = null,
  ): Promise<PublicTables['combination_elements']['Row'][]> {
    const results = await this.getElementsForDance(
      danceId,
      type,
      difficulty,
      previousId,
    );

    if (results.length === 0) {
      throw new NotFoundException(
        `${type} for danceId ${danceId} with previousId ${previousId} not found`,
      );
    }

    return results;
  }
}
