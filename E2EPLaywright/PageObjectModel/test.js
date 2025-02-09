test("Login user without POM", async ({ page }) => {
  await page.goto("https://example.com/login");
  await page.fill("#username", "user");
  await page.fill("#password", "password");
  await page.click("#login");
  // Tutaj możemy dodać asercje sprawdzające poprawność logowania
});

//POM
test("Login user with POM", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.enterUsername("user");
  await loginPage.enterPassword("password");
  await loginPage.clickLogin();
  // Tutaj możemy dodać asercje sprawdzające poprawność logowania
});
