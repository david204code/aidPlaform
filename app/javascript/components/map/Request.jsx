import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Request extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      help: []
    };

    this.acceptRequest = this.acceptRequest.bind(this);
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

  acceptRequest = (event) => {
    event.preventDefault()
    const { help } = this.state;
    console.log(help.id);

    axios.post(`http://localhost:3000/helps/${help.id}/accepted_helps`, {withCredentials: true, help_id: help.id})
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data)
        } else {
          this.setState ({
            errors: response.data.errors
          })
        }
      })
      .catch(error => console.log('api errors:', error)
    )
    alert("Congrgulation on accepting this request")
    this.props.history.push("/acceptedhelp");
  };

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
            Able to assist? Click on the button below!
          </p>
          <div className ="row">
            <div className ="col-md-4 offset-md-4">
              <form onSubmit={this.acceptRequest}>
                <button type ="submit">
                  Accept this request
                </button>
              </form>
            </div>
            {/* <div className ="col-md-4">
              <a
                // target ="_blank"
                href ="http://localhost:3000/message"
              >
                <button>
                  Send a message
                </button>
              </a>
              <Link
                to ="/message"
                className =""
                role ="button"
              >
                <button>
                  Send a message
                </button>
              </Link>
            </div> */}
          </div>
        </div>

        
      </div>
    )
  }
}

export default Request;