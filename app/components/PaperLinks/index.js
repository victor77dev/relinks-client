/**
*
* PaperLinks
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import classnames from 'classnames';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import blue from '@material-ui/core/colors/blue';
import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';

import Link from 'components/Link';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

const styles = {
  links: {
    display: 'flex',
  },
  currLine: {
    fill: 'none',
    stroke: grey[700],
    strokeWidth: 4,
    marginLeft: '5%',
    width: '5%',
  },
  nextLine: {
    fill: 'none',
    stroke: grey[700],
    strokeWidth: 4,
    marginLeft: '10%',
    width: '5%',
  },
  prevLinks: {
    minWidth: 275 + (4 * theme.spacing.unit),
    width: '80%',
    margin: theme.spacing.unit,
    background: grey[500],
    marginRight: '20%',
  },
  currLinks: {
    minWidth: 275 + (4 * theme.spacing.unit),
    width: '90%',
    margin: theme.spacing.unit,
    background: blue[500],
    marginRight: '10%',
  },
  nextLinks: {
    minWidth: 275 + (4 * theme.spacing.unit),
    width: '90%',
    margin: theme.spacing.unit,
    background: blueGrey[500],
  },
  button: {
    margin: theme.spacing.unit,
  },
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
};

/* eslint-disable react/no-multi-comp */
// Create previous papers button for papers metioned in current paper in Collapse Card
class ReLinksPrev extends React.PureComponent {
  state = { expanded: false };
  componentWillUpdate() {
    const { prevPaperList, paperNotFound } = this.props;
    if (paperNotFound || prevPaperList.length === 0) {
      this.resetExpand();
    }
  }

  resetExpand() {
    this.setState({ expanded: false });
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { prevPaperList, paperNotFound, classes } = this.props;
    if (paperNotFound || prevPaperList.length === 0) {
      return null;
    }
    return (
      <MuiThemeProvider theme={theme}>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          onClick={this.handleExpandClick}
          aria-expanded={this.state.expanded}
          aria-label="Show Papers"
        >
          Papers mentioned in Related Work session
          <ExpandMoreIcon
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
          />
        </Button>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <Card className={classes.prevLinks}>
            {prevPaperList}
          </Card>
        </Collapse>
      </MuiThemeProvider>
    );
  }
}

ReLinksPrev.propTypes = {
  prevPaperList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  paperNotFound: PropTypes.bool,
  classes: PropTypes.object,
};

/* eslint-disable react/no-multi-comp */
// Create previous papers button for papers metioned in current paper in Collapse Card
class ReLinksNext extends React.PureComponent {
  render() {
    const { nextPaperList, paperNotFound, classes } = this.props;
    if (paperNotFound || nextPaperList.length === 0) {
      return null;
    }
    return (
      <MuiThemeProvider theme={theme}>
        <Card className={classes.nextLinks}>
          <CardHeader
            title="Papers mentioned this paper in Related Work session"
          />
          {nextPaperList}
        </Card>
      </MuiThemeProvider>
    );
  }
}

ReLinksNext.propTypes = {
  nextPaperList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  paperNotFound: PropTypes.bool,
  classes: PropTypes.object,
};

/* eslint-disable no-underscore-dangle */
class PaperLinks extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    currLinkDivHeight: 0,
    currLinkDivWidth: 0,
    nextLinkDivHeight: 0,
    nextLinkDivWidth: 0,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setCurrLinkDivSize(this.currLinkDiv.offsetHeight, this.currLinkDiv.offsetWidth);
      this.setNextLinkDivSize(this.nextLinkDiv.offsetHeight, this.nextLinkDiv.offsetWidth);
    }, 1);
  }

  componentWillUpdate() {
    this.setCurrLinkDivSize(this.currLinkDiv.offsetHeight, this.currLinkDiv.offsetWidth);
    this.setNextLinkDivSize(this.nextLinkDiv.offsetHeight, this.nextLinkDiv.offsetWidth);
  }

  setCurrLinkDivSize(height, width) {
    this.setState({ currLinkDivHeight: height });
    this.setState({ currLinkDivWidth: width });
  }

  setNextLinkDivSize(height, width) {
    this.setState({ nextLinkDivHeight: height });
    this.setState({ nextLinkDivWidth: width });
  }

  render() {
    const { paperLink, goToPath, classes, setEditMode, editModeData, updatePaperData, startEdit } = this.props;
    const currLineStart = this.state.currLinkDivWidth * 0.02;
    const currLineEnd = this.state.currLinkDivWidth * 0.1;
    const currLineMiddle = this.state.currLinkDivHeight / 2;
    const currLinePoints = `${currLineStart},0 ${currLineStart},${currLineMiddle} ${currLineEnd},${currLineMiddle}`;
    const currLine = (
      <svg className={classes.currLine}>
        <polyline points={currLinePoints} />
      </svg>
    );

    const nextLineStart = this.state.nextLinkDivWidth * 0.02;
    const nextLineEnd = this.state.nextLinkDivWidth * 0.1;
    const nextLineMiddle = this.state.nextLinkDivHeight / 2;
    const nextLinePoints = `${nextLineStart},0 ${nextLineStart},${nextLineMiddle} ${nextLineEnd},${nextLineMiddle}`;
    const nextLine = (
      <svg className={classes.nextLine}>
        <polyline points={nextLinePoints} />
      </svg>
    );

    let prevPaperList;
    if (!paperLink || paperLink.length === 0) {
      prevPaperList = <h3 key="prevPaperNotFound">Cannot find this paper in ReLinks</h3>;
    } else {
      prevPaperList = paperLink.previous.map((linkDetail, index) => {
        const data = paperLink.previousPaper[index];
        return (
          <Link
            paperData={data}
            linkDetail={linkDetail}
            linkType="previous"
            key={data._id}
            goToPath={goToPath}
            setEditMode={setEditMode}
            startEdit={startEdit}
            editModeData={editModeData}
            updatePaperData={updatePaperData}
          />
        );
      });
    }

    let currPaperList;
    if (!paperLink || paperLink.length === 0) {
      currPaperList = <h3 key="currPaperNotFound">Cannot find this paper in ReLinks</h3>;
    } else {
      currPaperList = paperLink.currentPaper.map((data) => (
        <Link
          paperData={data}
          linkType="current"
          key={data._id}
          goToPath={goToPath}
          setEditMode={setEditMode}
          startEdit={startEdit}
          editModeData={editModeData}
          updatePaperData={updatePaperData}
        />
      ));
    }

    let nextPaperList;
    if (!paperLink || paperLink.length === 0) {
      nextPaperList = <h3 key="nextPaperNotFound">Cannot find this paper in ReLinks</h3>;
    } else {
      nextPaperList = paperLink.next.map((linkDetail, index) => {
        const data = paperLink.nextPaper[index];
        return (
          <Link
            paperData={data}
            linkDetail={linkDetail}
            linkType="next"
            key={data._id}
            goToPath={goToPath}
            setEditMode={setEditMode}
            startEdit={startEdit}
            editModeData={editModeData}
            updatePaperData={updatePaperData}
          />
        );
      });
    }

    return (
      <div>
        <ReLinksPrev prevPaperList={prevPaperList} paperNotFound={!paperLink || paperLink.length === 0} classes={classes} />
        <div className={classes.links} ref={(elem) => { this.currLinkDiv = elem; }}>
          {currPaperList.length > 0 && currLine}
          <Card className={classes.currLinks}>
            {currPaperList}
          </Card>
        </div>
        <div className={classes.links} ref={(elem) => { this.nextLinkDiv = elem; }}>
          {nextPaperList.length > 0 && nextLine}
          <ReLinksNext nextPaperList={nextPaperList} paperNotFound={(!paperLink || paperLink.length === 0)} classes={classes} />
        </div>
      </div>
    );
  }
}

PaperLinks.propTypes = {
  paperLink: PropTypes.object,
  goToPath: PropTypes.func,
  classes: PropTypes.object,
  setEditMode: PropTypes.func,
  startEdit: PropTypes.func,
  updatePaperData: PropTypes.func,
  editModeData: PropTypes.object,
};

export default withStyles(styles)(PaperLinks);
