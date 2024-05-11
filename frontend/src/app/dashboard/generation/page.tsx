import DanceCombinationGenerator from '../../components/dancing/DanceCombinationGenerator';
import { Container } from '../../components/base/Container';
import { Header } from '../../components/base/Header';

export default function Generation() {
  return (
    <Container>
      <Header size="1">Generation</Header>
      <DanceCombinationGenerator danceId="3" />
    </Container>
  );
}
