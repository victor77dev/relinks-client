
import { fromJS } from 'immutable';
import searchResultContainerReducer from '../reducer';

describe('searchResultContainerReducer', () => {
  it('returns the initial state', () => {
    expect(searchResultContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
