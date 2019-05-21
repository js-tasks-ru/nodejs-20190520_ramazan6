function sum(a, b) {
  if (Number.isInteger(a + b)) {
  	return a + b;
  }
  throw new TypeError;
}

module.exports = sum;
