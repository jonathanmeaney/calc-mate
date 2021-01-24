import React from 'react';
import { shallow } from 'enzyme';

import CalculationResults from './calculation-results';

describe('CalculationResults', () => {
  let wrapper;

  const results = {
    type: 'PAYE',
    value: '200.00',
    steps: ["Divide value by 10: 100 / 10 = 10", "Multiply value by 20: 10 * 20 = 200"]
  }

  describe('and show is true', () => {
    beforeEach(() => {
      wrapper = shallow(<CalculationResults results={results} />);
    });

    it('displays the results value', () => {
      const h2 = wrapper.find('h2');

      expect(h2.text()).toContain('PAYE: 200.00');
    });

    it('toggles the steps', () => {
      let steps = wrapper.find('CalculationSteps');
      expect(steps.props().show).toEqual(false);

      const toggle = wrapper.find('FaInfoCircle');
      toggle.simulate('click');

      steps = wrapper.find('CalculationSteps');
      expect(steps.props().show).toEqual(true);
    });
  });
});