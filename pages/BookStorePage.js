import fs from "fs";
import { expect } from "@playwright/test";

export class BookStorePage {
  constructor(page) {
    this.page = page;
    this.searchBox = page.locator("#searchBox");
  }

  async searchBook(bookName) {
    await this.page.getByText("Book Store", { exact: true }).click();
    await this.searchBox.fill(bookName);
    await this.searchBox.press("Enter");

    await expect(
      this.page.getByRole("link", { name: bookName })
    ).toBeVisible({ timeout: 10000 });
  }

  async exportBookDetailsToCSV(filePath = "BookDetails.csv") {
    const bookTitle = await this.page.locator(".rt-td").nth(1).textContent();
    const bookAuthor = await this.page.locator(".rt-td").nth(2).textContent();
    const bookPublisher = await this.page.locator(".rt-td").nth(3).textContent();

    let bookDetailsData = `"Title","Author","Publisher"\n`;
    bookDetailsData += `${bookTitle},${bookAuthor},${bookPublisher}\n`;

    fs.writeFileSync(filePath, bookDetailsData);
    console.log(`Book details exported to ${filePath}`);
  }
}
