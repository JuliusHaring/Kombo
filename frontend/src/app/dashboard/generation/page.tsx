'use client';

import CombinationGenerator from '../../../components/dancing/CombinationGenerator';
import { Container } from '../../../components/base/Container';
import { Header } from '../../../components/base/Header';
import { useState } from 'react';
import Metronome from '@/components/dancing/Metronome';
import CombinationResults from '@/components/dancing/CombinationResults';

export default function Generation() {
  const [combination, setCombination] = useState(null);

  return (
    <Container>
      <Header size="1">Generation</Header>
      <div className="grid grid-cols-2 gap-4">
        <CombinationGenerator danceId="3" setCombination={setCombination} />
        <Metronome />
      </div>
      <CombinationResults
        className="mt-4 rounded-lg border p-4 shadow"
        combination={combination}
      />
    </Container>
  );
}
