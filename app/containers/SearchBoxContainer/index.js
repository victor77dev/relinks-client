/**
 *
 * SearchBoxContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import SearchBox from 'components/SearchBox';

import { makeSelectSearchBoxText } from './selectors';
import { updateText } from './actions';
import reducer from './reducer';
import saga from './saga';

export class SearchBoxContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  onChange = this.props.onChangeText;
  onKeyPress = (event) => {
    const { history, text } = this.props;
    if (event.key === 'Enter') {
      history.push(`/searchResult/${text}`);
    }
  }

  onArxivPress = () => {
    const { history, text } = this.props;
    history.push(`/searchResultFromArxiv/${text}`);
  }

  onRelinksPress = () => {
    const { history, text } = this.props;
    history.push(`/searchResult/${text}`);
  }

  render() {
    const { theme } = this.props;
    return (
      <SearchBox
        theme={theme}
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
        onRelinksPress={this.onRelinksPress}
        onArxivPress={this.onArxivPress}
      />
    );
  }
}

SearchBoxContainer.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  history: PropTypes.object,
  text: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  text: makeSelectSearchBoxText(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeText: (event) => {
      dispatch(updateText(event.target.value));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'searchBoxContainer', reducer });
const withSaga = injectSaga({ key: 'searchBoxContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchBoxContainer);
