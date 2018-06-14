/**
*
* SearchBox
*
*/

import React from 'react';

import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import messages from './messages';

const styles = (theme) => ({
  textFieldOuter: {
    marginLeft: 10 * theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '70%',
  },
  textField: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
    '&:after': {
      borderBottomColor: theme.palette.secondary.light,
    },
  },
});

class SearchBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { classes, theme, onChange, onKeyPress } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <TextField
          id="Search"
          className={classes.textFieldOuter}
          margin="normal"
          placeholder={messages.placeHolder.defaultMessage}
          onChange={onChange}
          onKeyPress={onKeyPress}
          InputProps={{
            className: classes.textField,
            startAdornment: (
              <InputAdornment position="start" style={{ paddingLeft: 10 }}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </MuiThemeProvider>
    );
  }
}

SearchBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SearchBox);
