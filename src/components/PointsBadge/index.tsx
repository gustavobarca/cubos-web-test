import React from 'react';
import Container from './styles';

interface Props {
  percentage: number;
  size?: number;
}

export default function PointsBadge({ percentage, size = 60 }: Props) {
  return (
    <Container size={size}>
      <div>
        <h2>{`${percentage}%`}</h2>
      </div>
    </Container>
  );
}

PointsBadge.defaultProps = {
  size: 60,
};
