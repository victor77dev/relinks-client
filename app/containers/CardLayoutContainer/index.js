/**
 *
 * CardLayoutContainer
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
import CardLayout from 'components/CardLayout';
import { makeSelectCardLayoutMode } from './selectors';
import { setEditMode } from './actions';
import reducer from './reducer';
import saga from './saga';

export class CardLayoutContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { paperData, theme, linkDetail, linkType, goToPath, setEditModeAction, editModeData } = this.props;
    const { title } = paperData;
    return (
      <div>
        <Helmet>
          <title>Card for {title}</title>
          <meta name="description" content={`Card for ${title}`} />
        </Helmet>
        <CardLayout
          paperData={paperData}
          linkDetail={linkDetail}
          linkType={linkType}
          theme={theme}
          goToPath={goToPath}
          setEditMode={setEditModeAction}
          editModeData={editModeData}
        />
      </div>
    );
  }
}

CardLayoutContainer.propTypes = {
  paperData: PropTypes.object,
  linkDetail: PropTypes.object,
  linkType: PropTypes.string,
  theme: PropTypes.object,
  goToPath: PropTypes.func,
  setEditModeAction: PropTypes.func,
  editModeData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  editModeData: makeSelectCardLayoutMode(),
});

function mapDispatchToProps(dispatch) {
  return {
    setEditModeAction: (paperId, value) => {
      dispatch(setEditMode(paperId, value));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'cardLayoutContainer', reducer });
const withSaga = injectSaga({ key: 'cardLayoutContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CardLayoutContainer);
