import { expect } from "chai";
import { exchangeRatesUrl } from "../resources/constants";
import * as exchangeRatesManager from "../services/exchangeRatesManager";

describe("Test getExchangeRates", () => {
    before(async () => {
        await exchangeRatesManager.downloadAndSaveExchangeRatesFrom(exchangeRatesUrl);
    });

    it("should throw an error for an invalid date", () => {
        return expect(exchangeRatesManager.getExchangeRatesOn.bind(exchangeRatesManager, new Date("2000-01-01")))
            .to.throw("No exchange rates were found for the given date");
    });
});
