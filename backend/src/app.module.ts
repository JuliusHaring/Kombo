import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DancingModule } from './dancing/dancing.module';
import { StatusController } from './status.controller';

@Module({
  imports: [AuthModule, DancingModule],
  controllers: [StatusController],
  providers: [],
})
export class AppModule {}
