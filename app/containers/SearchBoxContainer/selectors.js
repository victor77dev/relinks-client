import { createSelector } from 'reselect';

/**
 * Direct selector to the searchBoxContainer state domain
 */
const selectSearchBoxContainerDomain = (state) => state.get('searchBoxContainer');

/**
 * Other specific selectors
 */

/**
 * Default selector used by SearchBoxContainer
 */

const makeSelectSearchBoxText = () => createSelector(
  selectSearchBoxContainerDomain,
  (searchBoxState) => searchBoxState.get('text')
);

const makeSelectSearchResult = () => createSelector(
  selectSearchBoxContainerDomain,
  (searchBoxState) => searchBoxState.get('searchResult')
);

const makeSelectSearchError = () => createSelector(
  selectSearchBoxContainerDomain,
  (searchBoxState) => searchBoxState.get('searchError')
);

export {
  selectSearchBoxContainerDomain,
  makeSelectSearchBoxText,
  makeSelectSearchResult,
  makeSelectSearchError,
};
