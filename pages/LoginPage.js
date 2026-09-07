const { OverviewPage } = require('./OverviewPage');

class LoginPage {
  constructor(page) {
    this.page = page;
    // ParaBank renders the login panel in the left column of every logged-out
    // page. Scoping to it keeps these locators unambiguous everywhere.
    this.panel    = page.locator('#loginPanel');
    this.username = this.panel.locator('input[name="username"]');
    this.password = this.panel.locator('input[name="password"]');
    this.submit   = this.panel.getByRole('button', { name: 'Log In' });

    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.forgotLink   = page.getByRole('link', { name: /forgot login info/i });
    this.logoutLink   = page.getByRole('link', { name: 'Log Out' });
    this.error        = page.locator('#rightPanel .error');
  }

  async open() {
    await this.page.goto('/parabank/index.htm');
    await this.username.waitFor();
  }

  /**
   * Fill the panel and submit. Deliberately does NOT navigate first — the
   * panel exists on every logged-out page, so a test can log in straight
   * after a log out without a redundant round trip.
   */
  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submit.click();
  }

  /**
   * The happy path, returning the page object for where the user lands —
   * the "return the next page object" rule from module 07 in action.
   */
  async loginAs(customer) {
    await this.open();
    await this.login(customer.username, customer.password);
    const overview = new OverviewPage(this.page);
    await overview.heading.waitFor();
    return overview;
  }

  async logout() {
    await this.logoutLink.click();
    await this.username.waitFor();   // the panel is back = the session is gone
  }
}
module.exports = { LoginPage };