/*
 *
 * CardLayoutContainer actions
 *
 */

import {
  START_EDIT,
  STOP_EDIT,
  UPDATE_PAPER_INFO,
} from './constants';

export function setEditMode(paperId, value) {
  if (value) {
    return {
      type: START_EDIT,
      paperId,
    };
  }
  return {
    type: STOP_EDIT,
    paperId,
  };
}

export function updatePaperInfo(paperId, paperInfo) {
  return {
    type: UPDATE_PAPER_INFO,
    paperId,
    paperInfo,
  };
}
