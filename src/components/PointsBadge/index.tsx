import React from 'react';
import Container from './styles';

interface Props {
  percentage: number;
}

export default function PointsBadge({ percentage }: Props) {
  return (
    <Container>
      <div>
        <h2>{`${percentage}%`}</h2>
      </div>
    </Container>
  );
}
