import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

export default class CheckoutPage{
    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    // Locators

    countryInput = () => this.page.getByRole('textbox', { name: 'Select Country' });
    placeOrderButton = () => this.page.getByRole("button", { name: "Place Order"});
    countryNameButton = (countryName: RegExp) => this.page.getByRole("button", { name: countryName });
    emailLabel = (email: string) => this.page.locator("label").getByText(email);
    cvvCodeInput = () => this.page.locator(".field").filter({ hasText: "CVV Code"}).getByRole('textbox');
    nameOnCardInput = () => this.page.locator(".field").filter({ hasText: "Name on Card"}).getByRole('textbox');
    placeOrderBtn = () => this.page.getByText('Place Order');

    // Methods

    public async selectCountryInput(){
        try{
            await this.clickOnCountryInput();
        }
        catch(error){
            console.error(`Error selecting country input: ${error}`);
            throw error;
        }
    }

    private async clickOnCountryInput(){
        await this.countryInput().click();
    }

    public async typeOnKeyboard(text: string){
        try{
            await this.page.keyboard.type(text);
        }
        catch(error){
            console.error(`Error typing on keyboard: ${error}`);
            throw error;
        }
    }

    public async waitForCountryButtonToLoad(countryName: RegExp){
        await this.countryNameButton(countryName).waitFor();
    }

    public async selectCountry(countryName: RegExp){
        try{
            await this.clickOnCountryOption(countryName);
        }
        catch(error){
            console.error(`Error selecting country option ${countryName}: ${error}`);
            throw error;
        }
    }

    private async clickOnCountryOption(countryName: RegExp){
        await this.countryNameButton(countryName).click();
    }

    public async checkIfLabelIsVisible(text: string){
        await expect(this.emailLabel(text)).toBeVisible();
    }

    public async enterCvvCode(cvvCode: string){
        try{
            await this.fillCvvCode(cvvCode);
        }
        catch(error){
            console.error(`Error entering CVV code: ${error}`);
            throw error;
        }
    }

    private async fillCvvCode(cvvCode: string){
        await this.cvvCodeInput().fill(cvvCode);
    }

    public async enterNameOnCard(nameOnCard: string){
        try{
            await this.fillNameOnCard(nameOnCard);
        }
        catch(error){
            console.error(`Error entering name on card: ${error}`);
            throw error;
        }
    }

    private async fillNameOnCard(nameOnCard: string){
        await this.nameOnCardInput().fill(nameOnCard);
    }

    public async placeOrder(){
        try{
            await this.clickOnPlaceOrderButton();
        }
        catch(error){
            console.error(`Error placing order: ${error}`);
            throw error;
        }
    }

    private async clickOnPlaceOrderButton(){
        await this.placeOrderBtn().click();
    }
}