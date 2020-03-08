import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import GithubState from './Context/github/githubState';
import AlertState from './Context/Alert/AlertState';

import Home from './Pages/Home';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import User from './components/users/User';
import NotFound from './Pages/NotFound';

import './App.css';

const App = () => {

  return (
    <GithubState>
      <AlertState>
        <BrowserRouter>
        <div>
          <Navbar title="Github Finder" icon="fab fa-github"/>
          <div className="container">
            <Alert />
            <Switch>
              <Route exact path='/' component={Home}/> 
              <Route exact path="/user/:login" component={User} />
              <Route component={NotFound}/>
            </Switch>
          </div>
        </div>
        </BrowserRouter>
      </AlertState>
    </GithubState>
  )
}

export default App;
