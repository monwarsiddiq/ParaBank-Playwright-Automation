const { test, expect } = require('../../fixtures/base');
const { newCustomer } = require('../../data/customer');

test('Wrong credentials produce an error, not a session',
  async ({ page, loginPage }) => {
    await loginPage.open();
    await loginPage.login('definitely_not_a_user', 'wrong-password');

    await expect(page.locator('.error'))
      .toContainText('could not be verified');
    await expect(page.getByRole('link', { name: 'Log Out' })).toBeHidden();
  });

test('A registered customer can log out and back in',
  async ({ page, registerPage, loginPage }) => {
    const customer = newCustomer();
    await registerPage.register(customer);
    await page.getByRole('link', { name: 'Log Out' }).click();

    await loginPage.login(customer.username, customer.password);
    await expect(page.getByRole('heading', { name: 'Accounts Overview' }))
      .toBeVisible();
  });