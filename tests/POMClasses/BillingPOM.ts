import { Page } from '@playwright/test'
import BasePOM from './BasePOM'

export default class CheckoutPOM extends BasePOM {

    billingFirstName = this.page.locator('#billing_first_name');
    bilingLastName = this.page.locator('#billing_last_name');
    billingAddress = this.page.locator('#billing_address_1');
    billingCity = this.page.locator('#billing_city');
    billingPostcode = this.page.locator('#billing_postcode');
    billingPhone = this.page.locator('#billing_phone');
    billingEmail = this.page.locator('#billing_email');
    placeOrderButton = this.page.getByRole('button', { name: 'Place order' });


    async fillBillingDetailsAndProceed(fName: string, lName: string, address: string, city: string, postcode: string, phone: string, email: string) {
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
