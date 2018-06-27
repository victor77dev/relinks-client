/**
*
* CardLayout
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import ReLinksCardHeader from './ReLinksCardHeader';
import ReLinksCardContent from './ReLinksCardContent';
import ReLinksCardActions from './ReLinksCardActions';
import ReLinksCardContentExt from './ReLinksCardContentExt';

const styles = (theme) => ({
  card: {
    minWidth: 275,
    margin: theme.spacing.unit,
  },
});

class CardLayout extends React.PureComponent {
  // Get authors name from arxiv data; if not exists, find in ref data
  getAuthors = (paperData) => {
    if (paperData.arxiv.length !== 0) {
      return paperData.arxiv[0].author.reduce((string, author) => string === '' ? author : `${string}, ${author}`, '');
    } else if (paperData.ref.length !== 0) {
      return paperData.ref[0].authors.reduce((string, author) => string === '' ? author : `${string}, ${author}`, '');
    }
    return 'No Authors data in ReLinks.';
  }

  render() {
    const { classes, paperData, theme, linkDetail, linkType, goToPath } = this.props;
    const { title } = paperData;
    const authors = this.getAuthors(paperData);
    return (
      <MuiThemeProvider theme={theme}>
        <Card className={classes.card}>
          <ReLinksCardHeader title={title} authors={authors} />
          <ReLinksCardContent paperData={paperData} linkDetail={linkDetail} linkType={linkType} />
          <ReLinksCardContentExt paperData={paperData} />
          <ReLinksCardActions paperData={paperData} goToPath={goToPath} />
        </Card>
      </MuiThemeProvider>
    );
  }
}

CardLayout.propTypes = {
  paperData: PropTypes.object,
  classes: PropTypes.object,
  linkDetail: PropTypes.object,
  linkType: PropTypes.string,
  theme: PropTypes.object,
  goToPath: PropTypes.func,
};

export default withStyles(styles)(CardLayout);
