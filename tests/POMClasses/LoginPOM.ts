import { Page } from '@playwright/test'
import BasePOM from './BasePOM'
import MyAccountPOM from './MyAccountPOM';


export default class LoginPOM extends BasePOM{

   
    usernameField = this.page.locator('#username');
    passwordField = this.page.locator('#password');
    loginButton = this.page.getByRole('button', { name: 'Log in' });
          
    //Logging in 
    async login(username:string, password: string): Promise<MyAccountPOM> {
        await this.usernameField.clear();
        await this.usernameField.fill(username);
        await this.passwordField.clear();
        await this.passwordField.fill(password);
        await this.loginButton.click();
        return new MyAccountPOM(this.page);
    };
}
