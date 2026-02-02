import type { Page } from '@playwright/test';

export default class LoginPage {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async goTo(): Promise<void> {
        await this.page.goto('/client');
    }

    public async closePage(): Promise<void> {
        await this.page.close();
    }

    // Locators

    emailInput = () => this.page.getByPlaceholder("email@example.com");
    passwordInput = () => this.page.getByPlaceholder("enter your passsword");
    loginButton = () => this.page.getByRole("button", { name: "Login" });

    // Methods

    public async enterEmail(email: string): Promise<void> {
        await this.emailInput().fill(email);
    }

    public async enterPassword(password: string): Promise<void> {
        await this.passwordInput().fill(password);
    }

    public async clickLoginButton(): Promise<void> {
        await this.loginButton().click();
    }
}