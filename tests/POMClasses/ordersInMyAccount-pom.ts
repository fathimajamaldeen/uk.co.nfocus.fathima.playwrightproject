import { Page } from '@playwright/test'
import HelperLib from './helper-library'
import BasePOM from './base-pom';

export default class OrdersInMyaccountPOM extends BasePOM{

    private accountOrderNumber = this.page.locator('.woocommerce-orders-table__row:nth-child(1) > .woocommerce-orders-table__cell-order-number > a');
    private logOut = this.page.getByRole('link', { name: ' Logout' });
    private helperLib: HelperLib;
    
    constructor(page: Page){
        super(page);
        this.helperLib = new HelperLib();
    }

    //ServiceMethods
    async captureAccountOrderNumber(): Promise<string>{
        return this.helperLib.cleaningOrderValue(this.accountOrderNumber); 
    }

    async logout(){
        await this.logOut.click();
    }
}
