import { expect } from "@playwright/test";
import { Common } from "./Common.mjs";

export const injectSignUpPage = async ({ page }, use) =>
  await use(new SignUp(page));

// class SignUp {
//   constructor(page) {
//     this.page = page;
//   }

//   async verifyUrl() {
//     await expect(this.page).toHaveURL(/register/);
//   }
//   async fillUserNameInput(value) {
//     await this.page.locator('input[name="Your Name"]').fill(value);
//   }
//   async fillEmailInput(value) {
//     await this.page.locator('input[name="Email"]').fill(value);
//   }

//   async fillPasswordInput(value) {
//     await this.page.locator('.form-control[type="Password"]').fill(value);
//   }

//   async submitForm() {
//     await this.page.getByRole("button", { name: "Sign up" }).click();
//   }
// }

class SignUp extends Common {
  constructor(page) {
    super(page);
  }

  async verifyUrl() {
    await expect(this.page).toHaveURL(/register/);
  }
  async fillUserNameInput(value) {
    await this.fillInputByGet("Your Name", value);
  }
  async fillEmailInput(value) {
    await this.fillInputByGet("email", value);
  }

  async fillPasswordInput(value) {
    await this.fillInputByGet("password", value);
  }

  async submitForm() {
    await this.page.getByRole("button", { name: "Sign up" }).click();
  }
}
