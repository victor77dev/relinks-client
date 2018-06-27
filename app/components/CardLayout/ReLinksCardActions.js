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

const styles = (theme) => ({
  actions: {
    display: 'flex',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

/* eslint-disable no-underscore-dangle */
// Card Actions in ReLinks
const ReLinksCardActions = (props) => {
  const checkPaperOnClick = (id) => {
    props.goToPath(`/paperLinks/${id}`);
  };

  const addPaperOnClick = (id) => {
    console.log('Add ReLinks Click');
    console.log(id);
  };

  const { paperData, classes } = props;
  const variant = 'contained';
  const paperId = paperData._id;
  const buttonList = [];
  // Create Button to go to Paper Links in ReLinks
  buttonList.push({
    id: `Check_${paperId}`,
    text: 'Check ReLinks',
    func: checkPaperOnClick.bind(this, paperId),
  });
  if (paperData.arxiv.length === 0 && paperData.ref.length !== 0) {
    // Create Button to add paper in ReLinks
    buttonList.push({
      id: `Add_${paperId}`,
      text: 'Add in ReLinks',
      func: addPaperOnClick.bind(this, paperId),
    });
  }
  return (
    <CardActions className={classes.actions} disableActionSpacing>
      {buttonList.map((button) => {
        const { text, func, id } = button;
        return (
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
      })}
    </CardActions>
  );
};

ReLinksCardActions.propTypes = {
  paperData: PropTypes.object,
  classes: PropTypes.object,
};

export default withStyles(styles)(ReLinksCardActions);
