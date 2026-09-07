const base = require('@playwright/test');
const { RegisterPage }   = require('../pages/RegisterPage');
const { LoginPage }      = require('../pages/LoginPage');
const { OverviewPage }   = require('../pages/OverviewPage');
const { OpenAccountPage }= require('../pages/OpenAccountPage');
const { TransferPage }   = require('../pages/TransferPage');
const { BillPayPage }    = require('../pages/BillPayPage');

exports.test = base.test.extend({
  registerPage:    async ({ page }, use) => use(new RegisterPage(page)),
  loginPage:       async ({ page }, use) => use(new LoginPage(page)),
  overviewPage:    async ({ page }, use) => use(new OverviewPage(page)),
  openAccountPage: async ({ page }, use) => use(new OpenAccountPage(page)),
  transferPage:    async ({ page }, use) => use(new TransferPage(page)),
  billPayPage:     async ({ page }, use) => use(new BillPayPage(page)),

  /** Two accounts guaranteed to exist and to be different. */
  twoAccounts: async ({ overviewPage, openAccountPage }, use) => {
    await overviewPage.open();
    const source = await overviewPage.firstAccountId();
    await openAccountPage.open();
    const target = await openAccountPage.openAccount('SAVINGS');
    await use({ source, target });
  },
});
exports.expect = base.expect;