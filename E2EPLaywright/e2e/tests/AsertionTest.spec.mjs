import { expect, test } from "@playwright/test";

test.describe("AsertionTest", () => {
  //   test("Login itd...", async ({ page }) => {
  //     await page.goto("/");

  //     await expect(page.getByText("Your Feed")).not.toBeVisible();
  //     await expect(page.getByRole("link", { name: "Sign up" })).toBeVisible();
  //     await expect(page.getByRole("link", { name: "Sign in" })).toBeVisible();
  //     await page.getByRole("link", { name: "Sign in" }).click();
  //     await page.getByPlaceholder("Email").fill("luke@coderslab.pl");
  //     await page.getByPlaceholder("Password").fill("secret");
  //     await page.getByRole("button", { name: "Sign in" }).click();
  //     await expect(page.getByText("Your Feed")).toBeVisible();
  //     await expect(page.getByRole("link", { name: "Sign up" })).not.toBeVisible();
  //   });

  test("NewUSer", async ({ page }) => {
    await page.goto("/");
    const id = Date.now();
    const email = `email-${id}@coderslab.pl`;
    await expect(page.getByRole("link", { name: "Sign up" })).toBeVisible();
    await page.getByRole("link", { name: "Sign up" }).click();

    await page.getByPlaceholder("Your Name").fill("MyName");
    await page.getByPlaceholder("Email").fill(email);
    await page.getByPlaceholder("Password").fill("secret");

    await expect(page.getByPlaceholder("Your Name")).toHaveValue("MyName");
    await expect(page.getByPlaceholder("Email")).toHaveValue(email);
    await expect(page.getByPlaceholder("Password")).toHaveValue("secret");
    await page.getByRole("button", { name: "Sign up" }).click();

    await expect(page.getByRole("link", { name: "New Post" })).toBeVisible();
    await page.getByRole("link", { name: "New Post" }).click();

    await page.getByPlaceholder("Article Title").fill("The Title");
    await page.getByPlaceholder("What's this article about?").fill("MyDesc");
    await page
      .getByPlaceholder("Write your article (in markdown)")
      .fill("MyContent");
    await page.getByPlaceholder("Enter tags").fill("MyTag");
    await page.getByPlaceholder("Enter tags").press("Enter");
    await page.getByRole("button", { name: "Publish Article" }).click();

    await expect(page.getByText("The Title")).toBeVisible();

    await page.goto("http://localhost:3000/");

    await expect(
      page.getByRole("button", { name: "Global Feed" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Global Feed" }).click();

    await expect(page.getByText("The Title")).toBeVisible();
  });
});
