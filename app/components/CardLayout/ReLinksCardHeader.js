/**
*
* ReLinksCardHeader
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import CardHeaderTitle from './CardHeader/CardHeaderTitle';

const styles = (theme) => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  menu: {
    top: 48,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

// Create the menu for edit paper info / button for edit done
const CardHeaderOption = (props) => {
  const variant = 'contained';
  const { editMode, anchorEl, endEdit, handleMenuClick, handleMenuClose, goToEdit, classes } = props;
  return (
    editMode ?
      <Button
        key="Done"
        size="small"
        color="primary"
        className={classes.button}
        variant={variant}
        onClick={endEdit}
      >
        Done
      </Button>
    : <div>
      <IconButton onClick={handleMenuClick} className={classes.menuButton} color="inherit" aria-label="Menu">
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        className={classes.menu}
      >
        <MenuItem key="EditInfo" onClick={goToEdit}>Edit Info</MenuItem>;
      </Menu>
    </div>
  );
};

CardHeaderOption.propTypes = {
  editMode: PropTypes.bool,
  anchorEl: PropTypes.object,
  endEdit: PropTypes.func,
  handleMenuClick: PropTypes.func,
  handleMenuClose: PropTypes.func,
  goToEdit: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

class ReLinksCardHeader extends React.PureComponent {
  state = {
    anchorEl: null,
    title: this.props.title,
  };

  handleMenuClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  goToEdit = () => {
    const { paperId, setEditMode } = this.props;
    this.handleMenuClose();
    setEditMode(paperId, true);
  }

  sendEdit = () => {
    const { updatePaperData } = this.props;
    const { title } = this.state;
    updatePaperData({ title });
  }

  endEdit = () => {
    const { setEditMode } = this.props;
    setEditMode(null, false);
  }

  render() {
    const { anchorEl } = this.state;
    const { classes, title, authors, editMode } = this.props;
    return (
      <CardHeader
        title={
          <CardHeaderTitle
            editMode={editMode}
            sendEdit={this.sendEdit}
            title={title}
            handleChange={this.handleChange}
            endEdit={this.endEdit}
          />
        }
        subheader={authors}
        action={
          <CardHeaderOption
            editMode={editMode}
            anchorEl={anchorEl}
            endEdit={this.endEdit}
            handleMenuClick={this.handleMenuClick}
            handleMenuClose={this.handleMenuClose}
            goToEdit={this.goToEdit}
            classes={classes}
          />
        }
      />
    );
  }
}

ReLinksCardHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  authors: PropTypes.string,
  paperId: PropTypes.string,
  setEditMode: PropTypes.func,
  editMode: PropTypes.bool,
  updatePaperData: PropTypes.func,
};

export default withStyles(styles)(ReLinksCardHeader);
