import { useState, useEffect } from 'react';

export default function usePagination(apiPage, page, array, whenFecthNext) {
  const pageIndex = page - 1;
  const pageResults = array[pageIndex];
  const willFetchNext = page > array.length;

  if (willFetchNext) {
    whenFecthNext(apiPage + 1);
    return [];
  }

  return pageResults;
}
