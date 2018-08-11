/**
 *
 * MessageBoxContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MessageBox from 'components/MessageBox/Loadable';
import { updateError } from 'containers/CardLayoutContainer/actions';

function MessageBoxContainer(props) {
  const { errorMsg, callUpdateError } = props;
  return (
    <MessageBox errorMsg={errorMsg} updateError={callUpdateError} />
  );
}

MessageBoxContainer.propTypes = {
  errorMsg: PropTypes.object,
  callUpdateError: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    callUpdateError: (error) => {
      dispatch(updateError(error));
    },
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(MessageBoxContainer);
