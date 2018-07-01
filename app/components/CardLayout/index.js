/**
*
* CardLayout
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
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
  constructor(props) {
    super(props);
    this.goToPath = this.goToPath.bind(this);
    this.updatePaperData = this.updatePaperData.bind(this);
  }

  // Get authors name from arxiv data; if not exists, find in ref data
  getAuthors = (paperData) => {
    if (paperData.arxiv.length !== 0) {
      return paperData.arxiv[0].author.reduce((string, author) => string === '' ? author : `${string}, ${author}`, '');
    } else if (paperData.ref.length !== 0) {
      return paperData.ref[0].authors.reduce((string, author) => string === '' ? author : `${string}, ${author}`, '');
    }
    return 'No Authors data in ReLinks.';
  }

  goToPath(path) {
    const { goToPath, setEditMode } = this.props;
    goToPath(path);
    setEditMode(null, false);
  }

  // Insert paperData in updatePaperData call
  updatePaperData(updateData) {
    const { paperData, updatePaperData } = this.props;
    updatePaperData(paperData, updateData);
  }

  render() {
    const { classes, paperData, theme, linkDetail, linkType, setEditMode, editModeData } = this.props;
    const { title } = paperData;
    /* eslint-disable no-underscore-dangle */
    const paperId = paperData._id;
    const authors = this.getAuthors(paperData);
    const { editPaper, editMode } = editModeData;
    const currEditMode = paperId === editPaper ? editMode : false;
    return (
      <MuiThemeProvider theme={theme}>
        <Helmet>
          <title>Card for {title}</title>
          <meta name="description" content={`Card for ${title}`} />
        </Helmet>
        <Card className={classes.card}>
          <ReLinksCardHeader
            title={title}
            authors={authors}
            paperId={paperId}
            goToPath={this.goToPath}
            setEditMode={setEditMode}
            editMode={currEditMode}
            updatePaperData={this.updatePaperData}
          />
          <ReLinksCardContent paperData={paperData} linkDetail={linkDetail} linkType={linkType} editMode={currEditMode} />
          <ReLinksCardContentExt paperData={paperData} editMode={currEditMode} />
          <ReLinksCardActions paperData={paperData} goToPath={this.goToPath} editMode={currEditMode} />
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
  setEditMode: PropTypes.func,
  updatePaperData: PropTypes.func,
  editModeData: PropTypes.object,
};

export default withStyles(styles)(CardLayout);
