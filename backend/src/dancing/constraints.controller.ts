import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CombinationElementConstraintCreationDto } from 'src/types/dtos';
import { AllowUnauthorizedRequest } from 'src/auth/allow-unauthorized-requests';
import { ConstraintsService } from './constraints.service';
import { PublicTables } from 'src/types/database.types';

@Controller('constraints')
@ApiTags('constraints')
@ApiBearerAuth()
export class ConstraintsController {
  constructor(private readonly constraintsService: ConstraintsService) {}

  @Post('')
  @ApiBody({ type: CombinationElementConstraintCreationDto })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  public async addConstraint(
    @Body()
    combinationElementConstraint: CombinationElementConstraintCreationDto,
  ) {
    const entity: PublicTables['combination_element_constraints']['Insert'] =
      Object.assign(combinationElementConstraint, {
        user_id: '82e6bcdc-78f4-4994-8299-8991a2c081e3',
      });
    console.log(entity);

    await this.constraintsService.addCombinationElementConstraint(entity);
  }
}
