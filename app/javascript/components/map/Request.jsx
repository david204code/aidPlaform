import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Request extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      help: []
    }
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    axios.get(`/helps/${id}`)
    .then(response => {
      console.log(response)
      this.setState({help: response.data})
    })
    .catch(error => console.log(error))
  }

  render() {
    const { help } = this.state;
    return( 
      <div>
        <section className ="jumbotron jumbotron-fluid text-center">
          <div className ="container py-1">
            <h1 className ="display-4">
              Request
            </h1>
            <p className ="lead">
              We are connecting people in our community to help and support each other
            </p>
          </div>
        </section>

        <div>
          <Link
            to ="/map"
            className =""
            role ="button"
          >
            <button className ="">
              Back to the map
            </button> 
          </Link>
        </div>
        
        <div className ="container py-1">
          <h1 className ="text-center display-4">
            Request title: {help.title}
          </h1>

          <h2>Request ID: {help.id}</h2>
          <h2>Description
          </h2>
            <p>
              {help.description}  
            </p>
          <h2>Type of Request: {help.request_type}</h2>
          <p>Status of the request: This request is {help.status}</p>
        </div>

        <div className ="container pb-5 text-center">
            <p className ="text-center pt-3">
              Accept this request or send a message to find out more
            </p>
            <div className ="row">
              <div className ="col-md-4 offset-md-2">
                <button>
                  Accept this request
                </button>
              </div>
              <div className ="col-md-4">
                <button>
                  Send a message
                </button>
              </div>
            </div>
        </div>

        
      </div>
    )
  }
}

export default Request;