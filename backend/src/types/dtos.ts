import { IsNumber, IsUUID } from 'class-validator';
import { PublicTables } from './database.types';

export class CombinationElementConstraintCreationDto {
  @IsNumber()
  public dance_id: PublicTables['combination_element_constraints']['Insert']['dance_id'];

  @IsNumber()
  public element_1: PublicTables['combination_element_constraints']['Insert']['element_1'];

  @IsNumber()
  public element_2: PublicTables['combination_element_constraints']['Insert']['element_2'];
}
