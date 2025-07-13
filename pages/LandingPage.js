export class LandingPage {
  constructor(page) {
    this.page = page;
    this.bookStoreAppLink = page.getByRole("heading", { name: "Book Store Application" });
  }

  async navigateToBookStore() {
    await this.page.goto("https://demoqa.com/");
    await this.bookStoreAppLink.click();
    await this.page.waitForURL("https://demoqa.com/books");
  }
}

