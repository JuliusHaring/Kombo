import { PublicTables } from 'src/types/database.types';

export type Combination = PublicTables['combination_elements']['Row'][];

export type CombinationGenerationRequest = {
  length: number;
};

export class CombinationGenerationRequestDto {
  length: CombinationGenerationRequest['length'];
}
