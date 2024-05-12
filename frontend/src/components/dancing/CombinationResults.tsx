import { PublicTables } from '@/app/types/database.types';
import CombinationElementCard from './CombinationElementCard';
import styles from './Combination.module.css';
import { Header } from '../base/Header';

// components/Combination.tsx
interface Props {
  combination: any;
  className: string;
}

const CombinationResults: React.FC<Props> = ({ combination, className }) => {
  if (!combination) return null; // Or some placeholder indicating no data

  return (
    <div className={`${className}`}>
      <Header size="2">Generated Combination Result:</Header>
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

export default CombinationResults;
