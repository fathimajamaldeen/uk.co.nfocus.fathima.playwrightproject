import { Locator } from '@playwright/test'

export default class HelperLib {

    async ValueCleaner(valueLocator: Locator){
        const value = await valueLocator.innerText();
        // Remove non-numeric characters and whitespace
        const valueCleaned = value.replace(/[^\d.]/g, '').trim();
        // Parse the cleaned value text to a float
        return parseFloat(valueCleaned);
    }

    async CleaningOrderValue(valueLocator: Locator){
        const value = await valueLocator.innerText();
        return value.replace(/[^\d.]/g, '').trim();
    }
}
