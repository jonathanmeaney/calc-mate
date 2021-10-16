import Paye2021 from '../paye-2021';

class Paye2022 extends Paye2021 {
  constructor(inputs = {}){
    super(inputs);
    this.taxYear = '2022';
    this.yearlyStdRateCutOff = parseFloat(36800);
    this.yearlyTaxCredits = parseFloat(3400);
  }
}

export default Paye2022;
