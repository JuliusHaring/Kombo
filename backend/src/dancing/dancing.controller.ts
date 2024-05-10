import { Controller, Get, Param, Post } from '@nestjs/common';
import { DancingService } from './dancing.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Database } from 'src/types/supabase.types';
import { GenerationService } from './generation.service';
import { Combination } from './dancing.types';

@Controller('dancing')
@ApiTags('dancing')
export class DancingController {
  constructor(
    private dancingService: DancingService,
    private generationService: GenerationService,
  ) {}

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
    return this.dancingService.getElementsForDance(danceId, 'position');
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
    return this.dancingService.getElementsForDance(danceId, 'transition');
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
    return this.dancingService.getElementsForDance(danceId, 'move');
  }

  @Post('dances/:danceId/generateCombination/:length')
  @ApiParam({ name: 'danceId', type: 'number', required: true })
  @ApiParam({ name: 'length', type: 'number', required: true })
  public async generateCombination(
    @Param('danceId')
    danceId: Database['public']['Tables']['dances']['Row']['id'],
    @Param('length')
    length: number,
  ): Promise<Combination> {
    return this.generationService.generateCombination(danceId, length);
  }
}
