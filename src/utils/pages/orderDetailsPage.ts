import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";

export default class OrderDetailsPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators

    orderId = (orderId: string) => this.page.getByText(orderId);

    // Methods

    public async checkIfOrderIdIsVisible(orderId: string) {
        await expect(this.orderId(orderId)).toBeVisible();
    }
}