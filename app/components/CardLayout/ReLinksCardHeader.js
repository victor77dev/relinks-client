/**
*
* ReLinksCardHeader
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class ReLinksCardHeader extends React.PureComponent {
  render() {
    const { title, authors } = this.props;
    return (
      <CardHeader
        title={title}
        subheader={authors}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
      />
    );
  }
}

ReLinksCardHeader.propTypes = {
  title: PropTypes.string,
  authors: PropTypes.string,
};

export default ReLinksCardHeader;
