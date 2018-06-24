/**
 *
 * PaperLinksContainer
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
import PaperLinks from 'components/PaperLinks/Loadable';
import { makeSelectPaperLinkResult, makeSelectPaperLinkError } from './selectors';
import { getLinksDetail } from './actions';
import reducer from './reducer';
import saga from './saga';

export class PaperLinksContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { callGetLinksDetail, match } = this.props;
    const { paperId } = match.params;
    callGetLinksDetail(paperId);
  }

  componentWillUpdate(nextProps) {
    const { callGetLinksDetail, match } = this.props;
    const currPaperId = match.params.paperId;
    const nextPaperId = nextProps.match.params.paperId;
    if (currPaperId !== nextPaperId) {
      callGetLinksDetail(nextPaperId);
    }
  }

  render() {
    const { paperLink, match, history } = this.props;
    const { paperId } = match.params;
    return (
      <div>
        <Helmet>
          <title>Paper Links</title>
          <meta name="description" content="Paper Links" />
        </Helmet>
        <PaperLinks paperId={paperId} paperLink={paperLink} history={history} />
      </div>
    );
  }
}

PaperLinksContainer.propTypes = {
  match: PropTypes.object,
  paperLink: PropTypes.object,
  history: PropTypes.object,
  callGetLinksDetail: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  paperLink: makeSelectPaperLinkResult(),
  paperLinkError: makeSelectPaperLinkError(),
});

function mapDispatchToProps(dispatch) {
  return {
    callGetLinksDetail: (paperId) => {
      dispatch(getLinksDetail(paperId));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'paperLinksContainer', reducer });
const withSaga = injectSaga({ key: 'paperLinksContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PaperLinksContainer);
