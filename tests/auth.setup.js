const { test: setup, expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/RegisterPage');
const { newCustomer } = require('../data/customer');
const fs = require('fs');

setup('register a customer and persist the session', async ({ page }) => {
  fs.mkdirSync('.auth', { recursive: true });
  const customer = newCustomer();

  await new RegisterPage(page).register(customer);
  await expect(page.locator('#rightPanel'))
    .toContainText('Your account was created successfully');

  fs.writeFileSync('.auth/customer.json', JSON.stringify(customer, null, 2));
  await page.context().storageState({ path: '.auth/user.json' });
});