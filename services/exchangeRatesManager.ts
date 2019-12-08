import * as fs from "fs";
import * as https from "https";
import * as moment from "moment";
import { promisify } from "util";
import * as parse from "xml-parser";
import { exchangeRatesFilePath } from "../resources/constants";

interface ExchangeRates {
    [U: string]: number;
}

function downloadAndSaveExchangeRatesFromWithCallback(url: string, callback: (err?: any) => void) {
    const file = fs.createWriteStream(exchangeRatesFilePath);
    https.get(url, (response) => {
        response.pipe(file);
        file.on("finish", () => {
            file.close();
            callback();
        });
    }).on("error", (err) => {
        fs.unlinkSync(exchangeRatesFilePath);
        callback(new Error("Failed to download and save the exchange rates."));
    });
}

export const downloadAndSaveExchangeRatesFrom = promisify(downloadAndSaveExchangeRatesFromWithCallback);

export function getExchangeRatesOn(date: Date): ExchangeRates {
    const dateMoment = moment(date);
    const exchangeRatesXml = fs.readFileSync(exchangeRatesFilePath, "utf8");
    const exchangeRates = parse(exchangeRatesXml);

    const exchangeRatesOnTargetDate = exchangeRates.root.children[2].children.find((dailyExchangeRate) => {
        const dateOfTheRates = moment(dailyExchangeRate.attributes.time);
        return dateOfTheRates.isSame(dateMoment, "day");
    });

    if (!exchangeRatesOnTargetDate) {
        throw new Error("No exchange rates were found for the given date");
    }

    const exchangeRatesJSON = {};

    exchangeRatesOnTargetDate.children.forEach((exchangeRate) => {
        exchangeRatesJSON[exchangeRate.attributes.currency] = parseFloat(exchangeRate.attributes.rate);
    });

    return exchangeRatesJSON;
}
