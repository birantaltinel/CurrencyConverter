import * as utils from '../utils';
import { expect } from 'chai';

describe('Test isNotAValidDate', () => {
    it('should return true', () => {
        const invalidDate = new Date('invalidDateString');
        expect(utils.isNotAValidDate(invalidDate)).to.be.true;
    })
    it('should return false', () => {
        const invalidDate = new Date('2019-10-10');
        expect(utils.isNotAValidDate(invalidDate)).to.be.false;
    })
})