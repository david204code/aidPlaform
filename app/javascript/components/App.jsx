import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/pages/Navbar';
import Home from '../components/pages/Home';
import Dashboard from '../components/pages/Dashboard';
import Map from '../components/map/Map';
import Help from './help/Help';
import Login from '../components/auth/Login';
import Signup from '../components/auth/SignUp';
import Notice from '../components/pages/Notice';
import Request from '../components/map/Request';
import AcceptedHelp from './map/AcceptedHelp';
import Message from './map/Message';
import ConversationList from './ConversationList';


class App extends React.Component {

  constructor() {
    super();

    this.state = {
      isLoggedin: '',
      user: {}
    };

    this.handleLogOut = this.handleLogOut.bind(this);
  };

  // componentDidMount() {
  //   setTimeout(function() {
  //     this.loginStatus()   
  //   }.bind(this), 2000)
  // };

  componentDidMount() {
    this.loginStatus()
  };

  loginStatus = () => {
    axios.get('http://localhost:3000/logged_in',
    {withCredentials: true})

    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
        this.setState({
          isLoggedin: true,
          user: response.data.user
        })
      } else if (!response.data.logged_in) {
        this.handleLogOut()
        this.setState({
          isLoggedin: false,
          user: {}
        })
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

    const PrivateRoute = ({ component: Component, ...rest}) => (
      <Route {...rest} render={(props) => (
        this.state.isLoggedin === true
        // setTimeout(1000)
        ? <Component {...props}/>
        : <Redirect to={{
          pathname: '/notice',
          state: { from: props.location }
        }} />
      )
    }/>
    )

    return (
      <div>
        <BrowserRouter>

          <Route
            render ={props => (
              <Navbar {...props}
                isLoggedin = {this.state.isLoggedin}
                handleLogOut = {this.handleLogOut} 
            />
            )}
          />

          <Switch>
            <Route 
              exact path ={"/"}
              render ={props => (
                <Home {...props}
                  isLoggedin = {this.state.isLoggedin}
                  handleLogin = {this.handleLogin}
                  handleLogOut = {this.handleLogOut} 
                />
              )}
            />

            {/* <Route 
              exact path ={"/login"}
              render ={props => (
                <Login {...props}
                  handleLogin = {this.handleLogin}
                  isLoggedin = {this.state.isLoggedin}
                />
              )}
            />

            <Route
              exact path ={"/signup"}
              render ={props => (
                <Signup {...props}
                  handleLogin = {this.handleLogin}
                  isLoggedin = {this.state.isLoggedin}
                />
              )}
            /> */}

            <Route
              exact path ={"/dashboard"}
              render ={props => (
                <Dashboard {...props}
                  handleLogin = {this.handleLogin}
                  isLoggedin = {this.state.isLoggedin}
                />
              )}
            />

            <PrivateRoute 
              exact path ={"/map"}
              component = { Map }
              // render ={props => (
              //   <Map {...props}
              //     handleLogin = {this.handleLogin}
              //     isLoggedin = {this.state.isLoggedin}
              //   />  
              // )}
            />

            {/* <PrivateRoute */}
            <Route
              path="/request/:id" exact component ={Request}
            />

            <Route
              path ="/acceptedhelp" exact component = {AcceptedHelp}
            />

            <PrivateRoute
              exact path ={"/help"}
              component = { Help }
              // render ={props => (
              //     <Help {...props}
              //       handleLogin = {this.handleLogin}
              //       isLoggedin = {this.state.isLoggedin}
              //     />
              //   )}
            />

            <Route 
              exact path ={"/message"}
              component = { Message }
            />

            <Route 
              exact path ={"/conversationlist"}
              component = { ConversationList }
            />

            <Route
              exact path ={"/notice"}
              component = { Notice }
            />

          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App 