'use client';

import CombinationGenerator from '../../../components/dancing/CombinationGenerator';
import { Container } from '../../../components/base/Container';
import { Header } from '../../../components/base/Header';
import { useState } from 'react';
import Combination from '@/components/dancing/Combination';
import Metronome from '@/components/dancing/Metronome';

export default function Generation() {
  const [combination, setCombination] = useState(null);

  return (
    <Container>
      <Header size="1">Generation</Header>
      <CombinationGenerator danceId="3" setCombination={setCombination} />
      <Combination combination={combination} />
      <Metronome />
    </Container>
  );
}
