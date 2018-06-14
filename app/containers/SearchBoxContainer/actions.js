/*
 *
 * SearchBoxContainer actions
 *
 */

import {
  UPDATE_TEXT,
  SEARCH_PAPER,
  SEARCH_LOADED,
  SEARCH_ERROR,
} from './constants';

export function updateText(text) {
  return {
    type: UPDATE_TEXT,
    text,
  };
}

export function searchPaper(text) {
  return {
    type: SEARCH_PAPER,
    text,
  };
}

export function searchLoaded(result) {
  return {
    type: SEARCH_LOADED,
    result,
  };
}

export function searchError(error) {
  return {
    type: SEARCH_ERROR,
    error,
  };
}
