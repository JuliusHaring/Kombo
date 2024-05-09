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
}
