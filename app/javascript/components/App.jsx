import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/pages/Navbar';
import Home from '../components/pages/Home';
import Dashboard from '../components/pages/Dashboard';
import Map from '../components/map/Map';
import Help from './help/Help';
import Login from '../components/auth/Login';
import Signup from '../components/auth/SignUp';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      isLoggedin: false,
      user: {}
    };

    this.handleLogOut = this.handleLogOut.bind(this);
  };

  componentDidMount() {
    this.loginStatus()
  };

  loginStatus = () => {
    axios.get('http://localhost:3000/logged_in',
    {withCredentials: true})

    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogOut()
      }
    })
    .catch(error => console.log('api errors:', error))
  };


  handleLogin = (data) => {
    this.setState({
      isLoggedin: true,
      user: data.user
    });
  };

  handleLogOut = () => {
    this.setState({
      isLoggedin: false,
      user: {}
    });
  };
  

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
                  loggedInStatus = {this.state.isLoggedin}
                  handleLogin = {this.handleLogin}
                  handleLogOut = {this.handleLogOut} 
                />
              )}
            />

            <Route 
              exact path ={"/login"}
              render ={props => (
                <Login {...props}
                  handleLogin = {this.handleLogin}
                  loggedInStatus = {this.state.isLoggedin}
                />
              )}
            />

            <Route
              exact path ={"/signup"}
              render ={props => (
                <Signup {...props}
                  handleLogin = {this.handleLogin}
                  loggedInStatus = {this.state.isLoggedin}
                />
              )}
            />

            <Route
              exact path ={"/dashboard"}
              render ={props => (
                <Dashboard
                />
              )}
            />

            <Route 
              exact path ={"/map"}
              render ={props => (
                <Map
                />  
              )}
            />

            <Route
              exact path ={"/help"}
              render ={props => (
                <Help
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