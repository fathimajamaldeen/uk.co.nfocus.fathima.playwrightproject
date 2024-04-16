import {Page, Locator} from '@playwright/test'
import HelperLib from './HelperLib'

export default class OrdersInMyaccountPOM {

    page: Page
    accountOrderNumber: Locator
    logoutButton: Locator
    helperLib: HelperLib
    
    constructor(page: Page){
        this.page = page;
        this.helperLib = new HelperLib();
        //Locators
        this.accountOrderNumber = page.locator('.woocommerce-orders-table__row:nth-child(1) > .woocommerce-orders-table__cell-order-number > a');
        this.logoutButton = page.getByRole('link', { name: ' Logout' });
    }

    //ServiceMethods
    async captureAccountOrderNumber(){
        return this.helperLib.CleaningOrderValue(this.accountOrderNumber); 
    }

    async logout(){
        await this.logoutButton.click();
    }

}