import { PublicTables } from 'src/types/database.types';

export type CombinationElement =
  | PublicTables['moves']['Row']
  | PublicTables['positions']['Row']
  | PublicTables['transitions']['Row'];

export type Combination = CombinationElement[];

export type CombinationGenerationRequest = {
  length: number;
};

export class CombinationGenerationRequestDto {
  length: CombinationGenerationRequest['length'];
}
