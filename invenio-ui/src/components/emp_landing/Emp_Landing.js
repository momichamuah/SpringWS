import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Emp_Landing extends Component {
    empSignOut = () => {
        localStorage.removeItem("loggedInEmployer");
        this.setState({ state: this.state });
        this.props.history.push('/home');
    }      
    render() {
        return (
            <div>
                <h1>Emp Landing</h1>
                <Link to="/home" className="nav-link" onClick={this.empSignOut}>
                    Sign Out, {localStorage.getItem("loggedInEmployer")}
                </Link>                
            </div>
        );
    }
}

export default Emp_Landing;