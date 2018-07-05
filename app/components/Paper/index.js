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
    const { paperData, goToPath, cardLayoutProps } = this.props;
    return (
      <CardLayout
        paperData={paperData}
        theme={theme}
        goToPath={goToPath}
        cardLayoutProps={cardLayoutProps}
      />
    );
  }
}

Paper.propTypes = {
  paperData: PropTypes.object,
  goToPath: PropTypes.func,
  cardLayoutProps: PropTypes.object,
};

export default Paper;
