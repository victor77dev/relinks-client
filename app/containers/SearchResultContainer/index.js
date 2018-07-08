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
import { updateText, searchPaper, searchPaperFromArxiv } from 'containers/SearchBoxContainer/actions';

import {
  makeSelectSearchResult,
  makeSelectSearchError,
  makeSelectSearchResultFromArxiv,
  makeSelectSearchErrorFromArxiv,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

export class SearchResultContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.goToPath = this.goToPath.bind(this);
  }

  state = {
    arxiv: this.props.match.path === '/searchResultFromArxiv/:text',
  }

  componentDidMount() {
    const { match } = this.props;
    const { text } = match.params;
    this.updateSearchResult(text);
  }

  componentWillUpdate(nextProps) {
    const currentText = this.props.match.params.text;
    const { match } = nextProps;
    const { params } = match;
    const { text } = params;
    if (text !== currentText || currentText === '') {
      this.updateSearchResult(text);
    }
  }

  goToPath(path) {
    const { history } = this.props;
    history.push(path);
  }

  updateSearchResult(text) {
    const { callSearchPaperFromArxiv, callSearchPaper, updateTextAction } = this.props;
    const { arxiv } = this.state;
    updateTextAction(text);
    if (arxiv) {
      callSearchPaperFromArxiv(text);
    } else {
      callSearchPaper(text);
    }
  }

  render() {
    const { searchResult, searchResultFromArxiv, cardLayoutProps } = this.props;
    const { arxiv } = this.state;
    const formatedSearchResultFromArxiv = searchResultFromArxiv && searchResultFromArxiv.paper ?
      searchResultFromArxiv.paper.map((data, index) => ({
        arxiv: [data],
        ref: [],
        title: data.title,
        _id: `temp_${index}`,
      }))
    : null;
    return (
      <div>
        <Helmet>
          <title>{arxiv ? 'Search Result From arXiv' : 'Search Result'}</title>
          <meta name="description" content="Search Result" />
        </Helmet>
        <SearchResult
          arxiv={arxiv}
          searchResult={arxiv ? formatedSearchResultFromArxiv : searchResult}
          goToPath={this.goToPath}
          cardLayoutProps={cardLayoutProps}
        />
      </div>
    );
  }
}

SearchResultContainer.propTypes = {
  callSearchPaper: PropTypes.func,
  callSearchPaperFromArxiv: PropTypes.func,
  updateTextAction: PropTypes.func,
  searchResult: PropTypes.array,
  searchResultFromArxiv: PropTypes.object,
  history: PropTypes.object,
  cardLayoutProps: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  searchResult: makeSelectSearchResult(),
  searchError: makeSelectSearchError(),
  searchResultFromArxiv: makeSelectSearchResultFromArxiv(),
  searchErrorFromArxiv: makeSelectSearchErrorFromArxiv(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateTextAction: (text) => {
      dispatch(updateText(text));
    },
    callSearchPaper: (text) => {
      dispatch(searchPaper(text));
    },
    callSearchPaperFromArxiv: (text) => {
      dispatch(searchPaperFromArxiv(text));
    },
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
