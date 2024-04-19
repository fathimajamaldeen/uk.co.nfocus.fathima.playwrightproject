import { Page } from '@playwright/test'
import BasePOM from './BasePOM';

export default class OrderReceivedPOM extends BasePOM{

    orderNumber = this.page.locator('.woocommerce-order-overview__order > strong');
    myAccount = this.page.locator('#menu-item-46').getByRole('link', { name: 'My account' });
       
    //ServiceMethods
    async captureOrderNumber(){
        return await this.orderNumber.innerText();
    }

    async goToMyAccount(){
        await this.myAccount.click();
    }
}