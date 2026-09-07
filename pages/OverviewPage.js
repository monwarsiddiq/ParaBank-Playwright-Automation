const { toNumber } = require('../utils/money');

class OverviewPage {
  constructor(page) {
    this.page    = page;
    this.heading = page.getByRole('heading', { name: 'Accounts Overview' });
    this.table   = page.locator('#accountTable');
    this.rows    = this.table.locator('tbody tr');
  }

  async open() {
    await this.page.goto('/parabank/overview.htm');
    await this.heading.waitFor();
  }

  row(accountId) {
    return this.rows.filter({ hasText: accountId });
  }

  /** Balance of one account as a number. Throws a readable error if absent. */
  async balanceOf(accountId) {
    const cell = this.row(accountId).locator('td').nth(1);
    await cell.waitFor();
    return toNumber(await cell.innerText());
  }

  async firstAccountId() {
    return (await this.rows.first().locator('td a').innerText()).trim();
  }
}
module.exports = { OverviewPage };