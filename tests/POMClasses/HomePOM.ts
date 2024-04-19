import { Page } from '@playwright/test'
import BasePOM from './BasePOM';

export default class HomePOM extends BasePOM {

    
    popUpBanner = this.page.getByText('Dismiss');
    myAccountLink = this.page.locator('#menu-item-46').getByRole('link', { name: 'My account' });
 
   //ServiceMethods
    async dismissPopUpBanner(){
        await this.popUpBanner.click();
    }
    
    async goMyAccount(){
        await this.myAccountLink.click();
    }
}
