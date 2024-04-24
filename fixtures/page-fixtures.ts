import { expect, test as base } from '@playwright/test';
import HomePOM from '../tests/POMClasses/home-pom';
import LoginPOM from '../tests/POMClasses/login-pom';
import ShopPOM from '../tests/POMClasses/shop-pom';

type testFixture = {
    loggedInShop: ShopPOM;
    homePage: HomePOM;
}

export const test = base.extend<testFixture>({
    homePage: async ({ page }, use) => {
        //Go to site
        await page.goto('/demo-site');

        const home = new HomePOM(page);
        await home.dismissPopUpBanner();
        await use(home);
    },

    loggedInShop: async ({ homePage }, use) => {
        await homePage.goMyAccount();

        const loginPage = new LoginPOM(homePage.page);
        const myAccountPage = await loginPage.login(process.env.EMAIL, process.env.PASSWORD);
        expect(myAccountPage.logOut, "Needs to be logged in").toBeVisible();

        await use(await myAccountPage.GoToShop());

        const cartPage = await myAccountPage.goToCart();

        
        //Cleaning up the cart
        await cartPage.removeCouponCodeFromCart();
        await cartPage.removeItemFromCart();

        await cartPage.goToMyAccount();
        await myAccountPage.logout();

        await homePage.page.close();
    }
});
export { expect } from '@playwright/test';
