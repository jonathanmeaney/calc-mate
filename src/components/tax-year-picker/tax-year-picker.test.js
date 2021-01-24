import React from 'react';
import { shallow } from 'enzyme';

import { COUNTRIES } from 'constants/enums';
import TaxYearPicker from './tax-year-picker';

describe('TaxYearPicker', () => {
  let wrapper;

  const onChange = jest.fn();

  describe('Ireland', () => {
    beforeEach(() => {
      wrapper = shallow(<TaxYearPicker country={COUNTRIES.IE} onChange={onChange} />);
    });

    it('renders the list of tax year buttons', () => {
      const buttons = wrapper.find('ToggleButton');

      expect(buttons.length).toEqual(5);
    });

    it('calls onChange when button clicked', () => {
      const buttons = wrapper.find('ToggleButton');
      const button = buttons.at(1);
      button.simulate('change', { currentTarget: { value: '2020' } } );

      expect(onChange).toHaveBeenCalledWith({'currentTarget': {'value': '2020'}});
    });
  });

  describe('UK', () => {
    beforeEach(() => {
      wrapper = shallow(<TaxYearPicker country={COUNTRIES.UK} onChange={onChange} />);
    });

    it('renders the list of tax year buttons', () => {
      const buttons = wrapper.find('ToggleButton');

      expect(buttons.length).toEqual(5);
    });

    it('calls onChange when button clicked', () => {
      const buttons = wrapper.find('ToggleButton');
      const button = buttons.at(1);
      button.simulate('change', { currentTarget: { value: '2020' } } );

      expect(onChange).toHaveBeenCalledWith({'currentTarget': {'value': '2020'}});
    });
  });

});