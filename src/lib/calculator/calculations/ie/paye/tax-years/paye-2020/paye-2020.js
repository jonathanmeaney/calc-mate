import Paye2019 from '../paye-2019';

class Paye2020 extends Paye2019 {
  constructor(inputs = {}){
    super(inputs);
    this.taxYear = '2020';
  }
}

export default Paye2020;
