import { Controller, Get, Param, Post } from '@nestjs/common';
import { DancingService } from './dancing.service';
import {
  ApiBearerAuth,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Database } from 'src/types/supabase.types';
import { GenerationService } from './generation.service';
import { Combination } from './dancing.types';
import { AllowUnauthorizedRequest } from 'src/auth/allow-unauthorized-requests';

@Controller('dancing')
@ApiTags('dancing')
export class DancingController {
  constructor(
    private dancingService: DancingService,
    private generationService: GenerationService,
  ) {}

  @Get('')
  @ApiBearerAuth()
  public async getDances() {
    return this.dancingService.getDances();
  }

  @Get(':danceId/positions')
  @ApiBearerAuth()
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

  @Get(':danceId/transitions')
  @ApiBearerAuth()
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

  @Get(':danceId/moves')
  @ApiBearerAuth()
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

  @Post(':danceId/generateCombination/:length/:difficulty')
  @AllowUnauthorizedRequest()
  @ApiParam({ name: 'danceId', type: 'number', required: true })
  @ApiParam({ name: 'length', type: 'number', required: true })
  @ApiParam({ name: 'difficulty', type: 'number', required: true })
  public async generateCombination(
    @Param('danceId')
    danceId: Database['public']['Tables']['dances']['Row']['id'],
    @Param('length')
    length: number,
    @Param('difficulty')
    difficulty: number,
  ): Promise<Combination> {
    return this.generationService.generateCombination(
      danceId,
      length,
      difficulty,
    );
  }
}
