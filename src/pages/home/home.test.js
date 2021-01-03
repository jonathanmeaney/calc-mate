import React from 'react';
import { shallow } from 'test/enzyme-adapter';

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
    expect(heading.props().title).toEqual('Welcome');
  });
});