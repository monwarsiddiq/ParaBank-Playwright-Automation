const crypto = require('crypto');

/**
 * Unique on every call, even across parallel workers and repeated CI runs.
 * Timestamp gives ordering; the random suffix removes same-millisecond collisions.
 */
function newCustomer(overrides = {}) {
  const stamp  = Date.now().toString(36);
  const suffix = crypto.randomBytes(3).toString('hex');
  const id = `${stamp}${suffix}`;

  return {
    firstName: 'Ada',
    lastName:  `Tester_${id}`,
    street:    '12 Regression Road',
    city:      'Dhaka',
    state:     'Dhaka',
    zipCode:   '1207',
    phone:     '01700000000',
    ssn:       '123-45-6789',
    username:  `qa_${id}`,
    password:  'Passw0rd!23',
    ...overrides,
  };
}
module.exports = { newCustomer };