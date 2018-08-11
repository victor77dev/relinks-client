/**
*
* MessageBox
*
*/

import React from 'react';
// import styled from 'styled-components';

import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  overlay: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'fixed',
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 3,
    textAlign: 'center',
  },
  overlayDetail: {
    width: '60%',
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(150,150,150,0.7)',
    zIndex: 4,
    textAlign: 'center',
  },
  textCen: {
    textAlign: 'center',
    color: grey['300'],
    display: 'block',
    margin: theme.spacing.unit,
  },
  textLef: {
    textAlign: 'left',
    color: grey['400'],
    margin: theme.spacing.unit,
  },
  closeButton: {
    float: 'right',
    margin: theme.spacing.unit,
  },
});

const MessageCard = (props) => {
  const { show, classes, closeCard, errorMsg } = props;
  if (!show) return null;
  return (
    <Card className={classes.overlay}>
      <Card className={classes.overlayDetail}>
        <IconButton className={classes.closeButton} aria-label="Close" onClick={closeCard}>
          <CloseIcon />
        </IconButton>
        <Typography variant="display3" component="h1" className={classes.textCen}>
          Error! Cannot add this paper!
        </Typography>
        <Typography variant="headline" component="h3" className={classes.textLef}>
          {errorMsg.err} &quot;{errorMsg.title}&quot;.
        </Typography>
      </Card>
    </Card>
  );
};

MessageCard.propTypes = {
  errorMsg: PropTypes.object,
  show: PropTypes.bool,
  closeCard: PropTypes.func,
  classes: PropTypes.object,
};

class MessageBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    showCard: true,
  }

  closeCard = () => {
    const { updateError } = this.props;
    updateError(null);
  }

  render() {
    const { classes, errorMsg } = this.props;
    if (errorMsg === null) return null;
    const { showCard } = this.state;
    return (
      <MessageCard
        errorMsg={errorMsg}
        show={showCard}
        closeCard={this.closeCard}
        classes={classes}
      />
    );
  }
}

MessageBox.propTypes = {
  classes: PropTypes.object,
  errorMsg: PropTypes.object,
  updateError: PropTypes.func,
};

export default withStyles(styles)(MessageBox);
