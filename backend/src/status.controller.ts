import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AllowUnauthorizedRequest } from './auth/allow-unauthorized-requests';

export interface StatusContainer {
  status: 'UP' | 'ERROR' | 'DOWN';
}

@Controller('status')
@ApiTags('meta')
export class StatusController {
  @Get()
  @AllowUnauthorizedRequest()
  public async getStatus(): Promise<StatusContainer> {
    return {
      status: 'UP',
    };
  }
}
