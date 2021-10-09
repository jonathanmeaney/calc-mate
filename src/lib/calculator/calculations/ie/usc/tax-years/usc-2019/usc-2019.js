import Usc2018 from '../usc-2018';

class Usc2019 extends Usc2018 {
  constructor(inputs = {}){
    super(inputs);
    this.taxYear = '2019';
    this.rateBands.middle.threshold = parseFloat(7862);
    this.rateBands.upper.percentage = parseFloat(4.5);
    this.rateBands.upper.threshold = parseFloat(50170);
  }
}

export default Usc2019;
