import type { Page } from "@playwright/test";

export default class CreatedOrdersPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators

    viewOrderButton = (orderId: string) => this.page.locator('tr').filter({ hasText: orderId })
        .getByRole('button', { name: /view/i });

    // Methods

    public async waitForOrderInOrdersTable(orderId: string) {
        await this.page.getByRole('rowheader', { name: orderId }).waitFor();
    }

    public async goToOrderDetails(orderId: string) {
        await this.viewOrderButton(orderId).click();
    }
}