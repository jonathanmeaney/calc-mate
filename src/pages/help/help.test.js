import React from 'react';
import { shallow } from 'enzyme';

import { FaInfoCircle } from 'react-icons/fa';

import HelpPage from 'pages/help';


describe('HelpPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<HelpPage />);
  });

  it('renders the heading', () => {
    const headings = wrapper.find('h1')
    expect(headings.length).toEqual(1);

    const heading = headings.at(0);
    expect(heading.props().children).toEqual('Help');
  });

  it('renders the description', () => {
    const paragraphs = wrapper.find('p')
    expect(paragraphs.length).toEqual(3);

    const paragraph1 = paragraphs.at(0);
    expect(paragraph1.text()).toEqual('Calc Mate is an application that lets you perform different tax calculations for the UK and Ireland.');

    const paragraph2 = paragraphs.at(1);
    expect(paragraph2.text()).toEqual('Simply pick the country and calculation type you want to do. Then fill in the form with the details and click calculate. The result will be displayed along with an <FaInfoCircle /> and when you click on it you will see the different steps of the calculation and how the final result was achieved.');

    const paragraph3 = paragraphs.at(2);
    expect(paragraph3.text()).toEqual('Each calculation you perform is stored in the history. You will be able to see all the calculations you have done recently and their results.');
  });
});