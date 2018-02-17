import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Signup} from './Signup';

Enzyme.configure({ adapter: new Adapter() });


if (Meteor.isClient) {
  describe('Signup', function () {
    it('should show error messages', function() {
      const error = 'This is not working';
      const wrapper = mount(<Signup createUser={() => {}}/>);

      wrapper.setState({error});
      const errorText = wrapper.find('p').text();
      expect(errorText).toBe(error);

      wrapper.setState({error: ''});
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call createUser with the form data', function() {
      const email = '1@test.com';
      const password = '1234';
      const spy = expect.createSpy();

      const wrapper = mount(<Signup createUser={spy}/>);
      wrapper.find('input[name="email"]').instance().value = email;
      wrapper.find('input[name="password"]').instance().value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email, password });
    });

    it('should set error if short password', function() {
      const email = '1@test.com';
      const password = '122           ';
      const spy = expect.createSpy();

      const wrapper = mount(<Signup createUser={spy}/>);
      wrapper.find('input[name="email"]').instance().value = email;
      wrapper.find('input[name="password"]').instance().value = password;
      wrapper.find('form').simulate('submit');

      expect(wrapper.state('error').length).toNotBe(0);
    });


    it('should set createUser callback errors', function() {
      const password = '1234';
      const reason = 'this is the error reason';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy}/>);
      wrapper.find('input[name="password"]').instance().value = password;
      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[1]({reason});
      expect(wrapper.state('error')).toBe(reason);

      spy.calls[0].arguments[1]();
      expect(wrapper.state('error').length).toBe(0);
    });

  })
}
