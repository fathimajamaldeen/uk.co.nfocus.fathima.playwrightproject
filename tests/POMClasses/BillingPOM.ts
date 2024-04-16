import {Page, Locator} from '@playwright/test'

export default class BillingPOM {

    page: Page
    billingFirstName: Locator
    bilingLastName: Locator
    billingAddress: Locator
    billingCity: Locator
    billingPostcode: Locator
    billingPhone: Locator
    billingEmail: Locator
    placeOrderButton

    constructor(page: Page){
        this.page = page;
        //Locators
        this.billingFirstName = page.locator('#billing_first_name');
        this.bilingLastName = page.locator('#billing_last_name');
        this.billingAddress = page.locator('#billing_address_1');
        this.billingCity = page.locator('#billing_city');
        this.billingPostcode = page.locator('#billing_postcode');
        this.billingPhone = page.locator('#billing_phone');
        this.billingEmail = page.locator('#billing_email');
        this.placeOrderButton = page.getByRole('button', { name: 'Place order' });
    }

    //ServiceMethods
    
    async fillBillingDetailsAndProceed(fName: string, lName:string, address: string, city: string, postcode: string, phone: string, email: string){
        await this.billingFirstName.fill(fName);
        await this.bilingLastName.fill(lName);
        await this.billingAddress.fill(address);
        await this.billingCity.fill(city);
        await this.billingPostcode.fill(postcode);
        await this.billingPhone.fill(phone);
        await this.billingEmail.fill(email);
        await this.placeOrderButton.click();
    }

}