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
    previousId: PublicTables['dances']['Row']['id'] = null,
  ): Promise<PublicTables['combination_elements']['Row'][]> {
    await this.checkDanceExists(danceId);

    // Query to fetch all elements of a specific type
    let query = this.supabaseService.client
      .from('combination_elements')
      .select('*')
      .eq('dance_id', danceId)
      .eq('type', type);

    // If a previous element is specified, filter based on constraints
    if (previousId) {
      // Fetch constraints that apply to the previous element
      const constraints = await this.supabaseService.client
        .from('combination_element_constraints')
        .select('*')
        .eq('element_1', previousId);

      const forbiddenIds = [];
      const requiredIds = [];

      constraints.data.forEach((constraint) => {
        if (constraint.type_forbid) {
          // If the constraint forbids this combination, add to forbidden list
          forbiddenIds.push(constraint.element_2);
        } else {
          // If the constraint requires this combination, add to required list
          requiredIds.push(constraint.element_2);
        }
      });

      if (requiredIds.length > 0) {
        // If there are required elements, filter to include only these
        query = query.in('id', requiredIds);
      }
      if (forbiddenIds.length > 0) {
        // Exclude any forbidden elements if no required elements are specified
        query = query.not('id', 'in', `(${forbiddenIds})`);
      }
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  public async getElementsForDanceOrThrow(
    danceId: PublicTables['dances']['Row']['id'],
    type: CombinationElementType,
    previousId: PublicTables['dances']['Row']['id'] = null,
  ): Promise<PublicTables['combination_elements']['Row'][]> {
    const results = await this.getElementsForDance(danceId, type, previousId);

    if (results.length === 0) {
      throw new NotFoundException(
        `${type} for danceId ${danceId} with previousId ${previousId} not found`,
      );
    }

    return results;
  }
}
