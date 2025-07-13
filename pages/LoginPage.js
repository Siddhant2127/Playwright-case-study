import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByRole("textbox", { name: "UserName" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.userNameDisplay = page.locator("#userName-value");
    this.logoutButton = page.getByRole("button", { name: "Log out" });
  }

  async login(username, password) {
    await this.loginButton.click();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async validateLogin(expectedUser) {
    await this.userNameDisplay.waitFor({ state: "visible" });
    await this.logoutButton.waitFor({ state: "visible" });
    await expect(this.userNameDisplay).toContainText(expectedUser);
    await expect(this.logoutButton).toBeVisible();
  }

  async logout() {
    await this.logoutButton.click();
  }
}

