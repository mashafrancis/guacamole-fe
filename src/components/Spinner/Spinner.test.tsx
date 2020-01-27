// import react libraries
import * as React from 'react';

// import third-party libraries
import { shallow } from 'enzyme';

// import components
import Spinner from './';

describe('<Spinner />', () => {
  it('should be mounted properly', () => {
    const wrapper = shallow(<Spinner />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.showbox').length).toEqual(1);
  });
});
