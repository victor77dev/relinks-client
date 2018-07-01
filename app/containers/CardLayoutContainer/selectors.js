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

const makeSelectCardLayoutMode = () => createSelector(
  selectCardLayoutContainerDomain,
  (cardModeState) => {
    const editPaper = cardModeState.get('editPaper');
    const editMode = cardModeState.get('editMode');
    const editStarted = cardModeState.get('editStarted');
    return { editPaper, editMode, editStarted };
  }
);

export {
  selectCardLayoutContainerDomain,
  makeSelectCardLayoutMode,
};
