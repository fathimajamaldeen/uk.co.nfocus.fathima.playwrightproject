import BasePOM from './base-pom';

export default class HomePOM extends BasePOM {
    
    private popUpBanner = this.page.getByText('Dismiss');
    private myAccount = this.page.locator('#menu-main').getByRole('link', { name: 'My account' });
 
   //ServiceMethods
    async dismissPopUpBanner(){
        await this.popUpBanner.click();
    }
    
    async goMyAccount(){
        await this.myAccount.click();
    }
}
