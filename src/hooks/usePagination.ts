import { useEffect, useState } from 'react';

/**
 * Helpers
 */

const limit = 4;

function clamp(val: number) {
  return val < 0 ? 0 : val;
}

function getPage<T>(innerPage: number, groupedResults: T[][]) {
  const index = clamp(innerPage - 1);
  return groupedResults[index];
}

function getInnerPage(apiPage: number, selectedPage: number) {
  const newBlocksPassed = apiPage - 1 < 0 ? 0 : apiPage - 1;
  return selectedPage - newBlocksPassed * limit;
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

  return returnValue;
}

export default function usePagination<T>(onRequestUpdate: (apiPage: number) => Promise<T[]>) {
  const [apiPage, setApiPage] = useState(1);
  const [groupedData, setGroupedData] = useState<T[][]>([]);
  const [results, setResults] = useState<T[]>([]);
  const [activePage, setActivePage] = useState(1);

  async function fetch(apiPage = 1, innerPage = 1) {
    const data = await onRequestUpdate(apiPage);
    const grouped = group(data);
    setGroupedData(grouped);
    setResults(getPage(innerPage, grouped));
  }

  function reset() {
    setApiPage(1);
    setActivePage(1);
    setResults([]);
    setGroupedData([]);
  }

  async function onSelectPage(selectedPage: number) {
    if (activePage === selectedPage) return;
    setActivePage(selectedPage);

    const taIndoPraFrente = selectedPage > activePage;
    const taIndoPraTras = selectedPage < activePage;

    const blocksPassed = apiPage - 1 < 0 ? 0 : apiPage - 1;
    const innerPageIndexDestiny = selectedPage - blocksPassed * limit;
    const vaiIrPraFrente = innerPageIndexDestiny > limit;
    const vairIrPratras = innerPageIndexDestiny <= 0;

    if (vaiIrPraFrente) {
      const nextApiPage = apiPage + 1;
      const inner = getInnerPage(nextApiPage, selectedPage);

      fetch(nextApiPage, inner);

      setApiPage(nextApiPage);
    } else if (vairIrPratras) {
      const nextApiPage = apiPage - 1;
      const inner = getInnerPage(nextApiPage, selectedPage);

      fetch(nextApiPage, inner);

      setApiPage(nextApiPage);
    } else if (taIndoPraFrente) {
      const innerPage = getInnerPage(apiPage, selectedPage);
      const page = getPage<T>(innerPage, groupedData);
      setResults(page);
      // onAdvance(page);
    } else if (taIndoPraTras) {
      const innerPage = getInnerPage(apiPage, selectedPage);
      const page = getPage<T>(innerPage, groupedData);
      setResults(page);
      // onAdvance(page);
    }
  }

  return {
    onSelectPage,
    activePage,
    results,
    reset,
    fetch,
  };
}
