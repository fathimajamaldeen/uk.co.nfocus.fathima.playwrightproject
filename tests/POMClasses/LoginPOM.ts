import {Page, Locator} from '@playwright/test'


export default class LoginPOM {

    page: Page
    usernameField: Locator
    passwordField: Locator
    loginButton: Locator
        
    constructor(page: Page){
        this.page = page;
        //Locators
        this.usernameField = page.locator('#username');
        this.passwordField = page.locator('#password');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
    };
    
    //ServiceMethods
    
    async login(username:string, password: string){
        await this.usernameField.clear();
        await this.usernameField.fill(username);
        await this.passwordField.clear();
        await this.passwordField.fill(password);
        await this.loginButton.click();
    };
    
    
}