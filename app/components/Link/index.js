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
    const { paperData, history, linkDetail, linkType } = this.props;
    return <CardLayout paperData={paperData} linkDetail={linkDetail} linkType={linkType} theme={theme} history={history} />;
  }
}

Link.propTypes = {
  paperData: PropTypes.object,
  history: PropTypes.object,
  linkDetail: PropTypes.object,
  linkType: PropTypes.string,
};

export default Link;
