import { test, expect } from './testFixture.ts';
import HomePOM from './POMClasses/HomePOM'
import LoginPOM from './POMClasses/LoginPOM';
import MyAccountPOM from './POMClasses/MyAccountPOM';
import ShopPOM from './POMClasses/ShopPOM';
import CartPOM from './POMClasses/CartPOM';
import CheckoutPOM from './POMClasses/BillingPOM';
import OrderRecievedPOM from './POMClasses/OrderReceivedPOM';
import OrdersInMyAccountPOM from './POMClasses/OrdersInMyAccountPOM';
import products from '../test-data/products.json';
import billingDetail from '../test-data/billingDetails.json';
import discountData from '../test-data/discountCodes.json';
import { log } from 'console';


// test.beforeEach(`Runs before each test`, async ({ page }) => {
//     //Go to site
//     await page.goto('demo-site');

//     const home = new HomePOM(page);
//     await home.dismissPopUpBanner();
//     await home.goMyAccount();

//     const loginPage = new LoginPOM(page);
//     await loginPage.login(process.env.EMAIL as string, process.env.PASSWORD as string);

//     const myAccountPage = new MyAccountPOM(page);
//     await myAccountPage.clickShopLink();
// })

// test.afterEach(`Runs after each test`, async ({ page }) => {
//     const myAccountPage = new MyAccountPOM(page);
//     await myAccountPage.logout();

//     await page.close();
// })


test.describe(`Multiple test cases for nFocus eCommerce Website`, () => {
    for (const product of products) {
        for (const { code, amount } of discountData) {
            test(`Applying Discount Code Test - ${code} for the product ${product.item}`,async ({ loggedInShop }) => {
                await loggedInShop.addItemToCart(product.item);
                await loggedInShop.goToCart();

                const cartPage = new CartPOM(loggedInShop.page);
                await cartPage.applyDiscountCode(code);
                await cartPage.clickApplyCode();

                const subtotalValue = await cartPage.captureSubTotalPrice();
                const discountValue = await cartPage.captureDiscountPrice();
                const expectedDiscountValue = parseFloat((subtotalValue * amount).toFixed(2));
                expect(discountValue).toEqual(expectedDiscountValue);


                //Cleaning up the cart
                await cartPage.removeCouponCodeFromCart();
                await cartPage.removeItemFromCart();

                await cartPage.goMyAccount();
            })
        }
    }

    for (const product of products) {
        test(`Checking out Test for the product ${product.item}`, async ({ loggedInShop }, testInfo) => {
            await loggedInShop.addItemToCart(product.item);

            await loggedInShop.goToCart();
            const cartPage = new CartPOM(loggedInShop.page);
            await cartPage.goToCheckout();

            const CheckoutPage = new CheckoutPOM(loggedInShop.page);
            await CheckoutPage.fillBillingDetailsAndProceed(billingDetail.fName,
                billingDetail.sName,
                billingDetail.address,
                billingDetail.city,
                billingDetail.postcode,
                billingDetail.phoneNumber,
                billingDetail.email);
            
            const orderReceivedPage = new OrderRecievedPOM(loggedInShop.page);
            const orderNumberText = await orderReceivedPage.captureOrderNumber();

            const orderNoScreenshot = await loggedInShop.page.screenshot(
                { path: `screenshots/test2/orderNo-${product.item}.png` });

            await testInfo.attach('Order No', {
                body: orderNoScreenshot,
                contentType: 'image/png',
            });

            await orderReceivedPage.goToMyAccount();

            const myAccountPage = new MyAccountPOM(loggedInShop.page);
            await myAccountPage.goToOrders();

            const ordersPage = new OrdersInMyAccountPOM(loggedInShop.page);
            const accountOrderNumberCleaned = await ordersPage.captureAccountOrderNumber();
            const orderNoInAccountScreenshot = await loggedInShop.page.screenshot(
                { path: `screenshots/test2/orderNoInAccount-${product.item}.png` });

            await testInfo.attach('Order No. in Account', {
                body: orderNoInAccountScreenshot,
                contentType: 'image/png',
            });
            expect(orderNumberText).toEqual(accountOrderNumberCleaned);
        })
    }
})
