import Paye2017 from './tax-years/paye-2017';
import Paye2018 from './tax-years/paye-2018';
import Paye2019 from './tax-years/paye-2019';
import Paye2020 from './tax-years/paye-2020';
import Paye2021 from './tax-years/paye-2021';
import Paye2022 from './tax-years/paye-2022';
import Paye from './paye';

describe('Paye', () => {
  describe('.getCalculatorForTaxYear', () => {

    it('returns null for incorrect tax year', () => {
      expect(Paye.getCalculatorForTaxYear({}, '1900')).toEqual(null);
    });

    it('returns Paye calculator for 2017', () => {
      expect(Paye.getCalculatorForTaxYear({}, '2017')).toEqual(new Paye2017({}));
    });

    it('returns Paye calculator for 2018', () => {
      expect(Paye.getCalculatorForTaxYear({}, '2018')).toEqual(new Paye2018({}));
    });

    it('returns Paye calculator for 2019', () => {
      expect(Paye.getCalculatorForTaxYear({}, '2019')).toEqual(new Paye2019({}));
    });

    it('returns Paye calculator for 2020', () => {
      expect(Paye.getCalculatorForTaxYear({}, '2020')).toEqual(new Paye2020({}));
    });

    it('returns Paye calculator for 2021', () => {
      expect(Paye.getCalculatorForTaxYear({}, '2021')).toEqual(new Paye2021({}));
    });

    it('returns Paye calculator for 2022', () => {
      expect(Paye.getCalculatorForTaxYear({}, '2022')).toEqual(new Paye2022({}));
    });
  });
});
