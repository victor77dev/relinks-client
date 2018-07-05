/**
 *
 * CardLayoutContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectCardLayoutMode } from './selectors';
import { setEditMode, updatePaperInfo, startEdit, addPaper } from './actions';
import reducer from './reducer';
import saga from './saga';

export class CardLayoutContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.updatePaperData = this.updatePaperData.bind(this);
  }

  /* eslint-disable no-underscore-dangle */
  updatePaperData(paperData, updateData) {
    const { updatePaperInfoAction } = this.props;
    const paperId = paperData._id;
    updatePaperInfoAction(paperId, paperData, updateData);
  }

  render() {
    const { children, setEditModeAction, addPaperAction, startEditAction, editModeData } = this.props;
    return (
      <div>
        {
          React.Children.map(children, (child) =>
            (
              React.cloneElement(child, {
                editModeData,
                setEditMode: setEditModeAction,
                startEdit: startEditAction,
                addPaper: addPaperAction,
                updatePaperData: this.updatePaperData,
              })
            )
          )
        }
      </div>
    );
  }
}

CardLayoutContainer.propTypes = {
  children: PropTypes.array,
  setEditModeAction: PropTypes.func,
  startEditAction: PropTypes.func,
  addPaperAction: PropTypes.func,
  updatePaperInfoAction: PropTypes.func,
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
    startEditAction: () => {
      dispatch(startEdit());
    },
    addPaperAction: (title, paperId) => {
      dispatch(addPaper(title, paperId));
    },
    updatePaperInfoAction: (paperId, paperData, updateData) => {
      const newPaperData = paperData;
      Object.keys(updateData).every(
        (key) => {
          if (key === 'title') {
            if (newPaperData.arxiv.length > 0) {
              newPaperData.arxiv.slice(-1)[0].title = updateData.title;
            }
            if (newPaperData.ref.length > 0) {
              newPaperData.ref.slice(-1)[0].title = updateData.title;
            }
          }
          return (newPaperData[key] = updateData[key]);
        }
      );
      dispatch(updatePaperInfo(paperId, newPaperData));
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
