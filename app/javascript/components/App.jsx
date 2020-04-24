import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/pages/Navbar';
import Home from '../components/pages/Home';
import Dashboard from '../components/pages/Dashboard';
import Map from '../components/map/Map';
import Help from './help/Help';

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

          <Navbar />

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

            <Route
              exact path ={"/help"}
              render ={props => (
                <Help
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