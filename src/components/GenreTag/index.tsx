import React from 'react';
import Container from './styles';

interface Props {
  title: string;
  onClick?: () => void;
  active?: boolean;
}

export default function GenreTag({ title, onClick, active = false }: Props) {
  return (
    <Container
      active={active}
      isClickable={!!onClick}
      onClick={onClick}
    >
      {title}
    </Container>
  );
}

GenreTag.defaultProps = {
  onClick: null,
  active: false,
};
