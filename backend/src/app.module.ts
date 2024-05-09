import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DancingModule } from './dancing/dancing.module';
import { StatusController } from './status.controller';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DancingModule,
    SupabaseModule,
  ],
  controllers: [StatusController],
  providers: [],
})
export class AppModule {}
