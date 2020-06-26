import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class AcceptedHelp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      acceptedHelp: [],
      userInfo: []
    };

  };

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    // axios.get(`/acceptedhelps/${id}`)
    axios.get(`helps/45/accepted_helps/59`)
    .then(response => {
        console.log(response)
        this.setState({acceptedHelp: response.data})
        console.log(response.data)
    })
    .catch(error =>  console.log("error", error))
    
    axios.get(`helps/45/accepted_helps/60/userInfo`)
    .then(response => {
      console.log(response)
      this.setState({userInfo: response.data})
      console.log(response.data)
    })
    .catch(error => console.log("Error", error))
  }

  render() {
    const { acceptedHelp } = this.state;
    const { userInfo } = this.state;
    return (
      <div>
        <div>
          <h1>Hello from AcceptedHelp</h1>
          <p>You have accepted this request</p>
          <p>Please contact the member of your community by messaging them below:</p>
        </div>

        <h1>
          ID: {acceptedHelp.id}
        </h1>
        <h1>
          Title: {acceptedHelp.title}
        </h1>
        <h1>
          Description: {acceptedHelp.description}
        </h1>
        <h1>
          Request type: {acceptedHelp.request_type}
        </h1>
        <h1>
          Contact: {userInfo.email}
        </h1>
      </div>
    )
  };

};

export default AcceptedHelp;