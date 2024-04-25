import { Locator } from '@playwright/test'

export default class HelperLib {

    async valueCleaner(valueLocator: Locator): Promise<number>{
        const value = await valueLocator.innerText();
        // Remove non-numeric characters and whitespace
        const valueCleaned = value.replace(/[^\d.]/g, '').trim();
        // Parse the cleaned value text to a float
        return parseFloat(valueCleaned);
    }

    async cleaningOrderValue(valueLocator: Locator): Promise<string>{
        const value = await valueLocator.innerText();
        return value.replace(/[^\d.]/g, '').trim();
    }

    //converts the value into a string of '£value' 
    //For example, if you call formatCurrency(100), it will return a string like '£100.00'
    static formatCurrency(value: number){
        const pounds = Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
        });
        return pounds.format(value);
    }
}
