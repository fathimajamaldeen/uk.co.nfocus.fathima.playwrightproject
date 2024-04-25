import BasePOM from './base-pom';

export default class OrderReceivedPOM extends BasePOM{

    private orderNumber = this.page.locator('.woocommerce-order-overview__order > strong');
    private myAccount = this.page.locator('#menu-main').getByRole('link', { name: 'My account' });
       
    //ServiceMethods
    async captureOrderNumber(): Promise<string>{
        return await this.orderNumber.innerText();
    }

    async goToMyAccount(){
        await this.myAccount.click();
    }
}