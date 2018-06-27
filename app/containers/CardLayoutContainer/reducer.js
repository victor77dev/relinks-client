/*
 *
 * CardLayoutContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  START_EDIT,
  STOP_EDIT,
} from './constants';

const initialState = fromJS({
  editPaper: null,
  editMode: false,
});

function cardLayoutContainerReducer(state = initialState, action) {
  switch (action.type) {
    case START_EDIT:
      return state
        .set('editPaper', action.paperId)
        .set('editMode', true);
    case STOP_EDIT:
      return state
        .set('editPaper', action.paperId)
        .set('editMode', false);
    default:
      return state;
  }
}

export default cardLayoutContainerReducer;
