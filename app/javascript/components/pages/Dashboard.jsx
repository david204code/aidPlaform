import React from 'react';
import axios from 'axios';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      // user: {},
      helps: {},
      acceptedHelps: {},
    };      
    
  };
  
  // componentDidUpdate() {
    componentDidMount(){
    console.log(this.props.user.id);
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <h1>Status: {this.props.isLoggedin.toString()}</h1>
        <h1>User: {this.props.user.email}</h1>
      </div>
    );
  };
};

export default Dashboard;