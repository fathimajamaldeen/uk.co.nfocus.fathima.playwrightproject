import {Page, Locator} from '@playwright/test'

export default class HomePOM {

    page: Page
    myAccountLink: Locator
    popUpBanner: Locator
    
    constructor(page: Page){
        this.page = page;
        //Locators
        this.popUpBanner = page.getByText('Dismiss');
        this.myAccountLink = page.locator('#menu-item-46').getByRole('link', { name: 'My account' });
    }

    //ServiceMethods
    async dismissPopUpBanner(){
        await this.popUpBanner.click();
    }
    
    async goMyAccount(){
        await this.myAccountLink.click();
    }

}