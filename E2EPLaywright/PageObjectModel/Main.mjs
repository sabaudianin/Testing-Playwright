//jak  ie chcesz toworzyc nowej instancji za kazdym razem usun export z Main class i dodaj:

// export const injectMainPage = async ({ page }, use) =>
//   await use(new Main(page));

export class Main {
  constructor(page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto("/");
  }
  async clickSignInButton() {
    await this.page.getByRole("link", { name: "Sign in" }).click();
  }
  async veryfiAwatarName(name) {
    const avatarLocator = this.page.getByRole("link", { name: name });
    await expect(await avatarLocator).toBeVisible();
  }
}
