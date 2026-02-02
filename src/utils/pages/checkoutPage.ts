import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

export default class CheckoutPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators

    countryInput = () => this.page.getByRole('textbox', { name: 'Select Country' });
    countryNameButton = (countryName: RegExp) => this.page.getByRole("button", { name: countryName });
    emailLabel = (email: string) => this.page.locator("label").getByText(email);
    cvvCodeInput = () => this.page.locator(".field").filter({ hasText: "CVV Code" }).getByRole('textbox');
    nameOnCardInput = () => this.page.locator(".field").filter({ hasText: "Name on Card" }).getByRole('textbox');
    placeOrderButton = () => this.page.getByText('Place Order');

    // Methods

    public async selectCountryInput() {
        await this.countryInput().click();
    }

    public async typeOnKeyboard(text: string) {
        await this.page.keyboard.type(text);
    }

    public async waitForCountryButtonToLoad(countryName: RegExp) {
        await this.countryNameButton(countryName).waitFor();
    }

    public async selectCountry(countryName: RegExp) {
        await this.countryNameButton(countryName).click();
    }

    public async checkIfLabelIsVisible(text: string) {
        await expect(this.emailLabel(text)).toBeVisible();
    }

    public async enterCvvCode(cvvCode: string) {
        await this.cvvCodeInput().fill(cvvCode);
    }

    public async enterNameOnCard(nameOnCard: string) {
        await this.nameOnCardInput().fill(nameOnCard);
    }

    public async placeOrder() {
        await this.placeOrderButton().click();
    }
}