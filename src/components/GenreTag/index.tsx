import React from 'react';
import Container from './styles';

interface Props {
  title: string;
}

export default function GenreTag({ title }: Props) {
  return (
    <Container>
      {title}
    </Container>
  );
}
