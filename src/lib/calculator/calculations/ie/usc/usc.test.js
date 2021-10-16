import Usc2017 from './tax-years/usc-2017';
import Usc2018 from './tax-years/usc-2018';
import Usc2019 from './tax-years/usc-2019';
import Usc2020 from './tax-years/usc-2020';
import Usc2021 from './tax-years/usc-2021';
import Usc2022 from './tax-years/usc-2022';
import Usc from './usc';

describe('Usc', () => {
  describe('.getCalculatorForTaxYear', () => {

    it('returns null for incorrect tax year', () => {
      expect(Usc.getCalculatorForTaxYear({}, '1900')).toEqual(null);
    });

    it('returns Usc calculator for 2017', () => {
      expect(Usc.getCalculatorForTaxYear({}, '2017')).toEqual(new Usc2017({}));
    });

    it('returns Usc calculator for 2018', () => {
      expect(Usc.getCalculatorForTaxYear({}, '2018')).toEqual(new Usc2018({}));
    });

    it('returns Usc calculator for 2019', () => {
      expect(Usc.getCalculatorForTaxYear({}, '2019')).toEqual(new Usc2019({}));
    });

    it('returns Usc calculator for 2020', () => {
      expect(Usc.getCalculatorForTaxYear({}, '2020')).toEqual(new Usc2020({}));
    });

    it('returns Usc calculator for 2021', () => {
      expect(Usc.getCalculatorForTaxYear({}, '2021')).toEqual(new Usc2021({}));
    });

    it('returns Usc calculator for 2022', () => {
      expect(Usc.getCalculatorForTaxYear({}, '2022')).toEqual(new Usc2022({}));
    });
  });
});
