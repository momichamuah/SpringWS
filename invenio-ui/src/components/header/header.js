import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Logo1 from "../images/logo.svg";
class header extends Component {
    empSignOut = () => {
        localStorage.removeItem("loggedInEmployer");
        this.props.empSignout();
        //this.props.history.push('/home');
    }
    jobSeekerSignout = () => {
        localStorage.removeItem("loggedInJobSeeker");
        localStorage.removeItem("loggedInJobSeekerName");
        this.props.jobSeekerSignout();
        //this.props.history.push('/home');
    }

    render() {
        let emp_link = (
            <Link to="/employer-login" className="nav-link">
                Post a Job
            </Link>
        )
        let jobseeker_link = (
            <Link to="/jobseeker-login" className="nav-link">
                Jobseeker Login
            </Link>
        )
        if (localStorage.getItem("loggedInEmployer")) {
            emp_link = (
                <Link to="/home" className="nav-link" onClick={this.empSignOut}>
                    Sign Out, {localStorage.getItem("loggedInEmployer")}
                </Link>
            )
            jobseeker_link = ""

        }
        if (localStorage.getItem("loggedInJobSeeker")) {
            jobseeker_link = (
                <Link to="/home" className="nav-link" onClick={this.jobSeekerSignout}>
                    Sign Out, {localStorage.getItem("loggedInJobSeekerName")}
                </Link>
            )
            emp_link = ""

        }
        return (
            
            <div className="mb-5">
               
                <nav
                    className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
                    id="ftco-navbar"
                >
                    <div className="container">
                        
                        <a className="navbar-brand" href="index.html" >
                        {/* <img src={Logo1} /> */}<span style={{ color: '#6c63ff' }}>I N V E N I O</span>                
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#ftco-nav"
                            aria-controls="ftco-nav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="oi oi-menu"></span> Menu
            </button>

                        <div className="collapse navbar-collapse" id="ftco-nav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item cta mr-md-1">
                                    {emp_link}
                                </li>
                                <li className="nav-item active">
                                    <a href="index.html" className="nav-link">
                                        Home
                  </a>
                                </li>
                                <li className="nav-item">
                                    <a href="about.html" className="nav-link">
                                        About
                  </a>
                                </li>
                                <li className="nav-item">
                                    <a href="candidates.html" className="nav-link">
                                        Canditates
                  </a>
                                </li>
                                <li className="nav-item">
                                    <a href="blog.html" className="nav-link">
                                        Blog
                  </a>
                                </li>
                                <li className="nav-item">
                                    <a href="contact.html" className="nav-link">
                                        Contact
                  </a>
                                </li>
                                <li className="nav-item cta cta-colored">
                                    {jobseeker_link}
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>{" "}
            </div>
        );
    }
}

export default withRouter(header);
