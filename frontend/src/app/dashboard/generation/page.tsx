'use client';

import DanceCombinationGenerator from '../../components/dancing/DanceCombinationGenerator';
import { Container } from '../../components/base/Container';
import { Header } from '../../components/base/Header';
import { useState } from 'react';
import DanceCombinationGenerationResult from '@/app/components/dancing/DanceCombinationGeneratorResult';

export default function Generation() {
  const [combination, setCombination] = useState(null);

  return (
    <Container>
      <Header size="1">Generation</Header>
      <DanceCombinationGenerator danceId="3" setCombination={setCombination} />
      <DanceCombinationGenerationResult combination={combination} />
    </Container>
  );
}
