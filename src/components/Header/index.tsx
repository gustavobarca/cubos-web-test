import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Text } from './styles';

interface Props {
  title: string;
}

export default function Header({ title }: Props) {
  const history = useHistory();

  return (
    <Container>
      <Text onClick={() => history.push('/')}>{title}</Text>
    </Container>
  );
}
