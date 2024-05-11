import { PublicTables } from '@/app/types/database.types';
import CombinationElementCard from './CombinationElementCard';
import styles from './DanceCombinationGeneratorResult.module.css';

// components/DanceCombinationGenerationResult.tsx
interface Props {
  combination: any; // Define a more specific type based on what the API returns
}

const DanceCombinationGenerationResult: React.FC<Props> = ({ combination }) => {
  if (!combination) return null; // Or some placeholder indicating no data

  return (
    <div className="mt-4 rounded-lg border p-4 shadow">
      <h2 className="text-lg font-bold">Generated Combination Result:</h2>
      <div className="grid grid-cols-4 gap-10">
        {combination.map(
          (
            element: PublicTables['combination_elements']['Row'],
            idx: number,
          ) => (
            <CombinationElementCard
              key={idx}
              element={element}
              className={styles.combinationElementCard}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default DanceCombinationGenerationResult;
