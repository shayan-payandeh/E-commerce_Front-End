const newestProducts = (products) => {
  const newest = products.slice(0, 5);
  return newest;
};

export { newestProducts };
