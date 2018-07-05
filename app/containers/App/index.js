/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import SearchResultContainer from 'containers/SearchResultContainer/Loadable';
import PaperLinksContainer from 'containers/PaperLinksContainer/Loadable';
import CardLayoutContainer from 'containers/CardLayoutContainer';
import Header from 'components/Header';
import Footer from 'components/Footer';

import Grid from '@material-ui/core/Grid';

const AppWrapper = styled.div`
  max-width: calc(1080px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

const styles = {
  mainApp: {
    marginRight: 'auto',
    marginLeft: 'auto',
    display: 'block',
    paddingTop: 68,
  },
};

const CardLayoutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      (props) => {
        const { cardLayoutProps } = rest;
        const routeProps = { cardLayoutProps, ...props };
        return <Component {...routeProps} />;
      }
    }
  />
);

CardLayoutRoute.propTypes = {
  component: PropTypes.func,
};

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - ReLinks"
        defaultTitle="ReLinks"
      >
        <meta name="description" content="ReLinks - Found out Related Links between papers" />
      </Helmet>
      <Route component={Header} />
      <Grid container justify="center" style={styles.mainApp}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <CardLayoutContainer>
            <CardLayoutRoute exact path="/searchResult" component={SearchResultContainer} />
            <CardLayoutRoute exact path="/paperLinks/:paperId" component={PaperLinksContainer} />
          </CardLayoutContainer>
          <Route component={NotFoundPage} />
        </Switch>
      </Grid>
      <Route component={Footer} />
    </AppWrapper>
  );
}
