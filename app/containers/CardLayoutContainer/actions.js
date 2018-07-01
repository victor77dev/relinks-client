/*
 *
 * CardLayoutContainer actions
 *
 */

import {
  START_EDIT_MODE,
  STOP_EDIT_MODE,
  START_EDIT,
  STOP_EDIT,
  UPDATE_PAPER_INFO,
  UPDATE_LOADED,
  UPDATE_ERROR,
} from './constants';

export function setEditMode(paperId, value) {
  if (value) {
    return {
      type: START_EDIT_MODE,
      paperId,
    };
  }
  return {
    type: STOP_EDIT_MODE,
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

export function startEdit() {
  return {
    type: START_EDIT,
  };
}

export function stopEdit() {
  return {
    type: STOP_EDIT,
  };
}

export function updateLoaded(result) {
  return {
    type: UPDATE_LOADED,
    result,
  };
}

export function updateError(error) {
  return {
    type: UPDATE_ERROR,
    error,
  };
}
