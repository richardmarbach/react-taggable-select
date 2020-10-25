import { expect } from 'chai';
import {
  addTag,
  createTagValue,
  init,
  reducer,
  selectTag,
  TaggableSelectState,
  TagValue,
  updateTag,
} from './tag';

describe('reducer', () => {
  describe('AddTagAction', () => {
    it('adds a tag', () => {
      const tag = { key: 'tag', label: 'my-tag' };
      const nextState = reducer(init([]), addTag(tag));
      expect(nextState.tags).to.eql([tag]);
    });
  });

  describe('SelectTagAction', () => {
    let tag: TagValue;
    let currentState: TaggableSelectState;
    beforeEach(() => {
      tag = createTagValue('tag');
      currentState = {
        tags: [],
        selected: [],
        current: tag,
      };
    });

    it('selects the tag', () => {
      const nextState = reducer(currentState, selectTag(tag));
      expect(nextState.selected).to.eql([tag]);
    });

    it('resets the current tag', () => {
      const nextState = reducer(currentState, selectTag(tag));
      expect(nextState.current).to.eql(createTagValue());
    });
  });

  describe('UpdateTagAction', () => {
    it('sets the current tag', () => {
      const initialState: TaggableSelectState = {
        tags: [],
        current: createTagValue('some-tag'),
        selected: [],
      };
      const tag = createTagValue('different-tag');
      const nextState = reducer(initialState, updateTag(tag));
      expect(nextState.current).to.eql(tag);
    });
  });
});
