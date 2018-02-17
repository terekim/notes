import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {PrivateHeader} from './PrivateHeader';

Enzyme.configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('PrivateHeader', function() {
    it('should set button text to logout', function() {
      const wrapper = mount(<PrivateHeader title="title1" handleLogout={() => {}} />);
      const buttonText = wrapper.find('button').text();
      expect(buttonText).toBe('logout');
    });

    it('should use title prop as h1 test', function() {
      const title = "Test title here";
      const wrapper = mount(<PrivateHeader title={title} handleLogout={() => {}} />);
      const h1Text = wrapper.find('.header__title').text();
      expect(h1Text).toBe(title);
    });

    it('should call handleLogout on click', function() {
      const spy = expect.createSpy();
      const wrapper = mount(<PrivateHeader title="title1" handleLogout={spy} />);

      wrapper.find('button').simulate('click');

      expect(spy).toHaveBeenCalled();
    })
  });
}
