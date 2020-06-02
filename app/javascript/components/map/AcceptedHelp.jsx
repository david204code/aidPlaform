import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class AcceptedHelp extends React.Component {
  constructor(props) {
    super(props);

  };

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