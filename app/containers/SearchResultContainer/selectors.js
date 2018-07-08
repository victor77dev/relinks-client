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

const makeSelectSearchText = () => createSelector(
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

const makeSelectSearchResultFromArxiv = () => createSelector(
  selectSearchBoxContainerDomain,
  (searchBoxState) => searchBoxState.get('searchResultFromArxiv')
);

const makeSelectSearchErrorFromArxiv = () => createSelector(
  selectSearchBoxContainerDomain,
  (searchBoxState) => searchBoxState.get('searchErrorFromArxiv')
);

export {
  makeSelectSearchText,
  makeSelectSearchResult,
  makeSelectSearchError,
  makeSelectSearchResultFromArxiv,
  makeSelectSearchErrorFromArxiv,
};
