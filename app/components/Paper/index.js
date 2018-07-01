/**
*
* Paper
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import CardLayout from 'components/CardLayout';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

class Paper extends React.PureComponent {
  render() {
    const { paperData, goToPath, setEditMode, editModeData, updatePaperData } = this.props;
    return (
      <CardLayout
        paperData={paperData}
        theme={theme}
        goToPath={goToPath}
        setEditMode={setEditMode}
        editModeData={editModeData}
        updatePaperData={updatePaperData}
      />
    );
  }
}

Paper.propTypes = {
  paperData: PropTypes.object,
  goToPath: PropTypes.func,
  setEditMode: PropTypes.func,
  updatePaperData: PropTypes.func,
  editModeData: PropTypes.object,
};

export default Paper;
