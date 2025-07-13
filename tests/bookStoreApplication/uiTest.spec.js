import { test, expect } from "@playwright/test";
import fs from "fs";

test("UI Automation", async ({ page }) => {
  test.setTimeout(60000);
  await page.goto("https://demoqa.com/");
  // Navigate
  await page.getByRole("heading", { name: "Book Store Application" }).click();
  await expect(page).toHaveURL("https://demoqa.com/books");
  // Login a user
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("textbox", { name: "UserName" }).fill(process.env.USER);
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(process.env.PASSWORD);
  await page.getByRole("button", { name: "Login" }).click();
  // Validate the username and log out button to be visible
  await expect(page.locator("#userName-value")).toContainText("tempuser234");
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();

  await page.getByText("Book Store", { exact: true }).click();
  await page.locator("#searchBox").fill("Learning JavaScript Design Patterns");
  await page.locator("#searchBox").press("Enter");

  // Validate the book is present in Search Result
  await expect(
    page.getByRole("link", { name: "Learning JavaScript Design Patterns" })
  ).toBeVisible({ timeout: 10000 });

  const bookTitle = await page.locator(".rt-td").nth(1).textContent();
  const bookAuthor = await page.locator(".rt-td").nth(2).textContent();
  const bookPublisher = await page.locator(".rt-td").nth(3).textContent();
  let bookDetailsData = `"Title","Author","Publisher"\n`;
  bookDetailsData += `${bookTitle},${bookAuthor},${bookPublisher}\n`;
  fs.writeFileSync("BookDetails.csv", bookDetailsData);
  console.log("Book Details successfully added in `BookDetails.csv`");

  await page.getByRole("button", { name: "Log out" }).click();
});
