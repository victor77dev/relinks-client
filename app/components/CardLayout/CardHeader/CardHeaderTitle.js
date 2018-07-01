/**
*
* CardHeaderTitle
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DoneIcon from '@material-ui/icons/Done';
import Tooltip from '@material-ui/core/Tooltip';

const styles = (theme) => ({
  paper: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  gridItem: {
    width: '85%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
});

// Create Title / Title edit TextField
class CardHeaderTitle extends React.PureComponent {
  state = {
    editStarted: false,
  };

  startEdit = () => {
    this.setState({ editStarted: true });
  };

  endEdit = () => {
    this.setState({ editStarted: false });
  };

  sendEdit = () => {
    const { sendEdit } = this.props;
    this.endEdit();
    sendEdit();
  }

  render() {
    const { editMode, title, handleChange, classes } = this.props;
    const { editStarted } = this.state;
    // Show title if "Edit Info" is not pressed
    if (!editMode) {
      return title;
    }
    // Show Paper that can click to start edit
    if (!editStarted) {
      return (
        <Tooltip title="Click to Edit">
          <Paper elevation={3} onClick={this.startEdit} className={classes.paper}>
            {title}
          </Paper>
        </Tooltip>
      );
    }
    // Show Edit TextField
    return (
      <Grid container spacing={8} alignItems="flex-end">
        <Grid item className={classes.gridItem}>
          <TextField
            id="title"
            label="Title"
            className={classes.textField}
            defaultValue={title}
            onChange={handleChange('title')}
            margin="normal"
          />
        </Grid>
        <Grid item>
          <Button variant="fab" color="primary" aria-label="add" className={classes.button} onClick={this.sendEdit}>
            <DoneIcon />
          </Button>
        </Grid>
      </Grid>
    );
  }
}

CardHeaderTitle.propTypes = {
  editMode: PropTypes.bool,
  sendEdit: PropTypes.func,
  title: PropTypes.string,
  handleChange: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardHeaderTitle);
