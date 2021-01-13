import { CALCULATION_TYPES, COUNTRIES } from 'constants/enums';

import IEPaye from './calculations/ie/paye';

class Calculator {
  static calculate(type, options = {}) {
    const inputs = options.inputs || {};
    const country = options.country || COUNTRIES.IE;
    const taxYear = options.taxYear || String(new Date().getFullYear());

    let calculator;
    if(country === COUNTRIES.IE){
      switch(type){
        case CALCULATION_TYPES.PAYE:
          calculator = IEPaye.getCalculatorForTaxYear(inputs, taxYear);
          break;
        case CALCULATION_TYPES.USC:
          calculator = new IEPaye(inputs, taxYear);
          break;
        case CALCULATION_TYPES.PRSI:
          calculator = new IEPaye(inputs, taxYear);
          break;
        default:
      }
    }

    if(country === COUNTRIES.UK){
      switch(type){
        case CALCULATION_TYPES.PAYE:
          calculator = new IEPaye(inputs, taxYear);
          break;
        case CALCULATION_TYPES.USC:
          calculator = new IEPaye(inputs, taxYear);
          break;
        case CALCULATION_TYPES.PRSI:
          calculator = new IEPaye(inputs, taxYear);
          break;
        default:
      }
    }

    return calculator.calculate();
  }
}

export default Calculator;
