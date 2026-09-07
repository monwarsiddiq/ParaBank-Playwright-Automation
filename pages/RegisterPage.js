class RegisterPage {
  constructor(page) {
    this.page = page;
    this.field = {
      firstName: page.locator('[name="customer.firstName"]'),
      lastName:  page.locator('[name="customer.lastName"]'),
      street:    page.locator('[name="customer.address.street"]'),
      city:      page.locator('[name="customer.address.city"]'),
      state:     page.locator('[name="customer.address.state"]'),
      zipCode:   page.locator('[name="customer.address.zipCode"]'),
      phone:     page.locator('[name="customer.phoneNumber"]'),
      ssn:       page.locator('[name="customer.ssn"]'),
      username:  page.locator('[name="customer.username"]'),
      password:  page.locator('[name="customer.password"]'),
      confirm:   page.locator('[name="repeatedPassword"]'),
    };
    this.submit  = page.getByRole('button', { name: 'Register' });
    this.welcome = page.locator('#rightPanel h1');
    this.errors  = page.locator('.error');
  }

  async open() {
    await this.page.goto('/parabank/register.htm');
    await this.field.username.waitFor();
  }

  async fillForm(data) {
    await this.field.firstName.fill(data.firstName);
    await this.field.lastName.fill(data.lastName);
    await this.field.street.fill(data.street);
    await this.field.city.fill(data.city);
    await this.field.state.fill(data.state);
    await this.field.zipCode.fill(data.zipCode);
    await this.field.phone.fill(data.phone);
    await this.field.ssn.fill(data.ssn);
    await this.field.username.fill(data.username);
    await this.field.password.fill(data.password);
    await this.field.confirm.fill(data.password);
  }

  /** Register and land logged-in on the overview page. */
  async register(customer) {
    await this.open();
    await this.fillForm(customer);
    await this.submit.click();
    await this.welcome.waitFor();
    return customer;
  }
}
module.exports = { RegisterPage };
