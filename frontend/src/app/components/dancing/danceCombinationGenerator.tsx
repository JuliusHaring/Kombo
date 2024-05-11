'use client';
import React, { useState } from 'react';
import dancingService from '../../services/dancingService';
import Form from '../base/Form';
import Input from '../base/Input';
import Button from '../base/Button';

interface Props {
  danceId: string;
}

const DanceCombinationGenerator: React.FC<Props> = ({ danceId }) => {
  const [length, setLength] = useState(5); // Default value or based on user input
  const [difficulty, setDifficulty] = useState(4); // Default value or based on user input
  const [combination, setCombination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <Form onSubmit={handleGenerate} className="space-y-4">
      <Input
        label="Length"
        type="number"
        value={length}
        onChange={(e) => setLength(parseInt(e.target.value, 10))}
      />
      <Input
        label="Difficulty"
        type="number"
        value={difficulty}
        onChange={(e) => setDifficulty(parseInt(e.target.value, 10))}
      />
      <Button type="submit">Generate Combination</Button>
      {error && <div className="text-red-500">{error}</div>}
    </Form>
  );
};

export default DanceCombinationGenerator;
