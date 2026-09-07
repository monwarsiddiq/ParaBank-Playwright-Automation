const { test, expect } = require('../../fixtures/base');
const { newCustomer } = require('../../data/customer');

test.describe('Customer registration', () => {

  test('A valid customer is registered and logged in automatically',
    async ({ page, registerPage }) => {
      const customer = newCustomer();

      await registerPage.open();
      await registerPage.fillForm(customer);
      await registerPage.submit.click();

      await expect(registerPage.welcome)
        .toHaveText(`Welcome ${customer.username}`);
      await expect(page.locator('#rightPanel'))
        .toContainText('Your account was created successfully');
      await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();
    });

  test('A duplicate username is rejected', async ({ registerPage }) => {
    const customer = newCustomer();
    await registerPage.register(customer);      // first time succeeds
    await registerPage.page.getByRole('link', { name: 'Log Out' }).click();

    await registerPage.open();                   // second time must fail
    await registerPage.fillForm(customer);
    await registerPage.submit.click();

    await expect(registerPage.errors)
      .toContainText('This username already exists');
  });

  // Data-driven negative coverage — one test body, many cases.
  const required = ['firstName', 'lastName', 'username', 'password'];
  for (const field of required) {
    test(`Registration is blocked when ${field} is empty`,
      async ({ registerPage }) => {
        const customer = newCustomer({ [field]: '' });
        await registerPage.open();
        await registerPage.fillForm(customer);
        await registerPage.submit.click();
        await expect(registerPage.errors.first()).toBeVisible();
      });
  }
});