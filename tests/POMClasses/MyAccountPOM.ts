import { Page } from '@playwright/test'
import BasePOM from './BasePOM';
import ShopPOM from './ShopPOM';

export default class MyAccountPOM extends BasePOM {

   
    shopLink = this.page.locator('#menu-item-43').getByRole('link', { name: 'Shop' });
    ordersLink = this.page.getByRole('link', { name: ' Orders' });
    cartLink = this.page.locator('#menu-item-44').getByRole('link', { name: 'Cart' });
    logoutLink = this.page.getByRole('link', { name: ' Logout' })

    //Service Methods
    async clickShopLink(): Promise<ShopPOM> {
        await this.shopLink.click();
        return new ShopPOM(this.page);
    }

    async goToOrders(){
        await this.ordersLink.click();
    }

    async clickCartLink(){
        await this.cartLink.click();
    }

    async logout(){
        await this.logoutLink.click();
    }
}
