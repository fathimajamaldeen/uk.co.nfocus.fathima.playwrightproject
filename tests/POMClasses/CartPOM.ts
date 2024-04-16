import { Page, Locator } from '@playwright/test'
import HelperLib from './HelperLib'

export default class CartPOM {

    page: Page
    discountCodeField: Locator
    applyCodeButton: Locator
    proceedToCheckout: Locator
    discountPriceElement: Locator
    totalPriceElement: Locator
    subtotalPriceElement: Locator
    shippingPriceElement: Locator
    myAccountLink: Locator
    removeCoupon: Locator
    removeItem: Locator

    helperLib: HelperLib

    constructor(page: Page) {
        this.page = page;
        this.helperLib = new HelperLib();
        //Locators
        this.discountCodeField = page.getByPlaceholder('Coupon code');
        this.applyCodeButton = page.getByRole('button', { name: 'Apply coupon' })
        this.proceedToCheckout = page.getByRole('link', { name: 'Proceed to checkout ' });
        this.discountPriceElement = page.locator('.cart-discount .woocommerce-Price-amount');
        this.totalPriceElement = page.locator('strong bdi');
        this.subtotalPriceElement = page.locator('td:nth-child(2) > .woocommerce-Price-amount > bdi');
        this.shippingPriceElement = page.locator('label bdi');
        this.myAccountLink = page.locator('#menu-item-46').getByRole('link', { name: 'My account' });
        this.removeCoupon = page.getByRole('link', { name: '[Remove]' });
        this.removeItem = page.getByLabel('Remove this item');
    }

    //ServiceMethods
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