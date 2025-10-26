import type { Page } from '@playwright/test';

export default class LoginPage{

    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    public async goTo(): Promise<void>{
        await this.page.goto('https://rahulshettyacademy.com/client');
    }

    public async closePage(): Promise<void>{
        await this.page.close();
    }

    // Locators

    emailInput = () => this.page.getByPlaceholder("email@example.com");
    passwordInput = ()  => this.page.getByPlaceholder("enter your passsword");
    loginButton = ()  => this.page.getByRole("button", {name: "Login"});

    // Methods

    public async enterEmail(email: string): Promise<void>{
        try{
            await this.fillEmail(email);
        }
        catch(error){
            console.error(`Error entering email: ${error}`);
            throw error;
        }
    }

    private async fillEmail(email: string): Promise<void>{
        await this.emailInput().fill(email);
    }

    public async enterPassword(password: string): Promise<void>{
        try{
            await this.fillPassword(password);
        }
        catch(error){
            console.error(`Error entering password: ${error}`);
            throw error;
        }
    }

    private async fillPassword(password: string): Promise<void>{
        await this.passwordInput().fill(password);
    }

    public async clickLoginButton(): Promise<void>{
        try{
            await this.loginButton().click();
        }
        catch(error){
            console.error(`Error clicking login button: ${error}`);
            throw error;
        }
    }
}