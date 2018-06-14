
import { fromJS } from 'immutable';
import searchBoxContainerReducer from '../reducer';

describe('searchBoxContainerReducer', () => {
  it('returns the initial state', () => {
    expect(searchBoxContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
