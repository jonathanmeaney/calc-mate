import Paye2017 from './tax-years/paye-2017';
import Paye2018 from './tax-years/paye-2018';
import Paye2019 from './tax-years/paye-2019';
import Paye2020 from './tax-years/paye-2020';
import Paye2021 from './tax-years/paye-2021';
import Paye2022 from './tax-years/paye-2022';

class Paye {
  static getCalculatorForTaxYear(inputs, taxYear){
    let calculator = null;
    switch(taxYear){
      case '2017':
        calculator = new Paye2017(inputs);
        break;
      case '2018':
        calculator = new Paye2018(inputs);
        break;
      case '2019':
        calculator = new Paye2019(inputs);
        break;
      case '2020':
        calculator = new Paye2020(inputs);
        break;
      case '2021':
        calculator = new Paye2021(inputs);
        break;
      case '2022':
        calculator = new Paye2022(inputs);
        break;
      default:
    }

    return calculator;
  }
}

export default Paye;
