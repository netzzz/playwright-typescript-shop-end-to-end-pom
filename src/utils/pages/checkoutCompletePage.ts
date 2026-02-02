import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

export default class CheckoutCompletePage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators

    orderConfirmationMessage = () => this.page.getByText("Thankyou for the order.");
    ordersPageLink = () => this.page.getByRole('button', { name: /ORDERS/i });

    // Methods

    public async checkIfOrderConfirmationMessageIsVisible() {
        await expect(this.orderConfirmationMessage()).toBeVisible();
    }

    public async getOrderId(): Promise<string> {
        const element = this.page.getByText(/[a-z0-9]{24}/);
        const fullText = await element.textContent();

        if (!fullText) {
            throw new Error('Order ID not found on page');
        }

        // Extract the 24-character order ID from text like "| 6789abc..."
        const match = fullText.match(/[a-z0-9]{24}/);
        return match ? match[0] : '';
    }

    public async goToOrdersPage() {
        await this.ordersPageLink().click();
    }
}