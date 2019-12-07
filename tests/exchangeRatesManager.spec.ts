import * as exchangeRatesManager from '../services/exchangeRatesManager';
import {expect} from 'chai';
import { exchangeRatesUrl } from '../resources/constants';

describe('Test getExchangeRates', () => {

    before(async () => {
        await exchangeRatesManager.downloadAndSaveExchangeRatesFrom(exchangeRatesUrl);
    })

    it('should successfully return the exchange rates for a valid date in the last 90 days', () => {
        expect(exchangeRatesManager.getExchangeRatesOn(new Date())).to.not.throw;
    })
    it('should throw an error for an invalid date', () => {
        expect(exchangeRatesManager.getExchangeRatesOn(new Date('2000-01-01'))).to.throw;
    })
});