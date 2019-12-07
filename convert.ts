import * as express from 'express';
import { isNotAValidDate } from './utils';

export const router = express.Router();

router.get("/", (req, res, next) => {
    try{
        const amount = parseFloat(req.query.amount);
        const sourceCurrency = req.query.src_currency; //also check the currencies against an enum or list
        const destinationCurrency = req.query.dest_currency;
        const referenceDate = new Date(req.query.reference_date); //also check if it conforms the format

        if(isNaN(amount)) {
            throw new Error('Amount must be a number');
        }

        if(isNotAValidDate(referenceDate)) {
            throw new Error('referenceDate must be a valid date');
        }

        res.json(["Orange","Apple","Watermellon"]);
    } catch(err) {
        res.status(400).json(err);
    }
});