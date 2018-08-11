/**
*
* SearchResult
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';

import Paper from 'components/Paper';
import MessageBoxContainer from 'containers/MessageBoxContainer';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

/* eslint-disable no-underscore-dangle */
class SearchResult extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { searchResult, goToPath, cardLayoutProps, arxiv, errorMsg, searchError } = this.props;
    let paperList;
    if (!searchResult || searchResult.length === 0) {
      paperList = <h3>Cannot find related paper in ReLinks</h3>;
    } else {
      paperList = searchResult.map((data) => (
        <Paper
          paperData={data}
          key={data._id}
          goToPath={goToPath}
          cardLayoutProps={cardLayoutProps}
        />
      ));
    }
    if (searchResult === null && searchError === null) {
      paperList = <h3>Loading...</h3>;
    }
    const header = arxiv ? { ...messages.arxivHeader } : { ...messages.header };

    return (
      <div>
        <MessageBoxContainer errorMsg={errorMsg} />
        <h1>
          <FormattedMessage {...header} />
        </h1>
        {paperList}
      </div>
    );
  }
}

SearchResult.propTypes = {
  searchResult: PropTypes.array,
  searchError: PropTypes.object,
  goToPath: PropTypes.func,
  cardLayoutProps: PropTypes.object,
  arxiv: PropTypes.bool,
  errorMsg: PropTypes.object,
};

export default SearchResult;
