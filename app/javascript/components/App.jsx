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
      isLoggedin: false,
      user: {}
    };
  };

  componentDidMount() {
    this.loginStatus()
  };

  loginStatus = () => {
    axios.get('http://localhost:3001/logged_in',
    {withCredentials: true})

    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogout()
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

  handleLogout = () => {
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