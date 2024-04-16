import { test, expect } from '@playwright/test';
import HomePOM from './POMClasses/HomePOM'
import LoginPOM from './POMClasses/LoginPOM';
import MyAccountPOM from './POMClasses/MyAccountPOM';
import ShopPOM from './POMClasses/ShopPOM';
import CartPOM from './POMClasses/CartPOM';
import BillingPOM from './POMClasses/BillingPOM';
import OrderRecievedPOM from './POMClasses/OrderReceivedPOM';
import OrdersInMyAccountPOM from './POMClasses/OrdersInMyAccountPOM';
import products from '../test-data/products.json';
import billingDetail from '../test-data/billingDetails.json';
import discountData from '../test-data/discountCodes.json';


test.beforeEach(`Runs before each test`, async ({ page }) => {
    //Go to site
    await page.goto('demo-site');

    const home = new HomePOM(page);
    await home.dismissPopUpBanner();
    await home.goMyAccount();

    const loginPage = new LoginPOM(page);
    await loginPage.login(process.env.EMAIL as string, process.env.PASSWORD as string);

    const myAccountPage = new MyAccountPOM(page);
    await myAccountPage.clickShopLink();


});

test.afterEach(`Runs after each test`, async ({ page }) => {
    const myAccountPage = new MyAccountPOM(page);
    await myAccountPage.logout();

    //await page.close();

});


test.describe(`Multiple test cases`, () => {
    for (const product of products) {
        for (const { code, amount } of discountData) {
            test(`Applying Discount Code Test - ${code} for the product ${product.item}`, async ({ page }) => {
                const shopPage = new ShopPOM(page);
                await shopPage.addItemToCart(product.item);
                await shopPage.goToCart();

                const cartPage = new CartPOM(page);
                await cartPage.applyDiscountCode(code);
                await cartPage.clickApplyCode();

                const subtotalValue = await cartPage.captureSubTotalPrice();
                const discountValue = await cartPage.captureDiscountPrice();
                const expectedDiscountValue = subtotalValue * amount;
                expect(discountValue).toBe(expectedDiscountValue);

                //Cleaning up the cart
                await cartPage.removeCouponCodeFromCart();
                await cartPage.removeItemFromCart();

                await cartPage.goMyAccount();
            });
        };  
    };

    for (const product of products) {
        test(`Checking out Test for the product ${product.item}`, async ({ page }) => {
            const shopPage = new ShopPOM(page);
            await shopPage.addItemToCart(product.item);

            await shopPage.goToCart();
            const cartPage = new CartPOM(page);
            await cartPage.goToCheckout();

            const billingPage = new BillingPOM(page);
            await billingPage.fillBillingDetailsAndProceed(billingDetail.fName,
                billingDetail.sName,
                billingDetail.address,
                billingDetail.city,
                billingDetail.postcode,
                billingDetail.phoneNumber,
                billingDetail.email);

            const orderReceivedPage = new OrderRecievedPOM(page);
            const orderNumberText = await orderReceivedPage.captureOrderNumber();
            await orderReceivedPage.goToMyAccount();

            const myAccountPage = new MyAccountPOM(page);
            await myAccountPage.goToOrders();

            const ordersPage = new OrdersInMyAccountPOM(page);
            const accountOrderNumberCleaned = await ordersPage.captureAccountOrderNumber();
            expect(orderNumberText).toEqual(accountOrderNumberCleaned);

        });
    };
});
