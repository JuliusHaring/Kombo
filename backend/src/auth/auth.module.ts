import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { SupabaseGuard } from './supabase/supabase.guard';
import { SupabaseStrategy } from './supabase/supabase.strategy';

@Module({
  imports: [PassportModule, SupabaseModule],
  providers: [
    SupabaseStrategy,
    SupabaseGuard,
    {
      provide: APP_GUARD,
      useClass: SupabaseGuard,
    },
  ],
  exports: [SupabaseStrategy, SupabaseGuard],
})
export class AuthModule {}
