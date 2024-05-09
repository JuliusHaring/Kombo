import { Module } from '@nestjs/common';
import { DancingService } from './dancing.service';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { DancingController } from './dancing.controller';

@Module({
  imports: [SupabaseModule],
  providers: [DancingService],
  controllers: [DancingController],
})
export class DancingModule {}
