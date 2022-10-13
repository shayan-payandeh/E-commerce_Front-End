import persianJs from 'persianjs';

const priceConvetor = (price) => {
  const persianPrice = persianJs(price / 1000).englishNumber()._str;
  return persianPrice;
};

export default priceConvetor;
