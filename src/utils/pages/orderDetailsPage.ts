import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";

export default class OrderDetailsPage{
    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    // Locators

    orderId = (orderId: string) => this.page.getByText(orderId);

    // Methods

    public async checkIfOrderIdIsVisible(orderId: string){
        try{
            await this.isOrderIdVisible(orderId);
        }
        catch(error){
            console.error(`Error verifying order ID ${orderId} on order details page: ${error}`);
            throw error;
        }
    }

    private async isOrderIdVisible(orderId: string){
        await expect(this.orderId(orderId)).toBeVisible();
    }
}