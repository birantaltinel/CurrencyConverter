import * as sinon from 'sinon';
import * as supertest from 'supertest';
import { app } from '../app';

function threwError(res: Response){
    if(res.status !== 200) {
        throw new Error('failed');
    }
}

describe('Test convert router', () => {
    const response = {
        json: sinon.spy(),
        status : sinon.spy()
    };

    beforeEach(() => {
        response.json.resetHistory();
        response.status.resetHistory();
    });
    
    it('should send a successful response', () => {
        const query = {
            amount: "10",
            src_currency: "EUR",
            dest_currenc: "TRY",
            reference_date: "2019-10-10"
        }

        const pathWithQuery = `/convert?amount=${
            query.amount
        }&reference_date=${
            query.reference_date
        }&src_currency=${
            query.src_currency
        }&dest_currency=${
            query.dest_currenc
        }`;

        supertest(app)
            .get(pathWithQuery)
            .expect(200)
            .end(function(err, res){
                if (err) throw err;
             });
    })
    it('should send an error response for invalid amount parameter', () => {
        const query = {
            amount: "stringInsteadOfNumber",
            src_currency: "EUR",
            dest_currenc: "TRY",
            reference_date: "2019-10-10"
        }

        const pathWithQuery = `/convert?amount=${
            query.amount
        }&reference_date=${
            query.reference_date
        }&src_currency=${
            query.src_currency
        }&dest_currency=${
            query.dest_currenc
        }`;

        supertest(app)
            .get(pathWithQuery)
            .expect(threwError)
            .end(function(err, res){
                if (err) throw err;
             });
    })
    it('should send an error response for invalid reference_date parameter', () => {
        const query = {
            amount: "10",
            src_currency: "EUR",
            dest_currenc: "TRY",
            reference_date: "invalidDate"
        }

        const pathWithQuery = `/convert?amount=${
            query.amount
        }&reference_date=${
            query.reference_date
        }&src_currency=${
            query.src_currency
        }&dest_currency=${
            query.dest_currenc
        }`;

        supertest(app)
            .get(pathWithQuery)
            .expect(threwError)
            .end(function(err, res){
                if (err) throw err;
             });
    })
})