/*
 *
 * CardLayoutContainer actions
 *
 */

import {
  START_EDIT,
  STOP_EDIT,
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
