import DanceCombinationGenerator from '../../components/dancing/danceCombinationGenerator';
import { Container } from '../../components/base/container';
import { Header } from '../../components/base/header';

export default function Generation() {
  return (
    <Container>
      <Header size="1">Generation</Header>
      <DanceCombinationGenerator danceId="3" />
    </Container>
  );
}
