import { Controller, Get, Param } from '@nestjs/common';
import { DancingService } from './dancing.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Database } from 'src/types/supabase.types';

@Controller('dancing')
@ApiTags('dancing')
export class DancingController {
  constructor(private dancingService: DancingService) {}

  @Get('dances')
  public async getDances() {
    return this.dancingService.getDances();
  }

  @Get('dances/:danceId/positions')
  @ApiParam({
    name: 'danceId',
    required: true,
  })
  public async getPositionsForDance(
    @Param('danceId')
    danceId: Database['public']['Tables']['dances']['Row']['id'],
  ) {
    return this.dancingService.getPositionsForDance(danceId);
  }

  @Get('dances/:danceId/transitions')
  @ApiParam({
    name: 'danceId',
    required: true,
  })
  public async getTransitionsForDance(
    @Param('danceId')
    danceId: Database['public']['Tables']['dances']['Row']['id'],
  ) {
    return this.dancingService.getTransitionsForDance(danceId);
  }

  @Get('dances/:danceId/moves')
  @ApiParam({
    name: 'danceId',
    required: true,
  })
  public async getMovesForDance(
    @Param('danceId')
    danceId: Database['public']['Tables']['dances']['Row']['id'],
  ) {
    return this.dancingService.getMovesForDance(danceId);
  }
}
