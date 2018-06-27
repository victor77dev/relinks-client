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

import CardLayoutContainer from 'containers/CardLayoutContainer';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

class Link extends React.PureComponent {
  render() {
    const { paperData, goToPath, linkDetail, linkType } = this.props;
    return <CardLayoutContainer paperData={paperData} linkDetail={linkDetail} linkType={linkType} theme={theme} goToPath={goToPath} />;
  }
}

Link.propTypes = {
  paperData: PropTypes.object,
  goToPath: PropTypes.func,
  linkDetail: PropTypes.object,
  linkType: PropTypes.string,
};

export default Link;
