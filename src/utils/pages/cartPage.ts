import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

export default class CartPage{
    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    // Locators

    productInCart = (productName: string) => this.page.getByText(productName);
    checkoutButton = () => this.page.getByRole("button", { name: "Checkout"});

    // Methods

    public async waitForCartContentToLoad(){
        await this.page.locator(".infoWrap").waitFor();
    }

    public async checkIfProductIsInCart(productName: string){
        try{
            await this.isProductInCartVisible(productName);
        }
        catch(error){
            console.error(`Error verifying product ${productName} in cart: ${error}`);
            throw error;
        }
    }

    private async isProductInCartVisible(productName: string){
        await expect(this.productInCart(productName)).toBeVisible();
    }

    public async goToCheckout(){
        try{
            await this.clickOnCheckoutButton();
        }
        catch(error){
            console.error(`Error navigating to checkout: ${error}`);
            throw error;
        }
    }

    private async clickOnCheckoutButton(){
        await this.checkoutButton().click();
    }
}