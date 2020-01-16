// react libraries
import * as React from 'react';

// third party libraries
import { shallow } from 'enzyme';

// components
import Routes from './index';

describe.skip('The Route components', () => {
  const wrapper = shallow(<Routes />);

  it('should register a route for the / page', () => {
    expect(wrapper.find({ path: '/' }).length).toBe(1);
  });

  it('should register a route for register page', () => {
    expect(wrapper.find({ path: '/register' }).length).toBe(1);
  });

  it('should register a route for register with email', () => {
    expect(wrapper.find({ path: '/register/email' }).length).toBe(1);
  });

  it('should register a route for login', () => {
    expect(wrapper.find({ path: '/login' }).length).toBe(1);
  });

  it('should register a route for login with email', () => {
    expect(wrapper.find({ path: '/login/email' }).length).toBe(1);
  });

  it('should register a route for 404', () => {
    expect(wrapper.find({ path: '/404' }).length).toBe(1);
  });
});
