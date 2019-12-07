import * as cashify from 'cashify';
import { getExchangeRatesOn } from './exchangeRatesManager'

export function convert(from: string, to: string, amount: number, referenceDate: Date): number {
    const rates = getExchangeRatesOn(referenceDate);
    return cashify.convert(amount, {from, to, base: 'EUR', rates});
}