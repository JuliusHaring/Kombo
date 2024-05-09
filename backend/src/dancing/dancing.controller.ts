import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DancingService } from './dancing.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Database } from 'src/types/supabase.types';
import {
  Combination,
  CombinationGenerationRequest,
  CombinationGenerationRequestDto,
} from './dancing.types';
import { GenerationService } from './generation.service';

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
