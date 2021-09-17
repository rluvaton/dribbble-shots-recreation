import React from 'react';
import './App.css';
import ShowcasePage from './pages/showcase';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { allShots } from './pages/shots';
import PageRoute from './common/components/PageRoute';
import CookieInjector from './common/components/CookieInjector';
import ShotContainer from './pages/shots/ShotContainer';

function App() {
  return (
    <Router>
      <>
        <Switch>

          <PageRoute exact path="/" title="Dribbble Shots Recreation">
            <ShowcasePage/>
          </PageRoute>

          {
            allShots.map((shot) =>
              <PageRoute key={shot.id} exact path={shot.link} title={shot.name}>
                <ShotContainer shot={shot}/>
              </PageRoute>)
          }

          <Route path="*">
            {/* Redirect to showcase */}
            <Redirect to="/"/>
          </Route>
        </Switch>

        {/* Load the component in every route */}
        <CookieInjector/>
      </>

    </Router>

  );
}

export default App;
