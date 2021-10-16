import Paye2022 from './paye-2022';

describe('Paye2022', () => {
  let calculator;

  describe('properties', () => {
    describe('and no inputs specified', () => {
      beforeEach(() => {
        calculator = new Paye2022();
      });

      it('has inputs {}', () => {
        expect(calculator.inputs).toEqual({});
      });
    });

    beforeEach(() => {
      calculator = new Paye2022({});
    });

    it('has inputs {}', () => {
      expect(calculator.inputs).toEqual({});
    });

    it('has taxYear 2022', () => {
      expect(calculator.taxYear).toEqual('2022');
    });

    it('has yearlyStdRateCutOff 36800', () => {
      expect(calculator.yearlyStdRateCutOff).toEqual(36800);
    });

    it('has yearlyTaxCredits 3400', () => {
      expect(calculator.yearlyTaxCredits).toEqual(3400);
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
        calculator = new Paye2022(inputs);
        results = calculator.calculate();
      });

      it('includes the type in results', () => {
        expect(results.type).toEqual('PAYE');
      });

      it('includes the tax payable in results', () => {
        expect(results.value).toEqual('193.08');
      });

      it('includes the calculation steps in results', () => {
        expect(results.steps).toEqual(['Calculate std rate cut off for period: (36800 / 52) * 1 = 707.69', 'Apply the standard rate of 20% to the income in the rate band: 707.69 * 20% = 141.54', 'Apply the higher rate of 40% on the balance: (1000 - 707.69) * 40% = 116.92', 'Gross tax: 141.54 + 116.92 = 258.46', 'Tax Credit for period: 3400 / 52 * 1 = 65.38', 'Gross tax less tax credits: 258.46 - 65.38 = 193.08', 'Tax payable: 193.08']);
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
        calculator = new Paye2022(inputs);
        results = calculator.calculate();
      });

      it('includes the type in results', () => {
        expect(results.type).toEqual('PAYE');
      });

      it('includes the tax payable in results', () => {
        expect(results.value).toEqual('34.62');
      });

      it('includes the calculation steps in results', () => {
        expect(results.steps).toEqual(['Calculate std rate cut off for period: (36800 / 52) * 1 = 707.69', 'Apply the standard rate of 20% to the income in the rate band: 500 * 20% = 100.00', 'Pay is less than std rate cut off for period so not applying 40% rate: 0', 'Gross tax: 100.00 + 0 = 100.00', 'Tax Credit for period: 3400 / 52 * 1 = 65.38', 'Gross tax less tax credits: 100.00 - 65.38 = 34.62', 'Tax payable: 34.62']);
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
        calculator = new Paye2022(inputs);
        results = calculator.calculate();
      });

      it('includes the type in results', () => {
        expect(results.type).toEqual('PAYE');
      });

      it('includes the tax payable in results', () => {
        expect(results.value).toEqual(0);
      });

      it('includes the calculation steps in results', () => {
        expect(results.steps).toEqual(['Calculate std rate cut off for period: (36800 / 52) * 1 = 707.69', 'Apply the standard rate of 20% to the income in the rate band: 100 * 20% = 20.00', 'Pay is less than std rate cut off for period so not applying 40% rate: 0', 'Gross tax: 20.00 + 0 = 20.00', 'Tax Credit for period: 3400 / 52 * 1 = 65.38', 'Gross tax less tax credits results in negative, 0 tax payable: 0', 'Tax payable: 0']);
      });
    });
  });
});
