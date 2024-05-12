import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { PublicTables } from 'src/types/database.types';
import { CombinationElementType } from './dancing.types';

@Injectable()
export class DancingService {
  constructor(private supabaseService: SupabaseService) {}

  public async checkDanceExists(danceId: PublicTables['dances']['Row']['id']) {
    const { data, error } = await this.supabaseService.client
      .from('dances')
      .select('*')
      .eq('id', danceId);

    if (error) throw error;

    if (!data || data.length === 0) {
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
    danceId: number,
    type: string,
    difficulty: number = 1,
    previousId?: number,
  ): Promise<PublicTables['combination_elements']['Row'][]> {
    await this.checkDanceExists(danceId);

    // Initial query to fetch elements of the specific type and difficulty
    let query = this.supabaseService.client
      .from('combination_elements')
      .select('*')
      .eq('dance_id', danceId)
      .eq('type', type)
      .lte('difficulty', difficulty);

    if (previousId) {
      // Fetch constraints that involve the previous element
      const { data: constraintsData, error: constraintsError } =
        await this.supabaseService.client
          .from('combination_element_constraints')
          .select('*')
          .or(`element_1.eq.${previousId},element_2.eq.${previousId}`);

      if (constraintsError) throw constraintsError;

      const forbiddenElements = constraintsData
        .filter(
          (constraint) =>
            !constraint.is_positive && constraint.element_1 === previousId,
        )
        .map((constraint) => constraint.element_2);

      const requiredElements = constraintsData
        .filter(
          (constraint) =>
            constraint.is_positive && constraint.element_1 === previousId,
        )
        .map((constraint) => constraint.element_2);

      if (requiredElements.length > 0) {
        // Include only required elements if there are any
        query = query.in('id', requiredElements);
      }
      if (forbiddenElements.length > 0) {
        // Exclude forbidden elements if no required elements are specified
        query = query.not('id', 'in', `(${forbiddenElements})`);
      }
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

  public async addConstraint() {}
}
