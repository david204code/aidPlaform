import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class AcceptedHelp extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      acceptedHelp: []
    };

  };

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    axios.get(`/acceptedhelps/${id}`)
    .then(response => {
      console.log(response => {
        this.setState({acceptedHelp: response.data})
      })
      .catch(error =>  console.log(error))
    }
    
    )
  }

  render() {
    return (
      <div>
        <div>
          <h1>Hello from AcceptedHelp</h1>
          <p>You have accepted this request</p>
          <p>Please contact the member of your community by messaging them below:</p>
        </div>
      </div>
    )
  };

};

export default AcceptedHelp;