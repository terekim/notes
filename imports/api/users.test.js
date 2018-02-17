import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { validateNewUser } from './users';

if (Meteor.isServer) {
  describe('users', function () {

    it('should allow valid email address', function() {
      const testUser = {
        emails: [
          {
            address: 'test@example.com'
          }
        ]
      };
      const res = validateNewUser(testUser);
      expect(res).toBe(true);
    });

    it('should reject invalid email address', function() {
      const testUser = {
        emails: [
          {
            address: 'bademail'
          }
        ]
      };
      expect(() => {
        validateNewUser(testUser);
      }).toThrow();
    });

  });

}

// const add = (a,b) => {
//   if (typeof b !== 'number') {
//     return a + a;
//   }
//   return a + b;
// };
//
// const square = (a) => a * a;
//
// describe('add', function () {
//   it('should add two numbers', function () {
//     const res = add(1,2);
//
//     expect(res).toBe(3);
//   });
//
//   it('should double a single number', function () {
//     const res = add(1);
//     expect(res).toBe(2);
//   });
// })
//
// describe('square', function () {
//   it('should square number', function () {
//     const res = square(2);
//     expect(res).toBe(4);
//   });
// });
