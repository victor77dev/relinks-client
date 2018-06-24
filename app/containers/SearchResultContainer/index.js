/**
 *
 * SearchResultContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import SearchResult from 'components/SearchResult/Loadable';

import { makeSelectSearchResult, makeSelectSearchError } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class SearchResultContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { searchResult, history } = this.props;
    return (
      <div>
        <Helmet>
          <title>Search Result</title>
          <meta name="description" content="Search Result" />
        </Helmet>
        <SearchResult searchResult={searchResult} history={history} />
      </div>
    );
  }
}

SearchResultContainer.propTypes = {
  searchResult: PropTypes.array,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  searchResult: makeSelectSearchResult(),
  searchError: makeSelectSearchError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'searchResultContainer', reducer });
const withSaga = injectSaga({ key: 'searchResultContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchResultContainer);
