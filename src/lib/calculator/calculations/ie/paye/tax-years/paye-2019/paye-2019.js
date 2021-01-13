import Paye2018 from '../paye-2018';

class Paye2019 extends Paye2018 {
  constructor(inputs = {}){
    super(inputs);
    this.taxYear = '2019';
    this.yearlyStdRateCutOff = parseFloat(35300);
  }
}

export default Paye2019;
