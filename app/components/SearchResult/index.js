/**
*
* SearchResult
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';

import Paper from 'components/Paper';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

/* eslint-disable no-underscore-dangle */
class SearchResult extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { searchResult, goToPath, cardLayoutProps } = this.props;
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

    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        {paperList}
      </div>
    );
  }
}

SearchResult.propTypes = {
  searchResult: PropTypes.array,
  goToPath: PropTypes.func,
  cardLayoutProps: PropTypes.object,
};

export default SearchResult;
