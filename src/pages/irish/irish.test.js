import React from 'react';
import { shallow } from 'enzyme';

import IrishPage from 'pages/irish';


describe('IrishPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<IrishPage />);
  });

  it('renders the heading', () => {
    const headings = wrapper.find('h2')
    expect(headings.length).toEqual(1);

    const heading = headings.at(0);
    expect(heading.props().children).toEqual('Irish');
  });
});