/*
 *
 * SearchBoxContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE_TEXT,
  SEARCH_LOADED,
  SEARCH_ERROR,
  SEARCH_ARXIV_LOADED,
  SEARCH_ARXIV_ERROR,
} from './constants';

const initialState = fromJS({
  text: '',
  searchResult: null,
  searchError: null,
  searchResultFromArxiv: null,
  searchErrorFromArxiv: null,
});

function searchBoxContainerReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TEXT:
      return state
        .set('text', action.text);
    case SEARCH_LOADED:
      return state
        .set('searchResult', action.result)
        .set('searchError', null);
    case SEARCH_ERROR:
      return state
        .set('searchResult', null)
        .set('searchError', action.error);
    case SEARCH_ARXIV_LOADED:
      return state
        .set('searchResultFromArxiv', action.result)
        .set('searchErrorFromArxiv', null);
    case SEARCH_ARXIV_ERROR:
      return state
        .set('searchResultFromArxiv', null)
        .set('searchErrorFromArxiv', action.error);
    default:
      return state;
  }
}

export default searchBoxContainerReducer;
