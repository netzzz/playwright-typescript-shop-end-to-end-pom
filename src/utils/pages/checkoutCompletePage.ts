import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

export default class CheckoutCompletePage{
    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    // Locators

    orderConfirmationMessage = () => this.page.getByText("Thankyou for the order.");
    ordersPageLink = () => this.page.getByRole('button', { name: /ORDERS/i });
    
    // Methods

    public async checkIfOrderConfirmationMessageIsVisible(){
        try{
            await this.isOrderConfirmationMessageVisible();
        }
        catch(error){
            console.error(`Error verifying order confirmation message: ${error}`);
            throw error;
        }   
    }

    private async isOrderConfirmationMessageVisible(){
        await expect(this.orderConfirmationMessage()).toBeVisible();
    }

    public async getOrderId(): Promise<string>{
        try{
            let orderId: string = await this.findOrderIdOnPage();
            return orderId;
        }
        catch(error){
            console.error(`Error retrieving order ID from page: ${error}`);
            throw error;
        }
    }

    private async findOrderIdOnPage(): Promise<string>{
        let orderIdFromPage : string|null= await this.page.getByText(/[a-z0-9]{24}/).textContent();
        let orderId : string = '';

        if(orderIdFromPage != null){
            orderId = orderIdFromPage.slice(2,-2);
        }
        return orderId;
    }

    public async goToOrdersPage(){
        try{
            await this.clickOnOrdersPageLink();
        }
        catch(error){
            console.error(`Error navigating to orders page: ${error}`);
            throw error;
        }
    }

    private async clickOnOrdersPageLink(){
        await this.ordersPageLink().click();
    }
}