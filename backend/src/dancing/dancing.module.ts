import { Module } from '@nestjs/common';
import { DancingService } from './dancing.service';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { DancingController } from './dancing.controller';
import { GenerationService } from './generation.service';

@Module({
  imports: [SupabaseModule],
  providers: [DancingService, GenerationService],
  controllers: [DancingController],
})
export class DancingModule {}
