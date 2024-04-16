import {Page, Locator} from '@playwright/test'

export default class MyAccountPOM {

    page: Page
    shopLink: Locator
    ordersLink: Locator
    cartLink: Locator
    logoutLink: Locator
    
    constructor(page: Page){
        this.page = page;
        //Locators
        this.shopLink = page.locator('#menu-item-43').getByRole('link', { name: 'Shop' });
        this.ordersLink = page.getByRole('link', { name: ' Orders' });
        this.cartLink = page.locator('#menu-item-44').getByRole('link', { name: 'Cart' });
        this.logoutLink = page.getByRole('link', { name: ' Logout' })
    }

    //Service Methods
    async clickShopLink() {
        await this.shopLink.click();
    }

    async goToOrders(){
        await this.ordersLink.click();
    }

    async clickCartLink(){
        await this.cartLink.click();
    }

    async logout(){
        await this.logoutLink. click();
    };

}