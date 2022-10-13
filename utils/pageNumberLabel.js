import persianJs from 'persianjs';

const pageNumberLabel = (item, langage) => {
  const initialPageNumber = item['page'];
  const pageNumber =
    initialPageNumber > 0
      ? langage === 'English'
        ? initialPageNumber
        : persianJs(initialPageNumber).englishNumber()._str
      : 0;

  return pageNumber;
};

export default pageNumberLabel;
