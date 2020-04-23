import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/auth/Home';
import Dashboard from '../components/auth/Dashboard';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route 
              exact path ={"/"}
              render ={props => (
                <Home {...props}
                loggedInStatus ={this.state.loggedInStatus} />
              )}
            />

            <Route
              exact path ={"/dashboard"}
              render ={props => (
                <Dashboard
                loggedInStatus ={this.state.loggedInStatus} />
              )}
            />

          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App 