import {Page, Locator} from '@playwright/test'

export default class OrderReceivedPOM {

    page: Page
    orderNumber: Locator
    myAccount: Locator
    
    constructor(page: Page){
        this.page = page;
        //Locators
        this.orderNumber = page.locator('.woocommerce-order-overview__order > strong');
        this.myAccount = page.locator('#menu-item-46').getByRole('link', { name: 'My account' });
    }
    
    //ServiceMethods
    async captureOrderNumber(){
        return await this.orderNumber.innerText();
    }

    async goToMyAccount(){
        await this.myAccount.click();
    }
}