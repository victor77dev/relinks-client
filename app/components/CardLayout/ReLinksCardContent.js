/**
*
* ReLinksCardContent
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
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

class ReLinksCardContent extends React.PureComponent {
  state = { expanded: false };
  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { paperData, linkDetail, linkType, classes } = this.props;
    let foundParagraph;
    if (linkDetail && linkDetail.details) {
      foundParagraph = linkDetail.details.foundParagraph || null;
    }
    const paragraphStyle = 'body1';
    // Card Content title
    const titleStyle = 'title';
    const cardTitle = (linkType !== 'current') && <Typography variant={titleStyle}>Found Paragraph</Typography>;
    // Card Content Info
    const infoSrc = (paperData.arxiv.length !== 0) ? 'arXiv' : 'reference';
    const cardInfoStr = linkDetail ? foundParagraph : `Information from ${infoSrc}.`;
    const cardInfo = <Typography variant={paragraphStyle}>{cardInfoStr}</Typography>;
    const cardButton = (
      <CardActions>
        {cardTitle}
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
    );
    const cardContent = (
      <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {cardInfo}
        </CardContent>
      </Collapse>
    );
    if (paperData.arxiv.length !== 0) {
      // Create CardContent with found paragraph and paper summary (Link to arXiv, Link to PDF)
      const paperLink = paperData.arxiv[0].link;
      const cardLink = paperLink ? <Typography variant={paragraphStyle}>Link: <a href={paperLink} target="_blank">{paperLink}</a></Typography> : '';
      const paperPdf = paperData.arxiv[0].pdf;
      const cardPdf = paperPdf ? <Typography variant={paragraphStyle}>Pdf: <a href={paperPdf} target="_blank">{paperPdf}</a></Typography> : '';
      return (
        <CardContent>
          {linkDetail && cardButton}
          {linkDetail ? cardContent : cardInfo}
          {cardLink}
          {cardPdf}
        </CardContent>
      );
    } else if (paperData.ref.length !== 0) {
      // Create CardContent for reference data (Info)
      return (
        <CardContent>
          {linkDetail && cardButton}
          {linkDetail ? cardContent : cardInfo}
        </CardContent>
      );
    }
    return null;
  }
}

ReLinksCardContent.propTypes = {
  paperData: PropTypes.object,
  linkDetail: PropTypes.object,
  linkType: PropTypes.string,
  classes: PropTypes.object,
};

export default withStyles(styles)(ReLinksCardContent);
