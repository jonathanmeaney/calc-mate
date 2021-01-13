import Paye2017 from '../paye-2017';

class Paye2018 extends Paye2017 {
  constructor(inputs = {}){
    super(inputs);
    this.taxYear = '2018';
    this.yearlyStdRateCutOff = parseFloat(34550);
  }
}

export default Paye2018;
