import React from 'react';
import './App.css';
import ShowcasePage from './pages/showcase';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { allShots } from './pages/shots';
import PageRoute from './common/components/PageRoute';
import CookieInjector from './common/components/CookieInjector';

function App() {
   const routes = allShots.map(({ id, link, createComponent, name }) => ({ id, link, createComponent, name }))

  return (
    <Router>
      <>
        <Switch>

          <PageRoute exact path="/" title="Dribbble Shots Recreation">
            <ShowcasePage/>
          </PageRoute>

          {
            routes.map(({ id, link, createComponent, name }) =>
              <PageRoute key={id} exact path={link} title={name}>{createComponent()}</PageRoute>)
          }

          <Route path="*">
            {/* Redirect to showcase */}
            <Redirect to="/"/>
          </Route>
        </Switch>

        {/* Load the component in every route */}
        <CookieInjector />
      </>

    </Router>

  );
}

export default App;
