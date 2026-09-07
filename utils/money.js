/** "$1,234.56" → 1234.56 · the helper every banking suite needs on day one. */
const toNumber = (text) => Number(String(text).replace(/[^0-9.-]/g, ''));

/** Compare money safely — never use === on floats. */
const equalsMoney = (a, b) => Math.abs(a - b) < 0.005;

module.exports = { toNumber, equalsMoney };