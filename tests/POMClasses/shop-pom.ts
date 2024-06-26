import BasePOM from './base-pom';
import CartPOM from './cart-pom';

export default class ShopPOM extends BasePOM{

    private viewCart = this.page.getByTitle('View cart');
    
    //ServiceMethods
    async addItemToCart(itemName: string) {
        await this.page.getByLabel(`Add “${itemName}” to your cart`).click();
    }
    async goToCart(): Promise<CartPOM> {
        await this.viewCart.click();
        return new CartPOM(this.page);
    }
}
