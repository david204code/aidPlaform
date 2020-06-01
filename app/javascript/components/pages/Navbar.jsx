import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Navbar extends React.Component {

  constructor(props) {
    super(props);

    this.handleLogOutClick = this.handleLogOutClick.bind(this);
  }

  handleLogOutClick() {
    axios.delete("http://localhost:3000/logout", { withCredentials: true})
    .then(response => {
      this.props.handleLogOut();
      this.props.history.push('/')
    })
    .catch(error => {
      console.log("logout error", error);
    });
  };

  render() {
    return (
      <div className ="container">
        <h1 className ="text-center">Aid Platform</h1>
        <h4 className ="text-center">Help those around you, your very own local
          neighbour aid platform for your neighbour!
        </h4>
        {
          this.props.isLoggedin ? 
          <button onClick={() => this.handleLogOutClick()}>Logout</button> :
          null
        }
        <nav className ="text-center">
          <Link 
            to =""
          >
            Home
          </Link>

          <Link
            to ="/map"
          >
            <button>Map</button>
          </Link>

          <Link
            to ="/help"
          >
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              Submit a post
            </button>
          </Link>

          <Link
            to ="/dashboard"
          >
            <button className ="">
              Dashboard
            </button>
          </Link>

        </nav>
      </div>
    );
  };
};

export default Navbar;