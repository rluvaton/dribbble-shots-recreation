import React from 'react';
import './App.css';
import ShowcasePage from './pages/showcase';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { allShots } from './pages/shots';

function App() {
  const routes = allShots.map(({ id, link, createComponent }) => ({ id, link, createComponent }))
  return (
    <Router>
      <Switch>

        <Route exact path="/">
          <ShowcasePage/>
        </Route>

        {routes.map(({ id, link, createComponent }) => <Route key={id} exact path={link}>{createComponent()}</Route>)}

        <Route path="*">
          {/* Redirect to showcase */}
          <Redirect to="/"/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
