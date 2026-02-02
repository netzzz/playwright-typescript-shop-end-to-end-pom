import type { Page } from '@playwright/test';

export default class ShopPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators

    addToCartButton = (productName: string) => this.page.locator(".card-body")
        .filter({ hasText: productName }).getByRole("button", { name: "Add To Cart" });

    cartButton = () => this.page.getByRole("listitem").getByText("Cart");

    // Methods

    public async waitForShopPageToLoad() {
        await this.page.waitForLoadState("networkidle");
    }

    public async waitForShopItemsToLoad() {
        await this.page.locator(".card-body").first().waitFor();
    }

    public async addProductToCart(productName: string) {
        await this.addToCartButton(productName).click();
    }

    public async goToCart() {
        await this.cartButton().click();
    }
}