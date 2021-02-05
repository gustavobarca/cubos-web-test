interface Params {
  selectedPage: number;
  activePage: number,
  apiPage: number;
  onUpdate: (apiPage: number, innerPage: number) => void;
  onAdvance: (innerPage: number) => void;
}

const limit = 4;

function getInnerPage(apiPage: number, selectedPage: number) {
  const newBlocksPassed = apiPage - 1 < 0 ? 0 : apiPage - 1;
  return selectedPage - newBlocksPassed * limit;
}

export default function handlePaginationActions(params: Params) {
  const {
    selectedPage,
    activePage,
    apiPage,
    onUpdate,
    onAdvance,
  } = params;

  const taIndoPraFrente = selectedPage > activePage;
  const taIndoPraTras = selectedPage < activePage;

  const blocksPassed = apiPage - 1 < 0 ? 0 : apiPage - 1;
  const innerPageIndexDestiny = selectedPage - blocksPassed * limit;
  const vaiIrPraFrente = innerPageIndexDestiny > limit;
  const vairIrPratras = innerPageIndexDestiny <= 0;

  if (vaiIrPraFrente) {

    const nextApiPage = apiPage + 1;
    const iiner = getInnerPage(nextApiPage, selectedPage);
    onUpdate(nextApiPage, iiner);

  } else if (vairIrPratras) {

    const nextApiPage = apiPage - 1;
    const iiner = getInnerPage(nextApiPage, selectedPage);
    onUpdate(nextApiPage, iiner);

  } else if (taIndoPraFrente) {

    onAdvance(getInnerPage(apiPage, selectedPage));

  } else if (taIndoPraTras) {

    onAdvance(getInnerPage(apiPage, selectedPage));

  }
}
