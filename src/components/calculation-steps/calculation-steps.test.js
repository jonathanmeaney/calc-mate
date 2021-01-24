import React from 'react';
import { shallow } from 'enzyme';

import CalculationSteps from './calculation-steps';

describe('CalculationSteps', () => {
  let wrapper;

  const steps = ["Divide value by 10: 100 / 10 = 10", "Multiply value by 20: 10 * 20 = 200"];

  describe('and show is true', () => {
    beforeEach(() => {
      wrapper = shallow(<CalculationSteps steps={steps} show={true} />);
    });

    it('renders the list of steps', () => {
      const steps = wrapper.find('.step');

      expect(steps.length).toEqual(2);

      const stepOne = steps.at(0);
      const badge = stepOne.find('Badge');
      expect(badge.length).toEqual(1);
      expect(badge.props().children).toEqual(1);

      const cardBody = stepOne.find("CardBody").at(1);
      expect(cardBody.props().children).toEqual(' 100 / 10 = 10');
    });
  });
});