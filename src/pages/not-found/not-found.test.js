import React from 'react';
import { shallow } from 'test/enzyme-adapter';

import NotFoundPage from 'pages/not-found';


describe('NotFoundPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NotFoundPage />);
  });

  it('renders the heading', () => {
    const headings = wrapper.find('h1')
    expect(headings.length).toEqual(1);

    const heading = headings.at(0);
    expect(heading.props().title).toEqual('Not Found');
  });
});