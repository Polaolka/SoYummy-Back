const getRandomProperty = (obj) => {
  const keys = Object.keys(obj);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return randomKey;
};

module.exports = getRandomProperty;
