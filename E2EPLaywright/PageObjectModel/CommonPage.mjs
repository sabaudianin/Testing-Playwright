//Clasa Abstarkcyjna

export class Common {
  constructor(page) {
    this.page = page;
  }
  async fillInput(name, value) {
    await this.page.locator(`input[name="${name}"]`).fill(value);
  }

  async clearInput(name) {
    await this.page.locator(`input[name="${name}"]`).clear();
  }

  async clickInput(name) {
    await this.page.locator(`input[name="${name}"]`).click();
  }

  async clickInputByGet(name) {
    await this.#getInput(name).click();
  }
  async fillInputByGet(name, value) {
    await this.#getInput(name).fill(value);
  }
  async clearInputByGet(name) {
    await this.#getInput(name).clear();
  }

  #getInput(name) {
    return this.page.locator(`input[name="${name}"]`);
  }
}
