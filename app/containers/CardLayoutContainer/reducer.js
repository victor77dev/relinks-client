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
} from './constants';

const initialState = fromJS({
  editPaper: null,
  editMode: false,
  editStarted: false,
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
    default:
      return state;
  }
}

export default cardLayoutContainerReducer;
