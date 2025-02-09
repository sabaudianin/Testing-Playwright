class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameSelector = "#username";
    this.passwordSelector = "#password";
    this.loginButtonSelector = "#login";
  }

  async navigate() {
    await this.page.goto("https://example.com/login");
  }

  async enterUsername(username) {
    await this.page.fill(this.usernameSelector, username);
  }

  async enterPassword(password) {
    await this.page.fill(this.passwordSelector, password);
  }

  async clickLogin() {
    await this.page.click(this.loginButtonSelector);
  }
}
