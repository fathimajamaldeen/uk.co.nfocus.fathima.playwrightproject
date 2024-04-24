import BasePOM from './base-pom'

export default class CheckoutPOM extends BasePOM {

    private billingFirstName = this.page.locator('#billing_first_name');
    private bilingLastName = this.page.locator('#billing_last_name');
    private billingAddress = this.page.locator('#billing_address_1');
    private billingCity = this.page.locator('#billing_city');
    private billingPostcode = this.page.locator('#billing_postcode');
    private billingPhone = this.page.locator('#billing_phone');
    private billingEmail = this.page.locator('#billing_email');
    private placeOrder = this.page.getByRole('button', { name: 'Place order' });


    async fillBillingDetailsAndProceed(fName: string, lName: string, address: string, city: string, postcode: string, phone: string, email: string) {
        await this.billingFirstName.fill(fName);
        await this.bilingLastName.fill(lName);
        await this.billingAddress.fill(address);
        await this.billingCity.fill(city);
        await this.billingPostcode.fill(postcode);
        await this.billingPhone.fill(phone);
        await this.billingEmail.fill(email);
        await this.placeOrder.click();
    }
}
