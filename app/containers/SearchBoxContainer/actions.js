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
  SEARCH_ARXIV_PAPER,
  SEARCH_ARXIV_LOADED,
  SEARCH_ARXIV_ERROR,
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

export function searchPaperFromArxiv(text) {
  return {
    type: SEARCH_ARXIV_PAPER,
    text,
  };
}

export function searchLoadedFromArxiv(result) {
  return {
    type: SEARCH_ARXIV_LOADED,
    result,
  };
}

export function searchErrorFromArxiv(error) {
  return {
    type: SEARCH_ARXIV_ERROR,
    error,
  };
}
