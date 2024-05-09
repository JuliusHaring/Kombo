import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Database } from '../types/supabase.types';

@Injectable()
export class DancingService {
  constructor(private supabaseService: SupabaseService) {}

  public async getDances(): Promise<
    Database['public']['Tables']['dances']['Row'][]
  > {
    const { data, error } = await this.supabaseService.client
      .from('dances')
      .select('*');
    if (error) throw error;
    return data;
  }

  public async getTransitionsForDance(
    danceId: Database['public']['Tables']['dances']['Row']['id'],
  ): Promise<Database['public']['Tables']['transitions']['Row'][]> {
    const { data, error } = await this.supabaseService.client
      .from('transitions')
      .select('*')
      .eq('dance_id', danceId);

    if (error) throw error;
    return data;
  }

  public async getMovesForDance(
    danceId: Database['public']['Tables']['dances']['Row']['id'],
  ): Promise<Database['public']['Tables']['moves']['Row'][]> {
    const { data, error } = await this.supabaseService.client
      .from('moves')
      .select('*')
      .eq('dance_id', danceId);

    if (error) throw error;
    return data;
  }

  public async getPositionsForDance(
    danceId: Database['public']['Tables']['dances']['Row']['id'],
  ): Promise<Database['public']['Tables']['positions']['Row'][]> {
    const { data, error } = await this.supabaseService.client
      .from('positions')
      .select('*')
      .eq('dance_id', danceId);

    if (error) throw error;
    return data;
  }
}
