import React from 'react';
import SignUp from "./SignUp";

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.history.push("/dashboard");
  }

  render() {
    return (
    <div>
      <h1>Home</h1>
      <h1>Status: {this.props.loggedInStatus}</h1>
      <SignUp handleSuccessfulAuth ={this.handleSuccessfulAuth}/>
    </div>
    );
  };
};

export default Home;