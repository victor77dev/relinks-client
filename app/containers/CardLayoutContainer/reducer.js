/*
 *
 * CardLayoutContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  START_EDIT_MODE,
  STOP_EDIT_MODE,
  START_EDIT,
  STOP_EDIT,
  ADD_PAPER,
  PAPER_ADDED,
  ADD_PAPER_ERROR,
} from './constants';

const initialState = fromJS({
  editPaper: null,
  editMode: false,
  editStarted: false,
  addingPaper: {},
});

function cardLayoutContainerReducer(state = initialState, action) {
  switch (action.type) {
    case START_EDIT_MODE:
      return state
        .set('editPaper', action.paperId)
        .set('editMode', true);
    case STOP_EDIT_MODE:
      return state
        .set('editPaper', action.paperId)
        .set('editMode', false);
    case START_EDIT:
      return state
        .set('editStarted', true);
    case STOP_EDIT:
      return state
        .set('editStarted', false);
    case ADD_PAPER:
      return state
        .update('addingPaper', (map) => map.update(action.paperId, () => true));
    case PAPER_ADDED:
      return state
        .update('addingPaper', (map) => map.update(action.paperId, () => false));
    case ADD_PAPER_ERROR:
      return state
        .update('addingPaper', (map) => map.update(action.paperId, () => false));
    default:
      return state;
  }
}

export default cardLayoutContainerReducer;
