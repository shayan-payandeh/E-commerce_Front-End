const fakePrice = (price) => {
  const fake =
    Math.round((parseInt(price) + parseInt(price / 3)) / 1000) * 1000;
  return fake;
};

export default fakePrice;
