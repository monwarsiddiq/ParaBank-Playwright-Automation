class OpenAccountPage {
  constructor(page) {
    this.page      = page;
    this.type      = page.locator('#type');
    this.fromAcct  = page.locator('#fromAccountId');
    this.submit    = page.getByRole('button', { name: 'Open New Account' });
    this.newId     = page.locator('#newAccountId');
  }

  async open() {
    await this.page.goto('/parabank/openaccount.htm');
    await this.type.waitFor();
  }

  /** @param {'CHECKING'|'SAVINGS'} kind → resolves to the new account id */
  async openAccount(kind = 'SAVINGS') {
    await this.type.selectOption({ label: kind });
    // The funding dropdown is populated by an async call — wait for a real option.
    await this.fromAcct.locator('option').first().waitFor();
    await this.submit.click();
    await this.newId.waitFor();
    return (await this.newId.innerText()).trim();
  }
}
module.exports = { OpenAccountPage };