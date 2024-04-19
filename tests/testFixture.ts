import { expect, test as base } from '@playwright/test';
import HomePOM from './POMClasses/HomePOM';
import LoginPOM from './POMClasses/LoginPOM';
import ShopPOM from './POMClasses/ShopPOM';

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
        const myAccountPage = await loginPage.login(process.env.EMAIL as string, process.env.PASSWORD as string);

        await use(await myAccountPage.clickShopLink());

        await myAccountPage.logout();

        await homePage.page.close();
    }
});
export { expect } from '@playwright/test';
