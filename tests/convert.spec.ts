import * as sinon from "sinon";
import * as supertest from "supertest";
import { app } from "../app";

function threwError(res: Response): boolean {
    if (res.status !== 200) {
        return true;
    }
}

describe("Test convert router", () => {
    const response = {
        json: sinon.spy(),
        status: sinon.spy(),
    };

    beforeEach(() => {
        response.json.resetHistory();
        response.status.resetHistory();
    });

    it("should send a successful response", () => {
        const query = {
            amount: "10",
            dest_currenc: "TRY",
            reference_date: "2019-10-10",
            src_currency: "EUR",
        };

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
            .expect(200);
    });
    it("should send an error response for invalid amount parameter", () => {
        const query = {
            amount: "stringInsteadOfNumber",
            dest_currenc: "TRY",
            reference_date: "2019-10-10",
            src_currency: "EUR",
        };

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
            .expect(threwError);
    });
    it("should send an error response for invalid reference_date parameter", () => {
        const query = {
            amount: "10",
            dest_currenc: "TRY",
            reference_date: "invalidDate",
            src_currency: "EUR",
        };

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
            .expect(threwError);
    });
});
