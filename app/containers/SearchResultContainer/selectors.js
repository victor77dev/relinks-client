import { createSelector } from 'reselect';

/**
 * Direct selector to the searchResultContainer state domain
 */

/**
 * Other specific selectors
 */
const selectSearchBoxContainerDomain = (state) => state.get('searchBoxContainer');


/**
 * Default selector used by SearchResultContainer
 */

const makeSelectSearchResult = () => createSelector(
  selectSearchBoxContainerDomain,
  (searchBoxState) => searchBoxState.get('searchResult')
);

const makeSelectSearchError = () => createSelector(
  selectSearchBoxContainerDomain,
  (searchBoxState) => searchBoxState.get('searchError')
);

export {
  makeSelectSearchResult,
  makeSelectSearchError,
};
