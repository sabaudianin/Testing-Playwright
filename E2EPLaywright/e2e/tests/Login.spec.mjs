import { expect, test } from "@playwright/test";

// test.describe("Login flow", () => {
// test("Go to login page, submit form with valid data, verify redirection", async ({
//   page,
// }) => {
//   await page.goto("/");
//   await page.getByRole("link", { name: "Sign in" }).click();
//   await page.getByPlaceholder("Email").fill("luke@coderslab.pl");
//   await page.getByPlaceholder("Password").fill("secret");
//   await page.getByRole("button").click();
//   await expect(page.getByRole("link", { name: "luke" })).toBeVisible();
// });
test.describe("Conduit", () => {
  test("Login Leia", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Sign in" }).click();
    await page.getByPlaceholder("Email").fill("leia@coderslab.pl");
    await page.getByPlaceholder("Password").fill("secret");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByRole("link", { name: "leia" })).toBeVisible();

    await page.getByRole("link", { name: "New Post" }).click();
    await page.getByPlaceholder("Article Title").fill("LEJA");
    await page
      .getByPlaceholder("What's this article about?")
      .fill("About Leia");
    await page
      .getByPlaceholder("Write your article (in markdown)")
      .fill("About Leia 2");
    await page.getByPlaceholder("Enter tags").fill("lejka");
    await page.getByRole("button", { name: "Publish Article" }).click();
    await expect(
      page.getByRole("button", { name: "Post Comment" })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "LEJA" })).toBeVisible();
    await expect(page).toHaveURL("http://127.0.0.1:3000/article/leja");
  });

  test("Login Luke with locator or other asertions", async ({ page }) => {
    const id = Date.now();
    const email = `luke-${id}@com.pl`;
    await page.goto("/");
    await page.locator("text=Sign up").click();
    await page.locator(".form-control[type='text']").fill("Luke");
    await page.locator("input[placeholder='Email']").fill(email);
    await page.locator("input[name='password']").fill("secret");
    await page.locator("button[type='submit']").click();
    await expect(page.getByText("Luke")).toBeVisible();
  });
});
