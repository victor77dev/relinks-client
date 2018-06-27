
import { fromJS } from 'immutable';
import cardLayoutContainerReducer from '../reducer';

describe('cardLayoutContainerReducer', () => {
  it('returns the initial state', () => {
    expect(cardLayoutContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
