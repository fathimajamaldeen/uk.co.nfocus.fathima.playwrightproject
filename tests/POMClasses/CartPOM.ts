import { Page, expect } from '@playwright/test'
import HelperLib from './HelperLib'
import BasePOM from './BasePOM'
import exp from 'constants';

export default class CartPOM extends BasePOM {
   
    private discountCodeField = this.page.getByPlaceholder('Coupon code');
    private applyCoupon = this.page.getByRole('button', { name: 'Apply coupon' });
    private proceedToCheckout = this.page.getByRole('link', { name: 'Proceed to checkout ' });
    public discountPriceElement = this.page.locator('.cart-discount .woocommerce-Price-amount');
    private totalPriceElement = this.page.locator('strong bdi');
    private subtotalPriceElement = this.page.locator('td:nth-child(2) > .woocommerce-Price-amount > bdi');
    private shippingPriceElement = this.page.locator('label bdi');
    private myAccount = this.page.locator('#menu-item-46').getByRole('link', { name: 'My account' });
    private removeCoupon = this.page.getByRole('link', { name: '[Remove]' });
    private removeItem = this.page.getByLabel('Remove this item');

    helperLib: HelperLib

    constructor(page: Page) {
        super(page);
        this.helperLib = new HelperLib();
        //Locator
    }

    async applyDiscountCode(discountCode: string) {
        await this.discountCodeField.fill(discountCode);
    }

    async applyCouponCode() {
        await this.applyCoupon.click();
    }

    async goToCheckout() {
        await this.proceedToCheckout.click();
    }

    async goToMyAccount(){
        await this.myAccount.click();
    }

    async removeCouponCodeFromCart(){
        await expect( async () => {
            if (await this.removeCoupon.first().isVisible()){
                await this.removeCoupon.first().click();
            };
            await expect(this.removeCoupon).toHaveCount(0);
        }).toPass();
    }
    
    async removeItemFromCart(){
        await expect( async () => {
            if (await this.removeItem.first().isVisible()){
                await this.removeItem.first().click();
            };
            await expect(this.removeItem).toHaveCount(0);
        }).toPass();
    }

    //Capturing Methods
    async captureDiscountPrice(): Promise<number>{
        return this.helperLib.valueCleaner(this.discountPriceElement);
    }

    async captureTotalPrice(): Promise<number> {
        return this.helperLib.valueCleaner(this.totalPriceElement);
    }

    async captureSubTotalPrice(): Promise<number> {
        return this.helperLib.valueCleaner(this.subtotalPriceElement);
    }

    async captureShippingPrice(): Promise<number> {
        return this.helperLib.valueCleaner(this.shippingPriceElement);
    }
}
