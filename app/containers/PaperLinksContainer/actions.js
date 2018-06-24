/*
 *
 * PaperLinksContainer actions
 *
 */

import {
  GET_LINK,
  LINK_LOADING,
  LINK_LOADED,
  LINK_ERROR,
} from './constants';

export function getLinksDetail(paperId) {
  return {
    type: GET_LINK,
    paperId,
  };
}

export function getLinksLoading() {
  return {
    type: LINK_LOADING,
  };
}

export function getLinksLoaded(result) {
  return {
    type: LINK_LOADED,
    result,
  };
}

export function getLinksError(error) {
  return {
    type: LINK_ERROR,
    error,
  };
}
