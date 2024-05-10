import { Module } from '@nestjs/common';
import { DancingService } from './dancing.service';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { DancingController } from './dancing.controller';
import { GenerationService } from './generation.service';
import { ConstraintsController } from './constraints.controller';
import { ConstraintsService } from './constraints.service';

@Module({
  imports: [SupabaseModule],
  providers: [DancingService, GenerationService, ConstraintsService],
  controllers: [DancingController, ConstraintsController],
})
export class DancingModule {}
