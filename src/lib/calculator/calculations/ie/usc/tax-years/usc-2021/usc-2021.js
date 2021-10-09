import Usc2020 from '../usc-2020';

class Usc2021 extends Usc2020 {
  constructor(inputs = {}){
    super(inputs);
    this.taxYear = '2021';
    this.rateBands.middle.threshold = parseFloat(8675);
    this.rateBands.upper.threshold = parseFloat(49357);
  }
}

export default Usc2021;
