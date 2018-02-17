import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { Notes } from './notes'

if (Meteor.isServer) {
  describe('notes', function() {
    const noteOne = {
      _id: 'testNoteId1',
      title: 'mytitle',
      body: 'mybody',
      userId: 'testUserId1',
      updatedAt: 0
    };
    const noteTwo = {
      _id: 'testNoteId2',
      title: 'mytitle2',
      body: 'mybody2',
      userId: 'testUserId2',
      updatedAt: 0
    };


    beforeEach(function() {
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    it('should insert new note if authenticated', function() {
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });
      expect(Notes.findOne({ _id, userId })).toBeTruthy();
    });

    it('should not insert note if not authenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      });
    });

    it('should remove note if authenticated', function() {
      Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);
      expect(Notes.findOne({ _id: noteOne._id })).toBeFalsy();
    });

    it('should not remove note if unathenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not remove note if invalid/no note id', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId });
      }).toThrow();
    });

    it('should update note', function() {
      const title = 'Updated Title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId,
      },
      [noteOne._id,
        {title}
      ]);

      const note = Notes.findOne(noteOne._id);

      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toInclude({
        title,
        body: noteOne.body
      });
    });

    it('should not update with extra arguments', function() {
      const title = 'Updated Title';
      const name = 'Updated Name';

      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: noteOne.userId,
        },
        [noteOne._id,
          {title: 'New Title', name: 'New Name'},
        ]);
      }).toThrow();
    });

    it('should not update note if user was not creator', function() {
      const title = 'Updated Title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'testId',
      },
      [noteOne._id,
        {title}
      ]);

      const note = Notes.findOne(noteOne._id);
      expect(note).toInclude(noteOne);
    });

    it('should not update note if unathenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not update note if invalid/no note id', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId });
      }).toThrow();
    });

    it('should return a users notes', function() {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId });
      const notes = res.fetch();

      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(noteOne);
    });

    it('should return 0 notes for user that has none', function() {
      const zeroNotesUserId = 'zeroNotesUserId'
      const res = Meteor.server.publish_handlers.notes.apply({ userId: zeroNotesUserId });
      const notes = res.fetch();

      expect(notes.length).toBe(0);
    });

  });
}
