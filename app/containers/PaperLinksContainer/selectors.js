import { createSelector } from 'reselect';

/**
 * Direct selector to the paperLinksContainer state domain
 */
const selectPaperLinksContainerDomain = (state) => state.get('paperLinksContainer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PaperLinksContainer
 */

const makeSelectPaperLinkResult = () => createSelector(
  selectPaperLinksContainerDomain,
  (paperLinksState) => paperLinksState.get('linksData')
);

const makeSelectPaperLinkError = () => createSelector(
  selectPaperLinksContainerDomain,
  (paperLinksState) => paperLinksState.get('linksError')
);

export {
  selectPaperLinksContainerDomain,
  makeSelectPaperLinkResult,
  makeSelectPaperLinkError,
};
