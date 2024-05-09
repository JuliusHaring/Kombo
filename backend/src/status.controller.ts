import { Controller, Get } from '@nestjs/common';

export interface StatusContainer {
  status: 'UP' | 'ERROR' | 'DOWN';
}

@Controller('status')
export class StatusController {
  @Get()
  public async getStatus(): Promise<StatusContainer> {
    return {
      status: 'UP',
    };
  }
}
