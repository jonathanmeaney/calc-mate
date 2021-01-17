import Paye2021 from './paye-2021';

describe('Paye2021', () => {
  let calculator;

  describe('properties', () => {
    describe('and no inputs specified', () => {
      beforeEach(() => {
        calculator = new Paye2021();
      });

      it('has inputs {}', () => {
        expect(calculator.inputs).toEqual({});
      });
    });

    beforeEach(() => {
      calculator = new Paye2021({});
    });

    it('has inputs {}', () => {
      expect(calculator.inputs).toEqual({});
    });

    it('has taxYear 2021', () => {
      expect(calculator.taxYear).toEqual('2021');
    });

    it('has yearlyStdRateCutOff 35300', () => {
      expect(calculator.yearlyStdRateCutOff).toEqual(35300);
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
        calculator = new Paye2021(inputs);
        results = calculator.calculate();
      });

      it('includes the type in results', () => {
        expect(results.type).toEqual('PAYE');
      });

      it('includes the tax payable in results', () => {
        expect(results.value).toEqual('200.77');
      });

      it('includes the calculation steps in results', () => {
        expect(results.steps).toEqual(['Calculate std rate cut off for period: (35300 / 52) * 1 = 678.85', 'Apply the standard rate of 20% to the income in the rate band: 678.85 * 20% = 135.77', 'Apply the higher rate of 40% on the balance: (1000 - 678.85) * 40% = 128.46', 'Gross tax: 135.77 + 128.46 = 264.23', 'Tax Credit for period: 3300 / 52 * 1 = 63.46', 'Gross tax less tax credits: 264.23 - 63.46 = 200.77', 'Tax payable: 200.77']);
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
        calculator = new Paye2021(inputs);
        results = calculator.calculate();
      });

      it('includes the type in results', () => {
        expect(results.type).toEqual('PAYE');
      });

      it('includes the tax payable in results', () => {
        expect(results.value).toEqual('36.54');
      });

      it('includes the calculation steps in results', () => {
        expect(results.steps).toEqual(['Calculate std rate cut off for period: (35300 / 52) * 1 = 678.85', 'Apply the standard rate of 20% to the income in the rate band: 500 * 20% = 100.00', 'Pay is less than std rate cut off for period so not applying 40% rate: 0', 'Gross tax: 100.00 + 0 = 100.00', 'Tax Credit for period: 3300 / 52 * 1 = 63.46', 'Gross tax less tax credits: 100.00 - 63.46 = 36.54', 'Tax payable: 36.54']);
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
        calculator = new Paye2021(inputs);
        results = calculator.calculate();
      });

      it('includes the type in results', () => {
        expect(results.type).toEqual('PAYE');
      });

      it('includes the tax payable in results', () => {
        expect(results.value).toEqual(0);
      });

      it('includes the calculation steps in results', () => {
        expect(results.steps).toEqual(['Calculate std rate cut off for period: (35300 / 52) * 1 = 678.85', 'Apply the standard rate of 20% to the income in the rate band: 100 * 20% = 20.00', 'Pay is less than std rate cut off for period so not applying 40% rate: 0', 'Gross tax: 20.00 + 0 = 20.00', 'Tax Credit for period: 3300 / 52 * 1 = 63.46', 'Gross tax less tax credits results in negative, 0 tax payable: 0', 'Tax payable: 0']);
      });
    });
  });
});