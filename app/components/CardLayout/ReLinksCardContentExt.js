/**
*
* ReLinksCardContentExt
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

// Create Summary in Collapse CardContent for arXiv data
class ReLinksCardContentExt extends React.PureComponent {
  state = { expanded: false };
  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { paperData, classes } = this.props;
    if (paperData.arxiv.length === 0 || !(paperData.arxiv[0].summary)) {
      return null;
    }
    const { summary } = paperData.arxiv[0];
    return (
      <CardContent>
        <CardActions>
          <Typography paragraph variant="title">
            Summary
          </Typography>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show Summary"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>
              {summary}
            </Typography>
            <Typography variant="caption" gutterBottom align="right">
              from arXiv.org
            </Typography>
          </CardContent>
        </Collapse>
      </CardContent>
    );
  }
}

ReLinksCardContentExt.propTypes = {
  paperData: PropTypes.object,
  classes: PropTypes.object,
};

export default withStyles(styles)(ReLinksCardContentExt);
