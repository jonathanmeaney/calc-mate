import Paye2020 from '../paye-2020';

class Paye2021 extends Paye2020 {
  constructor(inputs = {}){
    super(inputs);
    this.taxYear = '2021';
  }
}

export default Paye2021;
