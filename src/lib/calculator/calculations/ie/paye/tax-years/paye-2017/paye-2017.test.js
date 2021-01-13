import Paye2017 from './paye-2017';

describe('Paye2017', () => {
  let calculator;

  describe('properties', () => {
    beforeEach(() => {
      calculator = new Paye2017();
    });

    it('has inputs {}', () => {
      expect(calculator.inputs).toEqual({});
    });

    it('has taxYear 2017', () => {
      expect(calculator.taxYear).toEqual('2017');
    });

    it('has yearlyStdRateCutOff 33800', () => {
      expect(calculator.yearlyStdRateCutOff).toEqual(33800);
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
        calculator = new Paye2017(inputs);
        results = calculator.calculate();
      });

      it('includes the type in results', () => {
        expect(results.type).toEqual('PAYE');
      });

      it('includes the tax payable in results', () => {
        expect(results.value).toEqual('206.54');
      });

      it('includes the calculation steps in results', () => {
        expect(results.steps).toEqual(['Calculate std rate cut off for period: (33800 / 52) * 1 = 650.00', 'Apply the standard rate of 20% to the income in the rate band: 650.00 * 20% = 130.00', 'Apply the higher rate of 40% on the balance: (1000 - 650.00) * 40% = 140.00', 'Gross tax: 130.00 + 140.00 = 270', 'Tax Credit for period: 3300 / 52 * 1 = 63.46', 'Gross tax less tax credits: 270 - 63.46 = 206.54', 'Tax payable: 206.54']);
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
        calculator = new Paye2017(inputs);
        results = calculator.calculate();
      });

      it('includes the type in results', () => {
        expect(results.type).toEqual('PAYE');
      });

      it('includes the tax payable in results', () => {
        expect(results.value).toEqual('36.54');
      });

      it('includes the calculation steps in results', () => {
        expect(results.steps).toEqual(['Calculate std rate cut off for period: (33800 / 52) * 1 = 650.00', 'Apply the standard rate of 20% to the income in the rate band: 500 * 20% = 100.00', 'Pay is less than std rate cut off for period so not applying 40% rate: 0', 'Gross tax: 100.00 + 0 = 100', 'Tax Credit for period: 3300 / 52 * 1 = 63.46', 'Gross tax less tax credits: 100 - 63.46 = 36.54', 'Tax payable: 36.54']);
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
        calculator = new Paye2017(inputs);
        results = calculator.calculate();
      });

      it('includes the type in results', () => {
        expect(results.type).toEqual('PAYE');
      });

      it('includes the tax payable in results', () => {
        expect(results.value).toEqual(0);
      });

      it('includes the calculation steps in results', () => {
        expect(results.steps).toEqual(['Calculate std rate cut off for period: (33800 / 52) * 1 = 650.00', 'Apply the standard rate of 20% to the income in the rate band: 100 * 20% = 20.00', 'Pay is less than std rate cut off for period so not applying 40% rate: 0', 'Gross tax: 20.00 + 0 = 20', 'Tax Credit for period: 3300 / 52 * 1 = 63.46', 'Gross tax less tax credits results in negative, 0 tax payable: 0', 'Tax payable: 0']);
      });
    });
  });
});