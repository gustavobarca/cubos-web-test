import { useState } from 'react';

/**
 * Helpers
 */

function getPage<T>(innerPage: number, groupedResults: T[][]) {
  const index = innerPage - 1 < 0 ? 0 : innerPage - 1;
  return groupedResults[index];
}

export function group<T>(data: T[]) {
  let temp: T[] = [];
  const returnValue: T[][] = [];

  data.forEach(d => {
    temp.push(d);
    if (temp.length === 5) {
      returnValue.push(temp);
      temp = [];
    }
  });

  returnValue.push(temp);
  return returnValue;
}

/**
 * A pagination hook used to paginate API results.
 * @param onRequestFetch The function that it's called when the pagination needs to fetch data.
 */
function usePagination<T>(onRequestFetch: (page: number) => Promise<T[]>, limit = 4) {
  const [apiPage, setApiPage] = useState(1);
  const [groupedData, setGroupedData] = useState<T[][]>([]);
  const [results, setResults] = useState<T[]>([]);
  const [activePage, setActivePage] = useState(1);

  async function fetch(apiPage = 1, innerPage = 1) {
    const data = await onRequestFetch(apiPage);
    const grouped = group(data);
    setGroupedData(grouped);
    setResults(getPage(innerPage, grouped));
  }

  function getInnerPage(apiPage: number, selectedPage: number) {
    const newBlocksPassed = apiPage - 1 < 0 ? 0 : apiPage - 1;
    return selectedPage - newBlocksPassed * limit;
  }

  function reset() {
    setApiPage(1);
    setActivePage(1);
    setResults([]);
    setGroupedData([]);
  }

  function skipTo(selectedPage: number, forward: boolean) {
    const nextApiPage = forward ? apiPage + 1 : apiPage - 1;
    const inner = getInnerPage(nextApiPage, selectedPage);
    fetch(nextApiPage, inner);
    setApiPage(nextApiPage);
  }

  async function onSelectPage(selectedPage: number) {
    if (activePage === selectedPage) return;
    setActivePage(selectedPage);

    const blocksPassed = apiPage - 1 < 0 ? 0 : apiPage - 1;
    const innerPageIndexDestiny = selectedPage - blocksPassed * limit;
    const destinyIsNext = innerPageIndexDestiny > limit;
    const destinyIsPrev = innerPageIndexDestiny <= 0;

    if (destinyIsNext) {
      skipTo(selectedPage, true);
      return;
    }

    if (destinyIsPrev) {
      skipTo(selectedPage, false);
      return;
    }

    const innerPage = getInnerPage(apiPage, selectedPage);
    const page = getPage<T>(innerPage, groupedData);
    setResults(page);
  }

  return {
    onSelectPage,
    activePage,
    results,
    reset,
    fetch,
  };
}

export default usePagination;
