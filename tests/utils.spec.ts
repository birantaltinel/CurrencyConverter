import { expect } from "chai";
import * as utils from "../utils";

describe("Test isNotAValidDate", () => {
    it("should return true", () => {
        const invalidDate = new Date("invalidDateString");
        return expect(utils.isNotAValidDate(invalidDate)).to.be.true;
    });
    it("should return false", () => {
        const invalidDate = new Date("2019-10-10");
        return expect(utils.isNotAValidDate(invalidDate)).to.be.false;
    });
});
