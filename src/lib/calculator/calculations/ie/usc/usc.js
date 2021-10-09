import Usc2017 from './tax-years/usc-2017';
import Usc2018 from './tax-years/usc-2018';
import Usc2019 from './tax-years/usc-2019';
import Usc2020 from './tax-years/usc-2020';
import Usc2021 from './tax-years/usc-2021';

class Usc {
  static getCalculatorForTaxYear(inputs, taxYear){
    let calculator = null;
    switch(taxYear){
      case '2017':
        calculator = new Usc2017(inputs);
        break;
      case '2018':
        calculator = new Usc2018(inputs);
        break;
      case '2019':
        calculator = new Usc2019(inputs);
        break;
      case '2020':
        calculator = new Usc2020(inputs);
        break;
      case '2021':
        calculator = new Usc2021(inputs);
        break;
      default:
    }

    return calculator;
  }
}

export default Usc;
