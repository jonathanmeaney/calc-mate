import React from 'react';
import { mount } from 'enzyme';

import reduxRender from 'utils/redux-render';
import CalculationHistory from './calculation-history';

describe('CalculationHistory', () => {
  let wrapper;

  describe('when there are inputs', () => {
    beforeEach(() => {
      const component = reduxRender(<CalculationHistory />, {
        calculations: [{
          id: '1',
          time: 'January 24, 2021 18:49:25',
          type: 'PAYE',
          value: '200.00',
          inputs: {
            pay: '1000.00',
            frequency: 'weekly'
          },
          country: 'IE',

        },{
          id: '2',
          time: 'January 24, 2021 18:49:25',
          type: 'PAYE',
          value: '200.00',
          inputs: {
            pay: '1000.00',
            frequency: 'weekly'
          },
          country: 'UK',

        }]
      });
      wrapper = mount(component);
      // console.log(wrapper.debug());
    });

    it('renders the list of historical calculations', () => {
      const historyCards = wrapper.find('.card-list').find('div.history-card');

      // Ireland calc
      const irishCalc = historyCards.at(0);

      // time
      let time = irishCalc.find('.card-header').text();
      expect(time).toEqual('January 24, 2021 18:49:25');

      // title
      let title = irishCalc.find('div.card-title.h5').at(0).text();
      expect(title).toEqual('🇮🇪 PAYE Calculation');

      // inputs
      let inputsTableText = irishCalc.find('table.inputs-table').text();
      expect(inputsTableText).toEqual('frequency:weeklypay:1000.00');

      // value
      let value = irishCalc.find('div.card-title.h5').at(1).text();
      expect(value).toEqual('PAYE: 200.00');

      // Uk calc
      const ukCalc = historyCards.at(1);

      // time
      time = ukCalc.find('.card-header').text();
      expect(time).toEqual('January 24, 2021 18:49:25');

      // title
      title = ukCalc.find('div.card-title.h5').at(0).text();
      expect(title).toEqual('🇬🇧 PAYE Calculation');

      // inputs
      inputsTableText = ukCalc.find('table.inputs-table').text();
      expect(inputsTableText).toEqual('frequency:weeklypay:1000.00');

      // value
      value = ukCalc.find('div.card-title.h5').at(1).text();
      expect(value).toEqual('PAYE: 200.00');
    });
  });

  describe('when there are no inputs', () => {
    beforeEach(() => {
      const component = reduxRender(<CalculationHistory />, {
        calculations: [{
          id: '1',
          time: 'January 24, 2021 18:49:25',
          type: 'PAYE',
          value: '200.00',
          country: 'IE',

        },{
          id: '2',
          time: 'January 24, 2021 18:49:25',
          type: 'PAYE',
          value: '200.00',
          country: 'UK',

        }]
      });
      wrapper = mount(component);
      // console.log(wrapper.debug());
    });

    it('renders the list of historical calculations', () => {
      const historyCards = wrapper.find('.card-list').find('div.history-card');

      // Ireland calc
      const irishCalc = historyCards.at(0);

      // time
      let time = irishCalc.find('.card-header').text();
      expect(time).toEqual('January 24, 2021 18:49:25');

      // title
      let title = irishCalc.find('div.card-title.h5').at(0).text();
      expect(title).toEqual('🇮🇪 PAYE Calculation');

      // inputs
      let inputsTableText = irishCalc.find('table.inputs-table');
      expect(inputsTableText).toEqual({});

      // value
      let value = irishCalc.find('div.card-title.h5').at(1).text();
      expect(value).toEqual('PAYE: 200.00');

      // Uk calc
      const ukCalc = historyCards.at(1);

      // time
      time = ukCalc.find('.card-header').text();
      expect(time).toEqual('January 24, 2021 18:49:25');

      // title
      title = ukCalc.find('div.card-title.h5').at(0).text();
      expect(title).toEqual('🇬🇧 PAYE Calculation');

      // inputs
      inputsTableText = ukCalc.find('table.inputs-table');
      expect(inputsTableText).toEqual({});

      // value
      value = ukCalc.find('div.card-title.h5').at(1).text();
      expect(value).toEqual('PAYE: 200.00');
    });
  });

  describe('when there are inputs but they are null', () => {
    beforeEach(() => {
      const component = reduxRender(<CalculationHistory />, {
        calculations: [{
          id: '1',
          time: 'January 24, 2021 18:49:25',
          type: 'PAYE',
          value: '200.00',
          inputs: {
            pay: null,
            frequency: null
          },
          country: 'IE',

        },{
          id: '2',
          time: 'January 24, 2021 18:49:25',
          type: 'PAYE',
          value: '200.00',
          inputs: {
            pay: null,
            frequency: null
          },
          country: 'UK',

        }]
      });
      wrapper = mount(component);
      // console.log(wrapper.debug());
    });

    it('renders the list of historical calculations', () => {
      const historyCards = wrapper.find('.card-list').find('div.history-card');

      // Ireland calc
      const irishCalc = historyCards.at(0);

      // time
      let time = irishCalc.find('.card-header').text();
      expect(time).toEqual('January 24, 2021 18:49:25');

      // title
      let title = irishCalc.find('div.card-title.h5').at(0).text();
      expect(title).toEqual('🇮🇪 PAYE Calculation');

      // inputs
      let inputsTableText = irishCalc.find('table.inputs-table').text();
      expect(inputsTableText).toEqual('frequency:pay:');

      // value
      let value = irishCalc.find('div.card-title.h5').at(1).text();
      expect(value).toEqual('PAYE: 200.00');

      // Uk calc
      const ukCalc = historyCards.at(1);

      // time
      time = ukCalc.find('.card-header').text();
      expect(time).toEqual('January 24, 2021 18:49:25');

      // title
      title = ukCalc.find('div.card-title.h5').at(0).text();
      expect(title).toEqual('🇬🇧 PAYE Calculation');

      // inputs
      inputsTableText = ukCalc.find('table.inputs-table').text();
      expect(inputsTableText).toEqual('frequency:pay:');

      // value
      value = ukCalc.find('div.card-title.h5').at(1).text();
      expect(value).toEqual('PAYE: 200.00');
    });
  });
});