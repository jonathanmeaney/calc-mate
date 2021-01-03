import React from 'react';
import { shallow } from 'test/enzyme-adapter';

import Irish from 'pages/irish';


describe('Irish', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Irish />);
  });

  it('renders the heading', () => {
    const headings = wrapper.find('h1')
    expect(headings.length).toEqual(1);

    const heading = headings.at(0);
    expect(heading.props().title).toEqual('Not Found');
  });
});