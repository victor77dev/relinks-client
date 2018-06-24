
import { fromJS } from 'immutable';
import paperLinksContainerReducer from '../reducer';

describe('paperLinksContainerReducer', () => {
  it('returns the initial state', () => {
    expect(paperLinksContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
