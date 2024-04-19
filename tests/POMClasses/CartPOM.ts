import { Page } from '@playwright/test'
import HelperLib from './HelperLib'
import BasePOM from './BasePOM'

export default class CartPOM extends BasePOM {

   
    discountCodeField = this.page.getByPlaceholder('Coupon code');
    applyCodeButton = this.page.getByRole('button', { name: 'Apply coupon' })
    proceedToCheckout = this.page.getByRole('link', { name: 'Proceed to checkout ' });
    discountPriceElement = this.page.locator('.cart-discount .woocommerce-Price-amount');
    totalPriceElement = this.page.locator('strong bdi');
    subtotalPriceElement = this.page.locator('td:nth-child(2) > .woocommerce-Price-amount > bdi');
    shippingPriceElement = this.page.locator('label bdi');
    myAccountLink = this.page.locator('#menu-item-46').getByRole('link', { name: 'My account' });
    removeCoupon = this.page.getByRole('link', { name: '[Remove]' });
    removeItem = this.page.getByLabel('Remove this item');

    helperLib: HelperLib

    constructor(page: Page) {
        super(page);
        this.helperLib = new HelperLib();
        //Locator
    }

    async applyDiscountCode(discountCode: string) {
        await this.discountCodeField.click();
        await this.discountCodeField.clear();
        await this.discountCodeField.fill(discountCode);
    }

    async clickApplyCode() {
        await this.applyCodeButton.click();
    }

    async goToCheckout() {
        await this.proceedToCheckout.click();
    }

    async goMyAccount(){
        await this.myAccountLink.click();
    }

    async removeCouponCodeFromCart(){
        await this.removeCoupon.click();
    }
    
    async removeItemFromCart(){
        await this.removeItem.click();
    }

    //Capturing Methods
    async captureDiscountPrice(){
        return this.helperLib.ValueCleaner(this.discountPriceElement);
    }

    async captureTotalPrice() {
        return this.helperLib.ValueCleaner(this.totalPriceElement);
    }

    async captureSubTotalPrice() {
        return this.helperLib.ValueCleaner(this.subtotalPriceElement);
    }

    async captureShippingPrice() {
        return this.helperLib.ValueCleaner(this.shippingPriceElement);
    }
}
