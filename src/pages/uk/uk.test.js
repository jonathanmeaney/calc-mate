import React from 'react';
import { shallow } from 'enzyme';

import Uk from 'pages/uk';


describe('Uk', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Uk />);
  });

  it('renders the heading', () => {
    const headings = wrapper.find('h1')
    expect(headings.length).toEqual(1);

    const heading = headings.at(0);
    expect(heading.props().title).toEqual('Not Found');
  });
});