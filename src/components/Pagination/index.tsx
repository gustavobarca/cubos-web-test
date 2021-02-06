import React, { useEffect, useState } from 'react';
import Container from './styles';

interface Props {
  totalPages?: number;
  actualPage: number;
  onChange: (page: number) => void;
}

export default function Pagination({ actualPage, totalPages, onChange }: Props) {
  const [pageNumbers, setPageNumbers] = useState([actualPage]); // Refactor
  const [all, setAll] = useState<number[]>([]); // Refactor

  // Refactor
  function parseToArray(total?: number) {
    if (!total) return [actualPage];

    const elements: number[] = [];

    for (let i = 1; i <= total; i++) {
      if (i === actualPage) {
        elements.push(i);
      } else {
        elements.push(i);
      }
    }

    return elements;
  }

  // Refactor
  function crop(array, page, total) {
    const padding = (total - 1) / 2;
    if (array.length <= total) return array;

    const penultimate = array.length - padding;

    const index = array.indexOf(page);
    let start = (index - padding) < 0 ? 0 : (index - padding);
    const startOffset = start === 0 ? 1 : start;

    const endOffset = 1;
    let endPosition = index + padding + endOffset + startOffset;

    // End verifications
    if (index === 0) endPosition = total;
    if (index > padding - 1) endPosition = index + padding + endOffset;

    // Start verifications
    if (index === array.length - 1) start = index - total + endOffset;
    if (index === penultimate) start = index - total + padding;

    return array.slice(start, endPosition);
  }

  useEffect(() => {
    setAll(parseToArray(totalPages));
  }, []);

  useEffect(() => {
    setPageNumbers(crop(all, actualPage, 5));
  }, [all]);

  function handleClick(item: number) {
    if (item === actualPage) return;
    setPageNumbers(crop(all, item, 5));
    onChange(item);
  }

  return (
    <Container>
      {pageNumbers.map(page => (
        <button
          type="button"
          className={`pagination-btn ${page === actualPage ? 'pagination-active ' : ''}`}
          onClick={() => handleClick(page)}
          key={page}
        >
          <span>{page}</span>
        </button>
      ))}
    </Container>
  );
}

Pagination.defaultProps = {
  totalPages: 0,
};
