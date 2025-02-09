import { expect } from "@playwright/test";
import { Common } from "./Common.mjs";

export const injectSignInPage = async ({ page }, use) =>
  await use(new SignIn(page));

// class SignIn  {
//   constructor(page) {
//     this.page = page;
//   }
//   async verifyUrl() {
//     await expect(this.page).toHaveURL(/login/);
//   }

//   async fillEmailInput(value) {
//     await this.page.getByPlaceholder("Email").fill(value);
//   }

//   async fillPasswordInput(value) {
//     await this.page.getByPlaceholder("Password").fill(value);
//   }

//   async submitForm() {
//     await this.page.getByRole("button", { name: "Sign in" }).click();
//   }
// }

class SignIn extends Common {
  constructor(page) {
    super(page);
  }
  async verifyUrl() {
    await expect(this.page).toHaveURL(/login/);
  }

  async fillEmailInput(value) {
    await this.fillInputByGet("email", value);
  }

  async fillPasswordInput(value) {
    await this.fillInputByGet("password", value);
  }

  async submitForm() {
    await this.page.getByRole("button", { name: "Sign in" }).click();
  }
}
