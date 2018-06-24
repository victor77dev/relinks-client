/*
 *
 * PaperLinksContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LINK_LOADING,
  LINK_LOADED,
  LINK_ERROR,
} from './constants';

const initialState = fromJS({
  linksData: null,
  linksError: null,
});

function paperLinksContainerReducer(state = initialState, action) {
  switch (action.type) {
    case LINK_LOADING:
      return state
        .set('linksData', null)
        .set('linksError', null);
    case LINK_LOADED:
      return state
        .set('linksData', action.result)
        .set('linksError', null);
    case LINK_ERROR:
      return state
        .set('linksData', null)
        .set('linksError', action.error);
    default:
      return state;
  }
}

export default paperLinksContainerReducer;
