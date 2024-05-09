import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { PublicTables } from 'src/types/database.types';

@Injectable()
export class DancingService {
  constructor(private supabaseService: SupabaseService) {}

  public async getDances(): Promise<PublicTables['dances']['Row'][]> {
    const { data, error } = await this.supabaseService.client
      .from('dances')
      .select('*');
    if (error) throw error;
    return data;
  }

  public async getTransitionsForDance(
    danceId: PublicTables['dances']['Row']['id'],
  ): Promise<PublicTables['transitions']['Row'][]> {
    const { data, error } = await this.supabaseService.client
      .from('transitions')
      .select('*')
      .eq('dance_id', danceId);

    if (error) throw error;
    return data;
  }

  public async getMovesForDance(
    danceId: PublicTables['dances']['Row']['id'],
  ): Promise<PublicTables['moves']['Row'][]> {
    const { data, error } = await this.supabaseService.client
      .from('moves')
      .select('*')
      .eq('dance_id', danceId);

    if (error) throw error;
    return data;
  }

  public async getPositionsForDance(
    danceId: PublicTables['dances']['Row']['id'],
  ): Promise<PublicTables['positions']['Row'][]> {
    const { data, error } = await this.supabaseService.client
      .from('positions')
      .select('*')
      .eq('dance_id', danceId);

    if (error) throw error;
    return data;
  }
}
