import type { Page } from "@playwright/test";

export default class CreatedOrdersPage{
    private readonly page: Page;    
    
    constructor(page: Page){
        this.page = page;
    }

    // Locators

    viewOrderButton = (orderId: string) => this.page.locator('tr').filter({ hasText: orderId })
    .getByRole('button', { name: /view/i });

    // Methods

    public async waitForOrderInOrdersTable(orderId: string){
        this.page.getByRole('rowheader', { name: orderId }).waitFor();
    }

    public async goToOrderDetails(orderId: string){
        try{
            await this.clickOnViewOrderButton(orderId);
        }
        catch(error){
            console.error(`Error navigating to order details for order ID ${orderId}: ${error}`);
            throw error;
        }
    }

    private async clickOnViewOrderButton(orderId: string){
        await this.viewOrderButton(orderId).click();
    }

}