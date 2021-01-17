import React from 'react';
import { shallow } from 'enzyme';

import HomePage from 'pages/home';


describe('HomePage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<HomePage />);
  });

  it('renders the heading', () => {
    const headings = wrapper.find('h1')
    expect(headings.length).toEqual(1);

    const heading = headings.at(0);
    expect(heading.props().children).toEqual('Welcome to Calc Mate');
  });

  it('renders the description', () => {
    const paragraphs = wrapper.find('p')
    expect(paragraphs.length).toEqual(2);

    const paragraph = paragraphs.at(0);
    expect(paragraph.props().children).toEqual("Calc Mate lets you perform different tax calculations for the UK and Ireland. Just pick your country and calculation type, fill in the form and click on ", <b>calculate</b>, ". You'll soon get the result and a breakdown of how the result was reached!");
  });
});