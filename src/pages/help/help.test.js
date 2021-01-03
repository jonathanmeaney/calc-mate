import React from 'react';
import { shallow } from 'test/enzyme-adapter';

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
    expect(heading.props().title).toEqual('Help');
  });

  it('renders the description', () => {
    const paragraphs = wrapper.find('p')
    expect(paragraphs.length).toEqual(2);

    const paragraph1 = paragraphs.at(0);
    expect(paragraph1.text()).toEqual('Payroll Buddy is the perfect companion for Payroll. It automates the repetitive tasks that developers and QA would be all too familar with.');

    const paragraph2 = paragraphs.at(1);
    expect(paragraph2.text()).toEqual('Payroll Buddy supports UK and Irish businesses independently and gives you the option to export/import data so you can easily backup your data or share it with other Payroll Buddy users.');
  });
});