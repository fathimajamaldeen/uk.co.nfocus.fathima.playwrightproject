import { Page } from '@playwright/test'
import HelperLib from './HelperLib'
import BasePOM from './BasePOM';

export default class OrdersInMyaccountPOM extends BasePOM{

    
    accountOrderNumber = this.page.locator('.woocommerce-orders-table__row:nth-child(1) > .woocommerce-orders-table__cell-order-number > a');
    logoutButton = this.page.getByRole('link', { name: ' Logout' });
    helperLib: HelperLib
    
    constructor(page: Page){
        super(page);
        this.helperLib = new HelperLib();
    }

    //ServiceMethods
    async captureAccountOrderNumber(){
        return this.helperLib.CleaningOrderValue(this.accountOrderNumber); 
    }

    async logout(){
        await this.logoutButton.click();
    }
}
