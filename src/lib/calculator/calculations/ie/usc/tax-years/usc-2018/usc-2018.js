import Usc2017 from '../usc-2017';

class Usc2018 extends Usc2017 {
  constructor(inputs = {}){
    super(inputs);
    this.taxYear = '2018';
    this.rateBands.middle.percentage = parseFloat(2);
    this.rateBands.middle.threshold = parseFloat(7360);
    this.rateBands.upper.threshold = parseFloat(4.75);
    this.rateBands.upper.threshold = parseFloat(50672);
  }
}

export default Usc2018;
