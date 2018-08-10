/**
*
* ReLinksCardActions
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
  actions: {
    display: 'flex',
  },
  button: {
    margin: theme.spacing.unit,
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

const CardActionsButton = (props) => {
  const { text, func, id, classes, variant, addingPaper } = props;
  return (
    addingPaper ?
      <Button
        key={id}
        size="small"
        color="primary"
        className={classes.button}
        variant={variant}
        disabled
      >
        Adding
        <CircularProgress className={classes.progress} size={24} color="inherit" />
      </Button>
    :
      <Button
        key={id}
        size="small"
        color="primary"
        className={classes.button}
        variant={variant}
        onClick={func}
      >
        {text}
      </Button>
  );
};

CardActionsButton.propTypes = {
  text: PropTypes.string,
  func: PropTypes.func,
  id: PropTypes.string,
  classes: PropTypes.object,
  variant: PropTypes.string,
  addingPaper: PropTypes.bool,
};

/* eslint-disable no-underscore-dangle */
// Card Actions in ReLinks
const ReLinksCardActions = (props) => {
  const checkPaperOnClick = (id) => {
    const { goToPath } = props;
    goToPath(`/paperLinks/${id}`);
  };

  const addPaperOnClick = (id) => {
    const { addPaper } = props;
    addPaper(id);
  };

  const { paperData, classes, addingPaper } = props;
  const { arxiv, ref } = paperData;
  const variant = 'contained';
  const paperId = paperData._id;
  // Create Button to go to Paper Links in ReLinks
  const paperLinksButtonData = {
    id: `Check_${paperId}`,
    text: 'Check ReLinks',
    func: checkPaperOnClick.bind(this, paperId),
  };
  // Create Button to add paper in ReLinks (if arxiv data is missing or db _id is not found)
  const arxivDataExist = arxiv && arxiv.length !== 0;
  const refDataExist = ref && ref.length !== 0;
  const addPaperButtonData = (paperId.indexOf('temp') === 0 || (!arxivDataExist && refDataExist)) ?
  {
    id: `Add_${paperId}`,
    text: 'Add in ReLinks',
    func: addPaperOnClick.bind(this, paperId),
  }
  : null;

  return (
    <CardActions className={classes.actions} disableActionSpacing>
      <CardActionsButton
        text={paperLinksButtonData.text}
        func={paperLinksButtonData.func}
        id={paperLinksButtonData.id}
        classes={classes}
        variant={variant}
      />
      {
        addPaperButtonData !== null &&
        <CardActionsButton
          text={addPaperButtonData.text}
          func={addPaperButtonData.func}
          id={addPaperButtonData.id}
          classes={classes}
          variant={variant}
          addingPaper={addingPaper}
        />
      }
    </CardActions>
  );
};

ReLinksCardActions.propTypes = {
  paperData: PropTypes.object,
  classes: PropTypes.object,
  addingPaper: PropTypes.bool,
  addPaper: PropTypes.func,
};

export default withStyles(styles)(ReLinksCardActions);
