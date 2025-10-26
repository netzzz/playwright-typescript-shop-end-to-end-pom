import type { Page } from '@playwright/test';

export default class ShopPage{
    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    // Locators

    addToCartButton = (productName: string) => this.page.locator(".card-body")
    .filter({hasText: productName}).getByRole("button", {name: "Add To Cart"});

    cartButton = () => this.page.getByRole("listitem").getByText("Cart");

    // Methods
    
    public async waitForShopPageToLoad(){
        await this.page.waitForLoadState("networkidle");
    }

    public async waitForShopItemsToLoad(){
        await this.page.locator(".card-body").first().waitFor();
    }

    public async addProductToCart(productName: string){
        try{
            await this.clickAddToCartButton(productName);
        }
        catch(error){
            console.error(`Error adding product ${productName} to cart: ${error}`);
            throw error;
        }     
    }

    private async clickAddToCartButton(productName: string){
        await this.addToCartButton(productName).click();
    }

    public async goToCart(){
        try{
            await this.clickOnCartButton();
        }
        catch(error){
            console.error(`Error navigating to cart: ${error}`);
            throw error;
        }
    }

    private async clickOnCartButton(){
        await this.cartButton().click();
    }
}