//jak chcesz uzyc injectMainPage to w testach zamiast tworzyc nowa instancje Main(page) uzyc:
// import {expect,test as base} from "@playwright/test";
// import {injectMainPage,Main} from "./Main.mjs"
// const test = base.extend({
//     mainPage:injectMainPage})

// test.describe("Main class ", () => {
//     test("Login", async ({ page,MainPage }) => {...

import { test, expect } from "@playwright/test";
import { Main } from "./Main.mjs";

test.describe("Main class ", () => {
  test("Login", async ({ page }) => {
    const mainPage = new Main(page);
    await mainPage.visit();
    await mainPage.clickSignInButton();
    await expect(page).toHaveURL(/login/);

    const emailLocator = page.getByPlaceholder("Email");
    await emailLocator.click();
    await expect(emailLocator).toBeFocused();
    await expect(emailLocator).toBeEditable();

    await emailLocator.fill("luke@coderslab.pl");
    await page.getByPlaceholder("Password").fill("secret");
    await page.getByRole("button").click();

    await mainPage.veryfiAwatarName("luke");
  });
});
