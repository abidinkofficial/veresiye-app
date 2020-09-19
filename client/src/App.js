import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Home from './Home';
import Details from './Details';
import Add from './Add';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
            <Route path='/details'>
              <Details />
            </Route>
            <Route path='/add'>
              <Add />
            </Route>
            <Route path='/:id/add'>
              <Add />
            </Route>
            <Route path='/:id'>
              <Details />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
