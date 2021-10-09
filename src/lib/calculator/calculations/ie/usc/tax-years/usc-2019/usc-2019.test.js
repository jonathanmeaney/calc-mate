import Usc2019 from './usc-2019';

describe('Usc2019', () => {
  let calculator;

  describe('properties', () => {
    describe('and no inputs specified', () => {
      beforeEach(() => {
        calculator = new Usc2019();
      });

      it('has inputs {}', () => {
        expect(calculator.inputs).toEqual({});
      });
    });

    beforeEach(() => {
      calculator = new Usc2019({});
    });

    it('has inputs {}', () => {
      expect(calculator.inputs).toEqual({});
    });

    it('has taxYear 2019', () => {
      expect(calculator.taxYear).toEqual('2019');
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
          percentage: 2, threshold: 7862
        });
      });

      it('has upper band', () => {
        expect(rateBands.upper).toEqual({
          percentage: 4.5, threshold: 50170
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
          calculator = new Usc2019(inputs);
          results = calculator.calculate();
        });

        it('includes the type in results', () => {
          expect(results.type).toEqual('USC');
        });

        it('includes the usc payable in results', () => {
          expect(results.value).toEqual({
            total: 79.82,
            perPeriod: 1.54
          });
        });

        it('includes the calculation steps in results', () => {
          expect(results.steps).toEqual(['Calculate USC on lower threshold: 12012 X 0.5% = 60.06','Calculate USC on middle threshold: 988 X 2% = 19.76','Calculate USC on upper threshold: 0 X 4.5% = 0.00','Calculate USC on balance: 0 X 8% = 0.00','USC payable total: 79.82','USC payable per period: 79.82 / 52 = 1.54']);
        });
      });

      describe('when pay under the exemption threshold', () => {
        const inputs = {
          pay: 12000,
          frequency
        };
        let results;

        beforeEach(() => {
          calculator = new Usc2019(inputs);
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
          calculator = new Usc2019(inputs);
          results = calculator.calculate();
        });

        it('includes the type in results', () => {
          expect(results.type).toEqual('USC');
        });

        it('includes the usc payable in results', () => {
          expect(results.value).toEqual({
            total: 79.82,
            perPeriod: 6.65
          });
        });

        it('includes the calculation steps in results', () => {
          expect(results.steps).toEqual(['Calculate USC on lower threshold: 12012 X 0.5% = 60.06','Calculate USC on middle threshold: 988 X 2% = 19.76','Calculate USC on upper threshold: 0 X 4.5% = 0.00','Calculate USC on balance: 0 X 8% = 0.00','USC payable total: 79.82','USC payable per period: 79.82 / 12 = 6.65']);
        });
      });

      describe('when pay under the exemption threshold', () => {
        const inputs = {
          pay: 12000,
          frequency
        };
        let results;

        beforeEach(() => {
          calculator = new Usc2019(inputs);
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
