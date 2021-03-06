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
    this.addPaper = this.addPaper.bind(this);
    this.updatePaperData = this.updatePaperData.bind(this);
  }

  // Get authors name from arxiv data; if not exists, find in ref data
  getAuthors = (paperData) => {
    const { arxiv, ref } = paperData;
    if (arxiv && arxiv.length !== 0) {
      return arxiv[0].author.reduce((string, author) => string === '' ? author : `${string}, ${author}`, '');
    } else if (ref && ref.length !== 0) {
      return ref[0].authors.reduce((string, author) => string === '' ? author : `${string}, ${author}`, '');
    }
    return 'No Authors data in ReLinks.';
  }

  goToPath(path) {
    const { goToPath, cardLayoutProps } = this.props;
    const { setEditMode } = cardLayoutProps;
    goToPath(path);
    setEditMode(null, false);
  }

  addPaper(paperId) {
    const { paperData, cardLayoutProps } = this.props;
    const { addPaper } = cardLayoutProps;
    const { title } = paperData;
    addPaper(title, paperId, this.goToPath);
  }

  // Insert paperData in updatePaperData call
  updatePaperData(updateData) {
    const { paperData, cardLayoutProps } = this.props;
    const { updatePaperData } = cardLayoutProps;
    updatePaperData(paperData, updateData);
  }

  render() {
    const { classes, paperData, theme, linkDetail, linkType, cardLayoutProps } = this.props;
    const { setEditMode, startEdit, editModeData, addingPaper } = cardLayoutProps;
    const { title } = paperData;
    /* eslint-disable no-underscore-dangle */
    const paperId = paperData._id;
    if (!paperId) {
      return (
        <MuiThemeProvider theme={theme}>
          <h3 key="paperNotFound">Cannot find this paper in ReLinks</h3>
        </MuiThemeProvider>
      );
    }
    const authors = this.getAuthors(paperData);
    const { editPaper, editMode, editStarted } = editModeData;
    const currEditMode = paperId === editPaper ? editMode : false;
    // Set addingPaper to false if the paper is not adding
    const currAddingPaper = addingPaper.get(paperId, false);
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
            startEdit={startEdit}
            editMode={currEditMode}
            editStarted={editStarted}
            updatePaperData={this.updatePaperData}
          />
          <ReLinksCardContent paperData={paperData} linkDetail={linkDetail} linkType={linkType} editMode={currEditMode} />
          <ReLinksCardContentExt paperData={paperData} editMode={currEditMode} />
          <ReLinksCardActions
            paperData={paperData}
            goToPath={this.goToPath}
            addPaper={this.addPaper}
            editMode={currEditMode}
            addingPaper={currAddingPaper}
          />
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
  cardLayoutProps: PropTypes.object,
};

export default withStyles(styles)(CardLayout);
