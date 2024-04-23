import BasePOM from './BasePOM';
import ShopPOM from './ShopPOM';

export default class MyAccountPOM extends BasePOM {

   
    private shopLink = this.page.locator('#menu-item-43').getByRole('link', { name: 'Shop' });
    private orders = this.page.getByRole('link', { name: ' Orders' });
    private cart = this.page.locator('#menu-item-44').getByRole('link', { name: 'Cart' });
    logOut = this.page.getByRole('link', { name: ' Logout' });

    //Service Methods
    async GoToShop(): Promise<ShopPOM> {
        await this.shopLink.click();
        return new ShopPOM(this.page);
    }

    async goToOrders(){
        await this.orders.click();
    }

    async goToCart(){
        await this.cart.click();
    }

    async logout(){
        await this.logOut.click();
    }

}
