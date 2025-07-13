import { test } from "@playwright/test";
import { PageObjects } from "../../pages/pageObjects";

test("UI Automation", async ({ page }) => {
  test.setTimeout(60000);
  const pageObjects = new PageObjects(page);

  await pageObjects.landingPage.navigateToBookStore();

  await pageObjects.loginPage.login(process.env.USER, process.env.PASSWORD);
  await pageObjects.loginPage.validateLogin(process.env.USER);

  await pageObjects.bookStorePage.searchBook("Learning JavaScript Design Patterns");
  await pageObjects.bookStorePage.exportBookDetailsToCSV();

  await pageObjects.loginPage.logout();
});
