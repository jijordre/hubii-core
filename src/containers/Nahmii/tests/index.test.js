import React from 'react';
import { shallow } from 'enzyme';

import { Nahmii } from '../index';

describe('<Nahmii />', () => {
  let props;
  beforeEach(() => {
    props = {
      history: { location: { pathname: 'some-path' } },
      match: { url: 'some-url' },
      dispatch: () => {},
    };
  });
  it('should render correctly', () => {
    const wrapper = shallow(<Nahmii {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
