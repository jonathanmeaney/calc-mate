import { CALCULATION_TYPES, COUNTRIES } from 'constants/enums';

import Calculator from './calculator';

describe('Calculator', () => {
  describe('.calculate', () => {
    it('handles empty inputs, country and tax year', () => {
      const calculator = Calculator.calculate(
        CALCULATION_TYPES.PAYE
      );

      expect(calculator).toEqual({
        'steps': [
          'Calculate std rate cut off for period: (35300 / 52) * 1 = 678.85',
          'Apply the standard rate of 20% to the income in the rate band: 0 * 20% = 0.00',
          'Pay is less than std rate cut off for period so not applying 40% rate: 0',
          'Gross tax: 0.00 + 0 = 0.00',
          'Tax Credit for period: 3300 / 52 * 1 = 63.46',
          'Gross tax less tax credits results in negative, 0 tax payable: 0',
          'Tax payable: 0',
        ],
        'type': 'PAYE',
        'value': 0,
      });
    });

    describe('IE', () => {
      it('returns PAYE calculation result', () => {
        const calculator = Calculator.calculate(
          CALCULATION_TYPES.PAYE,
          {
            inputs: {
              pay: '1000.00',
              period: '1',
              frequency: '1'
            },
            country: COUNTRIES.IE,
            taxYear: '2017'
          }
        );

        expect(calculator).toEqual({
          'steps': ['Calculate std rate cut off for period: (33800 / 52) * 1 = 650.00', 'Apply the standard rate of 20% to the income in the rate band: 650.00 * 20% = 130.00', 'Apply the higher rate of 40% on the balance: (1000 - 650.00) * 40% = 140.00', 'Gross tax: 130.00 + 140.00 = 270.00', 'Tax Credit for period: 3300 / 52 * 1 = 63.46', 'Gross tax less tax credits: 270.00 - 63.46 = 206.54', 'Tax payable: 206.54'],
          'type': 'PAYE',
          'value': '206.54'
        });
      });

      it('returns USC calculator', () => {
        const calculator = Calculator.calculate(
          CALCULATION_TYPES.USC,
          {
            inputs: {
              pay: '1000.00',
              period: '1',
              frequency: '1'
            },
            country: COUNTRIES.IE,
            taxYear: '2017'
          }
        );

        expect(calculator).toEqual({
          'steps': ['Calculate std rate cut off for period: (33800 / 52) * 1 = 650.00', 'Apply the standard rate of 20% to the income in the rate band: 650.00 * 20% = 130.00', 'Apply the higher rate of 40% on the balance: (1000 - 650.00) * 40% = 140.00', 'Gross tax: 130.00 + 140.00 = 270.00', 'Tax Credit for period: 3300 / 52 * 1 = 63.46', 'Gross tax less tax credits: 270.00 - 63.46 = 206.54', 'Tax payable: 206.54'],
          'type': 'PAYE',
          'value': '206.54'
        });
      });

      it('returns PRSI calculator', () => {
        const calculator = Calculator.calculate(
          CALCULATION_TYPES.PRSI,
          {
            inputs: {
              pay: '1000.00',
              period: '1',
              frequency: '1'
            },
            country: COUNTRIES.IE,
            taxYear: '2017'
          }
        );

        expect(calculator).toEqual({
          'steps': ['Calculate std rate cut off for period: (33800 / 52) * 1 = 650.00', 'Apply the standard rate of 20% to the income in the rate band: 650.00 * 20% = 130.00', 'Apply the higher rate of 40% on the balance: (1000 - 650.00) * 40% = 140.00', 'Gross tax: 130.00 + 140.00 = 270.00', 'Tax Credit for period: 3300 / 52 * 1 = 63.46', 'Gross tax less tax credits: 270.00 - 63.46 = 206.54', 'Tax payable: 206.54'],
          'type': 'PAYE',
          'value': '206.54'
        });
      });

      it('returns null for incorrect calculation type', () => {
        const calculator = Calculator.calculate(
          CALCULATION_TYPES.UNKNOWN,
          {
            inputs: {
              pay: '1000.00',
              period: '1',
              frequency: '1'
            },
            country: COUNTRIES.IE,
            taxYear: '2017'
          }
        );

        expect(calculator).toEqual({});
      });
    });

    describe('UK', () => {
      it('returns PAYE calculation result', () => {
        const calculator = Calculator.calculate(
          CALCULATION_TYPES.PAYE,
          {
            inputs: {
              pay: '1000.00',
              period: '1',
              frequency: '1'
            },
            country: COUNTRIES.UK,
            taxYear: '2017'
          }
        );

        expect(calculator).toEqual({
          'steps': ['Calculate std rate cut off for period: (33800 / 52) * 1 = 650.00', 'Apply the standard rate of 20% to the income in the rate band: 650.00 * 20% = 130.00', 'Apply the higher rate of 40% on the balance: (1000 - 650.00) * 40% = 140.00', 'Gross tax: 130.00 + 140.00 = 270.00', 'Tax Credit for period: 3300 / 52 * 1 = 63.46', 'Gross tax less tax credits: 270.00 - 63.46 = 206.54', 'Tax payable: 206.54'],
          'type': 'PAYE',
          'value': '206.54'
        });
      });

      it('returns USC calculator', () => {
        const calculator = Calculator.calculate(
          CALCULATION_TYPES.USC,
          {
            inputs: {
              pay: '1000.00',
              period: '1',
              frequency: '1'
            },
            country: COUNTRIES.UK,
            taxYear: '2017'
          }
        );

        expect(calculator).toEqual({
          'steps': ['Calculate std rate cut off for period: (33800 / 52) * 1 = 650.00', 'Apply the standard rate of 20% to the income in the rate band: 650.00 * 20% = 130.00', 'Apply the higher rate of 40% on the balance: (1000 - 650.00) * 40% = 140.00', 'Gross tax: 130.00 + 140.00 = 270.00', 'Tax Credit for period: 3300 / 52 * 1 = 63.46', 'Gross tax less tax credits: 270.00 - 63.46 = 206.54', 'Tax payable: 206.54'],
          'type': 'PAYE',
          'value': '206.54'
        });
      });

      it('returns PRSI calculator', () => {
        const calculator = Calculator.calculate(
          CALCULATION_TYPES.PRSI,
          {
            inputs: {
              pay: '1000.00',
              period: '1',
              frequency: '1'
            },
            country: COUNTRIES.UK,
            taxYear: '2017'
          }
        );

        expect(calculator).toEqual({
          'steps': ['Calculate std rate cut off for period: (33800 / 52) * 1 = 650.00', 'Apply the standard rate of 20% to the income in the rate band: 650.00 * 20% = 130.00', 'Apply the higher rate of 40% on the balance: (1000 - 650.00) * 40% = 140.00', 'Gross tax: 130.00 + 140.00 = 270.00', 'Tax Credit for period: 3300 / 52 * 1 = 63.46', 'Gross tax less tax credits: 270.00 - 63.46 = 206.54', 'Tax payable: 206.54'],
          'type': 'PAYE',
          'value': '206.54'
        });
      });

      it('returns null for incorrect calculation type', () => {
        const calculator = Calculator.calculate(
          CALCULATION_TYPES.UNKNOWN,
          {
            inputs: {
              pay: '1000.00',
              period: '1',
              frequency: '1'
            },
            country: COUNTRIES.UK,
            taxYear: '2017'
          }
        );

        expect(calculator).toEqual({});
      });
    });
  });
});