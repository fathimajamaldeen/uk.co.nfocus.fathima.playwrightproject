import {Page, Locator} from '@playwright/test'

export default class ShopPOM {

    page: Page
    
    viewCart: Locator
    
    constructor(page: Page){
        this.page = page;
        //Locators
        this.viewCart = page.getByTitle('View cart');

    }

    //ServiceMethods
    async addItemToCart(itemName: string) {
        await this.page.getByLabel(`Add “${itemName}” to your cart`).click();
    }
    async goToCart(){
        await this.viewCart.click();
    }

}

