import { createSelector } from 'reselect';

/**
 * Direct selector to the cardLayoutContainer state domain
 */
const selectCardLayoutContainerDomain = (state) => state.get('cardLayoutContainer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CardLayoutContainer
 */

const makeSelectCardLayoutEditMode = () => createSelector(
  selectCardLayoutContainerDomain,
  (cardModeState) => {
    const editPaper = cardModeState.get('editPaper');
    const editMode = cardModeState.get('editMode');
    const editStarted = cardModeState.get('editStarted');
    return { editPaper, editMode, editStarted };
  }
);

const makeSelectCardLayoutAddMode = () => createSelector(
  selectCardLayoutContainerDomain,
  (cardModeState) => {
    const addingPaper = cardModeState.get('addingPaper');
    return addingPaper;
  }
);

const makeSelectCardLayoutErrorMsg = () => createSelector(
  selectCardLayoutContainerDomain,
  (cardModeState) => {
    const errorMsg = cardModeState.get('errorMsg');
    return errorMsg;
  }
);

export {
  selectCardLayoutContainerDomain,
  makeSelectCardLayoutEditMode,
  makeSelectCardLayoutAddMode,
  makeSelectCardLayoutErrorMsg,
};
