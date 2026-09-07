const crypto = require('crypto');

/**
 * A unique payee for the bill-pay flow. Same uniqueness discipline as the
 * customer builder: the name carries the token so a report or a screenshot
 * tells you which run created the record.
 */
function newPayee(overrides = {}) {
  const id = `${Date.now().toString(36)}${crypto.randomBytes(2).toString('hex')}`;

  return {
    name:          `Utility Co ${id}`,
    street:        '9 Ledger Lane',
    city:          'Dhaka',
    state:         'Dhaka',
    zipCode:       '1207',
    phone:         '01711111111',
    accountNumber: '54321',   // the payee's account, not the customer's
    ...overrides,
  };
}
module.exports = { newPayee };