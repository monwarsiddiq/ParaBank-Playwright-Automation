const { test, expect } = require('@playwright/test');
const fs = require('fs');

// const customer = JSON.parse(fs.readFileSync('.auth/customer.json', 'utf8'));

test.describe('ParaBank services API', () => {

  test('Account details come back as well-formed JSON',
    async ({ page, request }) => {
      // Grab a real account id through the UI session we already own.
      await page.goto('/parabank/overview.htm');
      const id = (await page.locator('#accountTable tbody tr td a')
                    .first().innerText()).trim();

      const res = await request.get(`/parabank/services/bank/accounts/${id}`, {
        headers: { Accept: 'application/json' },
      });

      expect(res.status(), 'account endpoint should return 200').toBe(200);
      const body = await res.json();

      // Contract checks — shape, types, and consistency with the UI.
      expect(body).toHaveProperty('id');
      expect(body).toHaveProperty('customerId');
      expect(['CHECKING', 'SAVINGS', 'LOAN']).toContain(body.type);
      expect(typeof body.balance).toBe('number');
      expect(String(body.id)).toBe(id);
    });

  test('An unknown account id does not return a 200', async ({ request }) => {
    const res = await request.get('/parabank/services/bank/accounts/00000000', {
      headers: { Accept: 'application/json' },
    });
    expect(res.ok()).toBeFalsy();
  });
});