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
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  menu: {
    top: 48,
  },
};

class ReLinksCardHeader extends React.PureComponent {
  state = {
    anchorEl: null,
  };

  handleMenuClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  goToEdit = () => {
    const { paperId, setEditMode } = this.props;
    this.handleMenuClose();
    setEditMode(paperId, true);
  }

  render() {
    const { anchorEl } = this.state;
    const { classes, title, authors } = this.props;
    return (
      <CardHeader
        title={title}
        subheader={authors}
        action={
          <div>
            <IconButton onClick={this.handleMenuClick} className={classes.menuButton} color="inherit" aria-label="Menu">
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleMenuClose}
              className={classes.menu}
            >
              <MenuItem key="EditInfo" onClick={this.goToEdit}>Edit Info</MenuItem>;
            </Menu>
          </div>
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
};

export default withStyles(styles)(ReLinksCardHeader);
