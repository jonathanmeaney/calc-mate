import Usc2019 from '../usc-2019';

class Usc2020 extends Usc2019 {
  constructor(inputs = {}){
    super(inputs);
    this.taxYear = '2020';
    this.rateBands.middle.threshold = parseFloat(8472);
    this.rateBands.upper.threshold = parseFloat(49560);

  }
}

export default Usc2020;
