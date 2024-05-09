import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export interface StatusContainer {
  status: 'UP' | 'ERROR' | 'DOWN';
}

@Controller('status')
@ApiTags('meta')
export class StatusController {
  @Get()
  public async getStatus(): Promise<StatusContainer> {
    return {
      status: 'UP',
    };
  }
}
