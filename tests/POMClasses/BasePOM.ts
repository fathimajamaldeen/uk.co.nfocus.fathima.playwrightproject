import { Page } from '@playwright/test'
export default class BasePOM {
    page: Page

    constructor(page: Page) {
        this.page = page;
        
    }
}
