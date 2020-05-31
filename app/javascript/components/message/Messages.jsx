import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Messages extends React.Component {
  constructor(props) {
    super(props);

  };

  render() {
    return (
      <div>
        <div>
          <h1>Hello from message components</h1>
        </div>
      </div>
    )
  };

};

export default Messages;