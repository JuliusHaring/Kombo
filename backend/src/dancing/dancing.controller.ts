import { Controller, Get } from '@nestjs/common';
import { DancingService } from './dancing.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('dancing')
@ApiTags('dancing')
export class DancingController {
  constructor(private dancingService: DancingService) {}

  @Get('dances')
  public async getDances() {
    return this.dancingService.getDances();
  }
}
