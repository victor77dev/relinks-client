/**
*
* SearchResult
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class SearchResult extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { searchResult } = this.props;
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        {JSON.stringify(searchResult)}
      </div>
    );
  }
}

SearchResult.propTypes = {
  searchResult: PropTypes.array,
};

export default SearchResult;
