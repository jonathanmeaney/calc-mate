import Usc2021 from '../usc-2021';

class Usc2022 extends Usc2021 {
  constructor(inputs = {}){
    super(inputs);
    this.taxYear = '2022';
    this.rateBands.middle.threshold = parseFloat(9283);
    this.rateBands.upper.threshold = parseFloat(48749);
  }
}

export default Usc2022;
