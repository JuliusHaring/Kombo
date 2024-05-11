import { Inject, Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import {
  SupabaseClient,
  SupabaseClientOptions,
  createClient,
} from '@supabase/supabase-js';
import { ExtractJwt } from 'passport-jwt';
import { Database } from 'src/types/supabase.types';

@Injectable({ scope: Scope.REQUEST })
export class SupabaseService {
  private supabaseClient: SupabaseClient;
  get client(): SupabaseClient {
    return this.supabaseClient;
  }

  constructor(
    private configService: ConfigService,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    const clientOptions: SupabaseClientOptions<'public'> = {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
      global: {
        headers: {
          // Authorization: `Bearer ${ExtractJwt.fromAuthHeaderAsBearerToken()(this.request)}`,
        },
      },
    };

    const supabaseUrl = this.configService.getOrThrow<string>('SUPABASE_URL');
    const supabaseKey = this.configService.getOrThrow<string>('SUPABASE_KEY');

    this.supabaseClient = createClient<Database>(
      supabaseUrl,
      supabaseKey,
      clientOptions,
    );
  }

  public async getUserIdByRequest(): Promise<string> {
    const { data, error } = await this.client.auth.getUser();
    if (error) throw error;
    return data.user.id;
  }
}
