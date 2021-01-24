import React from 'react';

import { shallow } from 'enzyme';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Paye from './calculations/paye';
import IrishPage from 'pages/irish';

describe('IrishPage', () => {
  let wrapper;

  // const setState = jest.fn();
  // const useStateSpy = jest.spyOn(React, 'useState')
  // useStateSpy.mockImplementation((init) => [init, setState]);

  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  beforeEach(() => {
    wrapper = shallow(<IrishPage />);
  });

  it('renders the heading', () => {
    const headings = wrapper.find('h2')
    expect(headings.length).toEqual(1);

    const heading = headings.at(0);
    expect(heading.props().children).toEqual('Irish');
  });

  it('renders the tabs', () => {
    const tabs = wrapper.find(Tab)
    expect(tabs.length).toEqual(3);

    expect(tabs.at(0).props().title).toEqual('PAYE');
    expect(tabs.at(1).props().title).toEqual('USC');
    expect(tabs.at(2).props().title).toEqual('PRSI');
  });

  // describe('changing tabs', () => {
  //   it('calls setKey', () => {
  //     console.log(wrapper.debug());
  //     const tabsContainer = wrapper.find(Tabs)
  //     const tabs = wrapper.find(Tab)
  //     const uscTab = tabs.at(1);
  //     tabs.at(1).simulate('click');
  //     tabsContainer.props().onSelect();
  //     expect(setState).toHaveBeenCalledWith(1);
  //   });
  // });

  describe('PAYE tab', () => {
    it('renders the Paye component', () => {
      const tabs = wrapper.find(Tab)
      const payeTab = tabs.at(0);

      expect(payeTab.props().children).toEqual(<Paye labelCol={4} inputCol={8} />)
    });
  });

  describe('USC tab', () => {
    it('renders the Usc component', () => {
      const tabs = wrapper.find(Tab)
      const uscTab = tabs.at(1);

      expect(uscTab.props().children).toEqual(<h3>Coming Soon</h3>)
    });
  });

  describe('PRSI tab', () => {
    it('renders the Prsi component', () => {
      const tabs = wrapper.find(Tab)
      const prsiTab = tabs.at(1);

      expect(prsiTab.props().children).toEqual(<h3>Coming Soon</h3>)
    });
  });
});