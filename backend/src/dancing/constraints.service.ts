import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { PublicTables } from 'src/types/database.types';

@Injectable()
export class ConstraintsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  public async addCombinationElementConstraint(
    combinationElementConstraint: PublicTables['combination_element_constraints']['Insert'],
  ) {
    const { error } = await this.supabaseService.client
      .from('combination_element_constraints')
      .insert(combinationElementConstraint);
    if (error) throw error;
  }
}
