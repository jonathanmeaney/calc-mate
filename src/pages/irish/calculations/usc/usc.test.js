import React from 'react';
import { mount } from 'enzyme';

import reduxRender from 'utils/redux-render';
import Paye from './paye';

describe('Paye', () => {
  let wrapper;

  beforeEach(() => {
    const component = reduxRender(<Paye />, {
      history: [{
        template_name: 'template 1',
        id: 1
      }]
    });
    wrapper = mount(component);
  });

  describe('updateCalculationValue()', () => {
    it('updates pay value', () => {
      let input = wrapper.find("input[name='pay']");
      input.simulate('change', { target: { name: 'pay', value: '1000.0' } });

      input = wrapper.find("input[name='pay']");
      expect(input.props().value).toEqual('1000.0');
    });

    describe('frequency', () => {
      it('updates frequency', () => {
        let input = wrapper.find("select[name='frequency']");
        input.simulate('change', { target: { name: 'frequency', value: '4' } });

        input = wrapper.find("select[name='frequency']");
        expect(input.props().value).toEqual('4');
      });

      it('updates period too', () => {
        let input = wrapper.find("select[name='frequency']");
        let period = wrapper.find("select[name='period']");

        // setup period
        period.simulate('change', { target: { name: 'period', value: '45' } });
        period = wrapper.find("select[name='period']");
        expect(period.props().value).toEqual('45');

        // when changing frequency period is set to 1
        input.simulate('change', { target: { name: 'frequency', value: '4' } });
        input = wrapper.find("select[name='frequency']");
        expect(input.props().value).toEqual('4');
        period = wrapper.find("select[name='period']");
        expect(period.props().value).toEqual('1')
      });
    });

    describe('period', () => {
      describe('period options', () => {
        it('has defaults to weekly for blank', () => {
          // setup
          let frequencyInput = wrapper.find("select[name='frequency']");
          frequencyInput.simulate('change', { target: { name: 'frequency', value: '' } });

          // get period select
          let periodSelect = wrapper.find("select[name='period']");
          expect(periodSelect.props().children.length).toEqual(52);
        });

        it('has 52 options for weekly', () => {
          // setup
          let frequencyInput = wrapper.find("select[name='frequency']");
          frequencyInput.simulate('change', { target: { name: 'frequency', value: '1' } });

          // get period select
          let periodSelect = wrapper.find("select[name='period']");
          expect(periodSelect.props().children.length).toEqual(52);
        });

        it('has 12 options for monthly', () => {
          // setup
          let frequencyInput = wrapper.find("select[name='frequency']");
          frequencyInput.simulate('change', { target: { name: 'frequency', value: '2' } });

          // get period select
          let periodSelect = wrapper.find("select[name='period']");
          expect(periodSelect.props().children.length).toEqual(12);
        });

        it('has 26 options for two-weekly', () => {
          // setup
          let frequencyInput = wrapper.find("select[name='frequency']");
          frequencyInput.simulate('change', { target: { name: 'frequency', value: '3' } });

          // get period select
          let periodSelect = wrapper.find("select[name='period']");
          expect(periodSelect.props().children.length).toEqual(26);
        });

        it('has 13 options for four-weekly', () => {
          // setup
          let frequencyInput = wrapper.find("select[name='frequency']");
          frequencyInput.simulate('change', { target: { name: 'frequency', value: '4' } });

          // get period select
          let periodSelect = wrapper.find("select[name='period']");
          expect(periodSelect.props().children.length).toEqual(13);
        });
      });

      it('updates period', () => {
        let input = wrapper.find("select[name='period']");
        input.simulate('change', { target: { name: 'period', value: '52' } });

        input = wrapper.find("select[name='period']");
        expect(input.props().value).toEqual('52');
      });
    });

    it('updates taxStatus', () => {
      let input = wrapper.find("select[name='taxStatus']");
      input.simulate('change', { target: { name: 'taxStatus', value: '2' } });

      input = wrapper.find("select[name='taxStatus']");
      expect(input.props().value).toEqual('2');
    });
  });

  describe('calculate()', () => {
    let submit;

    beforeEach(() => {
      // console.log(wrapper.debug());
      wrapper.find("input[name='pay']").simulate('change', { target: { name: 'pay', value: '1000.0' } });
      wrapper.update();

      submit = wrapper.find("button[type='submit']");
    })

    it('calculates the PAYE value', () => {
      submit.simulate('click');

      const results = wrapper.find('CalculationResults');
      expect(results.props().results.value).toEqual('200.77');
    });

    it('dispatches the history', () => {

    });
  });
});