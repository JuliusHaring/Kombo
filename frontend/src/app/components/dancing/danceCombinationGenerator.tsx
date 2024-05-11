'use client';
import React, { useState } from 'react';
import dancingService from '../../services/dancingService';

interface Props {
  danceId: string;
}

const DanceCombinationGenerator: React.FC<Props> = ({ danceId }) => {
  const [length, setLength] = useState(5); // Default value or based on user input
  const [difficulty, setDifficulty] = useState(4); // Default value or based on user input
  const [combination, setCombination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await dancingService.generateCombination(
        Number(danceId),
        length,
        difficulty,
      );
      setCombination(result);
    } catch (error: any) {
      setError('Failed to generate combination: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <label>Length:</label>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value, 10))}
        />
        <label>Difficulty:</label>
        <input
          type="number"
          value={difficulty}
          onChange={(e) => setDifficulty(parseInt(e.target.value, 10))}
        />
      </div>
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Combination'}
      </button>
      {combination && <div>{JSON.stringify(combination)}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default DanceCombinationGenerator;
