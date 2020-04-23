import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/auth/Home';
import Dashboard from '../components/auth/Dashboard';
import Map from '../components/auth/Map';
import axios from 'axios';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  checkLoginStatus() {
    axios
    .get("http://localhost:3000/logged_in", { withCredentials: true})
    .then(response => {
      if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: response.data.user
        })
      } else if (!response.data.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        })
      }
    })
    .catch(error => {
      console.log("check login error", error);
    });
  };
  
  componentDidMount() {
    this.checkLoginStatus();
  }
  

  handleLogin(data) {
    this.setState({
      loggedInStatus: "Logged_In",
      user: data.user
    });
  };

  handleLogOut() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
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
                  loggedInStatus ={this.state.loggedInStatus} 
                  handleLogin={this.handleLogin} 
                  handleLogOut={this.handleLogOut} 
                />
              )}
            />

            <Route
              exact path ={"/dashboard"}
              render ={props => (
                <Dashboard
                  loggedInStatus ={this.state.loggedInStatus} 
                />
              )}
            />

            <Route 
              exact path ={"/map"}
              render ={props => (
                <Map
                  loggedInStatus ={this.state.loggedInStatus}
                />  
              )}
            />

          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App 