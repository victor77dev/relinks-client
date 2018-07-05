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
  ADD_PAPER,
  PAPER_ADDED,
  ADD_PAPER_ERROR,
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

export function addPaper(title, paperId) {
  return {
    type: ADD_PAPER,
    title,
    paperId,
  };
}

export function paperAdded(result) {
  return {
    type: PAPER_ADDED,
    result,
  };
}

export function addPaperError(error) {
  return {
    type: ADD_PAPER_ERROR,
    error,
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
