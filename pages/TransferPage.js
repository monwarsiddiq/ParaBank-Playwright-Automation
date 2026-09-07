class TransferPage {
  constructor(page) {
    this.page   = page;

    // --- the form ---
    this.amount = page.locator('#amount');
    this.from   = page.locator('#fromAccountId');
    this.to     = page.locator('#toAccountId');
    this.submit = page.getByRole('button', { name: 'Transfer' });

    // --- the confirmation panel, only present after a successful transfer ---
    this.done         = page.getByText('Transfer Complete!');
    this.amountResult = page.locator('#amountResult');
    this.fromResult   = page.locator('#fromAccountIdResult');
    this.toResult     = page.locator('#toAccountIdResult');
    this.error        = page.locator('#rightPanel .error');
  }

  async open() {
    await this.page.goto('/parabank/transfer.htm');
    await this.amount.waitFor();
    // Both dropdowns are populated asynchronously, exactly like the funding
    // dropdown above. Selecting before the options land throws.
    await this.from.locator('option').first().waitFor();
    await this.to.locator('option').first().waitFor();
    return this;
  }

  /** One user intention. No assertions — those belong to the test. */
  async transfer(amount, fromAccount, toAccount) {
    await this.amount.fill(String(amount));
    await this.from.selectOption(fromAccount);
    await this.to.selectOption(toAccount);
    await this.submit.click();
  }

  /**
   * What the confirmation panel claims happened, as plain strings.
   * Useful when a test wants to compare the receipt against the ledger.
   */
  async receipt() {
    await this.done.waitFor();
    return {
      amount: (await this.amountResult.innerText()).trim(),
      from:   (await this.fromResult.innerText()).trim(),
      to:     (await this.toResult.innerText()).trim(),
    };
  }
}
module.exports = { TransferPage };