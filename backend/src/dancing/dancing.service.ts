import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { PublicTables } from 'src/types/database.types';

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
    type: 'transition' | 'move' | 'position',
  ): Promise<PublicTables['combination_elements']['Row'][]> {
    await this.checkDanceExists(danceId);

    const { data, error } = await this.supabaseService.client
      .from('combination_elements')
      .select('*')
      .eq('dance_id', danceId)
      .eq('type', type);

    if (error) throw error;
    return data;
  }
}
