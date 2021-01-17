import Paye2018 from './paye-2018';

describe('Paye2018', () => {
  let calculator;

  describe('properties', () => {
    describe('and no inputs specified', () => {
      beforeEach(() => {
        calculator = new Paye2018();
      });

      it('has inputs {}', () => {
        expect(calculator.inputs).toEqual({});
      });
    });

    beforeEach(() => {
      calculator = new Paye2018({});
    });

    it('has inputs {}', () => {
      expect(calculator.inputs).toEqual({});
    });

    it('has taxYear 2018', () => {
      expect(calculator.taxYear).toEqual('2018');
    });

    it('has yearlyStdRateCutOff 34550', () => {
      expect(calculator.yearlyStdRateCutOff).toEqual(34550);
    });

    it('has yearlyTaxCredits 3300', () => {
      expect(calculator.yearlyTaxCredits).toEqual(3300);
    });
  });

  describe('calculate()', () => {
    describe('when pay over the period SRCOP', () => {
      const inputs = {
        period: 1,
        pay: 1000,
        periods: 52
      };
      let results;

      beforeEach(() => {
        calculator = new Paye2018(inputs);
        results = calculator.calculate();
      });

      it('includes the type in results', () => {
        expect(results.type).toEqual('PAYE');
      });

      it('includes the tax payable in results', () => {
        expect(results.value).toEqual('203.65');
      });

      it('includes the calculation steps in results', () => {
        expect(results.steps).toEqual(['Calculate std rate cut off for period: (34550 / 52) * 1 = 664.42', 'Apply the standard rate of 20% to the income in the rate band: 664.42 * 20% = 132.88', 'Apply the higher rate of 40% on the balance: (1000 - 664.42) * 40% = 134.23', 'Gross tax: 132.88 + 134.23 = 267.11', 'Tax Credit for period: 3300 / 52 * 1 = 63.46', 'Gross tax less tax credits: 267.11 - 63.46 = 203.65', 'Tax payable: 203.65']);
      });
    });

    describe('when pay under the period SRCOP', () => {
      const inputs = {
        period: 1,
        pay: 500,
        periods: 52
      };
      let results;

      beforeEach(() => {
        calculator = new Paye2018(inputs);
        results = calculator.calculate();
      });

      it('includes the type in results', () => {
        expect(results.type).toEqual('PAYE');
      });

      it('includes the tax payable in results', () => {
        expect(results.value).toEqual('36.54');
      });

      it('includes the calculation steps in results', () => {
        expect(results.steps).toEqual(['Calculate std rate cut off for period: (34550 / 52) * 1 = 664.42', 'Apply the standard rate of 20% to the income in the rate band: 500 * 20% = 100.00', 'Pay is less than std rate cut off for period so not applying 40% rate: 0', 'Gross tax: 100.00 + 0 = 100.00', 'Tax Credit for period: 3300 / 52 * 1 = 63.46', 'Gross tax less tax credits: 100.00 - 63.46 = 36.54', 'Tax payable: 36.54']);
      });
    });

    describe('when pay too low for tax', () => {
      const inputs = {
        period: 1,
        pay: 100,
        periods: 52
      };
      let results;

      beforeEach(() => {
        calculator = new Paye2018(inputs);
        results = calculator.calculate();
      });

      it('includes the type in results', () => {
        expect(results.type).toEqual('PAYE');
      });

      it('includes the tax payable in results', () => {
        expect(results.value).toEqual(0);
      });

      it('includes the calculation steps in results', () => {
        expect(results.steps).toEqual(['Calculate std rate cut off for period: (34550 / 52) * 1 = 664.42', 'Apply the standard rate of 20% to the income in the rate band: 100 * 20% = 20.00', 'Pay is less than std rate cut off for period so not applying 40% rate: 0', 'Gross tax: 20.00 + 0 = 20.00', 'Tax Credit for period: 3300 / 52 * 1 = 63.46', 'Gross tax less tax credits results in negative, 0 tax payable: 0', 'Tax payable: 0']);
      });
    });
  });
});