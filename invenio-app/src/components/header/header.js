import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class header extends Component {

    state = {
        employerModel: {
            empCode:'',
            password: ''
            
        }

    }

    handleSubmit = (event) => {
        //prevent query string from displaying on the browser
        event.preventDefault();
        console.log("Login user", this.state)
        axios.post('http://localhost:5001/invenio/employers/login', this.state.employerModel)
        .then(response=> {
            //store the LoggedInUser
            localStorage.setItem('loggedInEmployer',response.data);
            //navigate to a home page
            this.props.history.push('/home');
            //axios.post('Saved');
            //this.props.setLoggedInUser(response.data)

        }).catch(error=>{
            console.log("Signin failed");
            //display some error messages
            //this.props.history.push('/signedin-failed');

        });
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempEmployer = {...this.state.employerModel};
        tempEmployer[name] = value;
        this.setState (
            {
                employerModel: tempEmployer
            }
        )
    }
    signOut = () => {
        localStorage.removeItem("loggedInEmployer");
        this.props.history.push("/");
    }
    render() {
        let links = (
            <Link className="nav-link" to="/employer-login">Post Job<span className="sr-only">(current)</span></Link>
        )
        let signInForm = (
            <form className="form-inline mt-2 mt-md-0" onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} value = {this.state.employerModel.empCode} name ="empCode" className="form-control mr-sm-2" type="text" placeholder="Emp Code" aria-label="Employer Code" />
            <input onChange={this.handleChange} value = {this.state.employerModel.password} name ="password" className="form-control mr-sm-2" type="password" placeholder="Password" aria-label="Password" />
            <button type = "submit" className="btn btn-outline-success my-2 my-sm-0" type="submit">Sign In</button>
        </form>

        );
        if(localStorage.getItem("loggedInEmployer")) {
            links = <Link className="nav-link" to="/settings">Settings<span className="sr-only">(current)</span></Link>
            signInForm = <button onClick={this.signOut} type = "submit" className="btn btn-outline-success my-2 my-sm-0" >Sign Out</button>
        }

        
        return (
            <div className= "mb-5" >
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <a className="navbar-brand" href="#">I N V E N I O</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                {links}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about-us">About Us</Link>
                            </li>
                            
                        </ul>
                        {signInForm}
                    </div>
                </nav>
            </div>
           
        );
    }
}

export default header;
