import * as express from 'express';
import * as convertCurrency from '../services/convertCurrency';
import { isNotAValidDate } from '../utils';

export const router = express.Router();

router.get("/", (req, res, next) => {
        const amount = parseFloat(req.query.amount);
        const sourceCurrency = req.query.src_currency; //also check the currencies against an enum or list
        const destinationCurrency = req.query.dest_currency;
        const referenceDate = new Date(req.query.reference_date); //also check if it conforms the format

        if(isNaN(amount)) {
            throw new Error('query parameter (amount) not found');
        }

        if(!sourceCurrency) {
            throw new Error('query parameter (src_currency) not found');
        }

        if(!destinationCurrency) {
            throw new Error('query parameter (dest_currency) not found');
        }

        if(!referenceDate) {
            throw new Error('query parameter (reference_date) not found');
        }

        if(isNaN(amount)) {
            throw new Error('Amount must be a number');
        }

        if(isNotAValidDate(referenceDate)) {
            throw new Error('referenceDate must be a valid date');
        }

        const convertedAmount = convertCurrency.convert(sourceCurrency, destinationCurrency, amount, referenceDate);

        const responseBody = {
            amount: convertedAmount,
            currency: destinationCurrency
        }

        res.json(responseBody);
});