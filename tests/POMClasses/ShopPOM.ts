import { Page } from '@playwright/test'
import BasePOM from './BasePOM';
import CartPOM from './CartPOM';

export default class ShopPOM extends BasePOM{

    
    viewCart = this.page.getByTitle('View cart');
    
    //ServiceMethods
    async addItemToCart(itemName: string) {
        await this.page.getByLabel(`Add “${itemName}” to your cart`).click();
    }
    async goToCart(): Promise<CartPOM> {
        await this.viewCart.click();
        return new CartPOM(this.page);
    }
}
