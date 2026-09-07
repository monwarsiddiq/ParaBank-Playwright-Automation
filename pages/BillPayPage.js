class BillPayPage {
  constructor(page) {
    this.page = page;

    // --- the form ---
    this.f = {
      name:    page.locator('[name="payee.name"]'),
      street:  page.locator('[name="payee.address.street"]'),
      city:    page.locator('[name="payee.address.city"]'),
      state:   page.locator('[name="payee.address.state"]'),
      zipCode: page.locator('[name="payee.address.zipCode"]'),
      phone:   page.locator('[name="payee.phoneNumber"]'),
      account: page.locator('[name="payee.accountNumber"]'),
      verify:  page.locator('[name="verifyAccount"]'),
      amount:  page.locator('[name="amount"]'),
    };
    this.fromAccount = page.locator('[name="fromAccountId"]');
    this.submit      = page.getByRole('button', { name: 'Send Payment' });
    this.errors      = page.locator('.error');

    // --- the confirmation panel ---
    // Scoped, because the result span #amount and the form input [name=amount]
    // would otherwise collide. This is a strict-mode violation waiting to happen.
    this.result      = page.locator('#billpayResult');
    this.done        = this.result.getByText('Bill Payment Complete');
    this.paidTo      = this.result.locator('#payeeName');
    this.paidAmount  = this.result.locator('#amount');
    this.paidFrom    = this.result.locator('#fromAccountId');
  }

  async open() {
    await this.page.goto('/parabank/billpay.htm');
    await this.f.name.waitFor();
    await this.fromAccount.locator('option').first().waitFor();
    return this;
  }

  /** One user intention: pay this payee this amount from this account. */
  async payBill(payee, amount, fromAccount) {
    await this.f.name.fill(payee.name);
    await this.f.street.fill(payee.street);
    await this.f.city.fill(payee.city);
    await this.f.state.fill(payee.state);
    await this.f.zipCode.fill(payee.zipCode);
    await this.f.phone.fill(payee.phone);
    await this.f.account.fill(payee.accountNumber);
    await this.f.verify.fill(payee.accountNumber);   // must match, by design
    await this.f.amount.fill(String(amount));
    await this.fromAccount.selectOption(fromAccount);
    await this.submit.click();
  }

  /** Fill everything EXCEPT the confirmation field — for negative tests. */
  async payWithMismatchedAccount(payee, amount, fromAccount) {
    await this.payBill({ ...payee }, amount, fromAccount);
    await this.f.verify.fill('99999');
    await this.submit.click();
  }
}
module.exports = { BillPayPage };