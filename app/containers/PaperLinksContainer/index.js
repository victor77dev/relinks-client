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
  constructor(props) {
    super(props);
    this.goToPath = this.goToPath.bind(this);
  }

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

  goToPath(path) {
    const { history } = this.props;
    history.push(path);
  }

  render() {
    const { paperLink, match, setEditMode, editModeData, updatePaperData, startEdit } = this.props;
    const { paperId } = match.params;
    return (
      <div>
        <Helmet>
          <title>Paper Links</title>
          <meta name="description" content="Paper Links" />
        </Helmet>
        <PaperLinks
          paperId={paperId}
          paperLink={paperLink}
          goToPath={this.goToPath}
          setEditMode={setEditMode}
          startEdit={startEdit}
          editModeData={editModeData}
          updatePaperData={updatePaperData}
        />
      </div>
    );
  }
}

PaperLinksContainer.propTypes = {
  match: PropTypes.object,
  paperLink: PropTypes.object,
  history: PropTypes.object,
  callGetLinksDetail: PropTypes.func,
  setEditMode: PropTypes.func,
  startEdit: PropTypes.func,
  updatePaperData: PropTypes.func,
  editModeData: PropTypes.object,
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
