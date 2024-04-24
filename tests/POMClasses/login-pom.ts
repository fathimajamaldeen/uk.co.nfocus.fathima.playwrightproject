import { expect } from '@playwright/test';
import BasePOM from './base-pom'
import MyAccountPOM from './myAccount-pom';


export default class LoginPOM extends BasePOM {

    private usernameField = this.page.locator('#username');
    private passwordField = this.page.locator('#password');
    private loginElement = this.page.getByRole('button', { name: 'Log in' });

    //Logging in 
    async login(username: string | undefined, password: string | undefined): Promise<MyAccountPOM> {
        expect(username, 'Should have username defined in .env file').toBeDefined(); //generic assertion so doesnt need an await
        expect(password, 'Should have password defined in .env file').toBeDefined(); //not a soft expect so when it dont have it'll throw error
        //dont have to do this if you have a global as its mandatory
        
        if (username && password) {
            await this.usernameField.fill(username);
            await this.passwordField.fill(password);
            await this.loginElement.click();
        };
        return new MyAccountPOM(this.page);
    };
}
