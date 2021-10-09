import Usc2017 from './usc-2017';

describe('Usc2017', () => {
  let calculator;

  describe('properties', () => {
    describe('and no inputs specified', () => {
      beforeEach(() => {
        calculator = new Usc2017();
      });

      it('has inputs {}', () => {
        expect(calculator.inputs).toEqual({});
      });
    });

    beforeEach(() => {
      calculator = new Usc2017({});
    });

    it('has inputs {}', () => {
      expect(calculator.inputs).toEqual({});
    });

    it('has taxYear 2017', () => {
      expect(calculator.taxYear).toEqual('2017');
    });

    describe('rateBands', () => {
      let rateBands;
      beforeEach(() => {
        rateBands = calculator.rateBands;
      });

      it('has lower band', () => {
        expect(rateBands.lower).toEqual({
          percentage: 0.5, threshold: 12012
        });
      });

      it('has middle band', () => {
        expect(rateBands.middle).toEqual({
          percentage: 2.5, threshold: 6760
        });
      });

      it('has upper band', () => {
        expect(rateBands.upper).toEqual({
          percentage: 5, threshold: 51272
        });
      });

      it('has balance percentage', () => {
        expect(rateBands.balancePercentage).toEqual(8);
      });

      it('has exemption limit', () => {
        expect(rateBands.exemptionLimit).toEqual(13000);
      });
    });
  });

  describe('calculate()', () => {
    describe('weekly', () => {
      const frequency = '1';

      describe('when pay over the exemption threshold', () => {
        const inputs = {
          pay: 13000,
          frequency
        };
        let results;

        beforeEach(() => {
          calculator = new Usc2017(inputs);
          results = calculator.calculate();
        });

        it('includes the type in results', () => {
          expect(results.type).toEqual('USC');
        });

        it('includes the usc payable in results', () => {
          expect(results.value).toEqual({
            total: 84.76,
            perPeriod: 1.63
          });
        });

        it('includes the calculation steps in results', () => {
          expect(results.steps).toEqual(['Calculate USC on lower threshold: 12012 X 0.5% = 60.06','Calculate USC on middle threshold: 988 X 2.5% = 24.70','Calculate USC on upper threshold: 0 X 5% = 0.00','Calculate USC on balance: 0 X 8% = 0.00','USC payable total: 84.76','USC payable per period: 84.76 / 52 = 1.63']);
        });
      });

      describe('when pay under the exemption threshold', () => {
        const inputs = {
          pay: 12000,
          frequency
        };
        let results;

        beforeEach(() => {
          calculator = new Usc2017(inputs);
          results = calculator.calculate();
        });

        it('includes the type in results', () => {
          expect(results.type).toEqual('USC');
        });

        it('includes the usc payable in results', () => {
          expect(results.value).toEqual({
            total: 0.00,
            perPeriod: 0.00
          });
        });

        it('includes the calculation steps in results', () => {
          expect(results.steps).toEqual(['USC not applicable for salary','USC payable total: 0.00','USC payable per period: 0.00 / 52 = 0.00']);
        });
      });
    });

    describe('monthly', () => {
      const frequency = '2';

      describe('when pay over the exemption threshold', () => {
        const inputs = {
          pay: 13000,
          frequency
        };
        let results;

        beforeEach(() => {
          calculator = new Usc2017(inputs);
          results = calculator.calculate();
        });

        it('includes the type in results', () => {
          expect(results.type).toEqual('USC');
        });

        it('includes the usc payable in results', () => {
          expect(results.value).toEqual({
            total: 84.76,
            perPeriod: 7.06
          });
        });

        it('includes the calculation steps in results', () => {
          expect(results.steps).toEqual(['Calculate USC on lower threshold: 12012 X 0.5% = 60.06','Calculate USC on middle threshold: 988 X 2.5% = 24.70','Calculate USC on upper threshold: 0 X 5% = 0.00','Calculate USC on balance: 0 X 8% = 0.00','USC payable total: 84.76','USC payable per period: 84.76 / 12 = 7.06']);
        });
      });

      describe('when pay under the exemption threshold', () => {
        const inputs = {
          pay: 12000,
          frequency
        };
        let results;

        beforeEach(() => {
          calculator = new Usc2017(inputs);
          results = calculator.calculate();
        });

        it('includes the type in results', () => {
          expect(results.type).toEqual('USC');
        });

        it('includes the usc payable in results', () => {
          expect(results.value).toEqual({
            total: 0.00,
            perPeriod: 0.00
          });
        });

        it('includes the calculation steps in results', () => {
          expect(results.steps).toEqual(['USC not applicable for salary','USC payable total: 0.00','USC payable per period: 0.00 / 12 = 0.00']);
        });
      });
    });
  });
});
