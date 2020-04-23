import React from 'react';
import SignUp from "./SignUp";

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      <h1>Home</h1>
      <h1>Status: {this.props.loggedInStatus}</h1>
      <SignUp />
    </div>
    );
  };
};

export default Home;