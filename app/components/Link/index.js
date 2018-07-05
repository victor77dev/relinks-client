/**
*
* Link
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

class Link extends React.PureComponent {
  render() {
    const { paperData, goToPath, cardLayoutProps, linkDetail, linkType } = this.props;
    return (
      <CardLayout
        paperData={paperData}
        linkDetail={linkDetail}
        linkType={linkType}
        theme={theme}
        goToPath={goToPath}
        cardLayoutProps={cardLayoutProps}
      />
    );
  }
}

Link.propTypes = {
  paperData: PropTypes.object,
  goToPath: PropTypes.func,
  linkDetail: PropTypes.object,
  linkType: PropTypes.string,
  cardLayoutProps: PropTypes.object,
};

export default Link;
