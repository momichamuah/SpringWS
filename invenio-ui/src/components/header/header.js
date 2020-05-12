import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";

//import Logo1 from "../images/logo.svg";
class header extends Component {
  empSignOut = () => {
    localStorage.removeItem("loggedInEmployer");
    this.props.empSignout();
    //this.props.history.push('/home');
  };
  jobSeekerSignout = () => {
    localStorage.removeItem("loggedInJobSeeker");
    localStorage.removeItem("loggedInJobSeekerName");
    this.props.jobSeekerSignout();
    //this.props.history.push('/home');
  };

  render() {
    let emp_link = (
      <Link to="/employer-login" className="nav-link">
        Post a Job
      </Link>
    );
    let jobseeker_link = (
      <Link to="/jobseeker-login" className="nav-link">
        Jobseeker Login
      </Link>
    );
    let home_link = (
      <Link to="/home" className="nav-link">
        Home
      </Link>
    );
    let about_link = (
      <Link to="/about" className="nav-link">
        About Us
      </Link>
    );
    let candidates_link = (
      <Link to="/candidates" className="nav-link">
        Canditates
      </Link>
    );
    let blog_link = (
      <Link to="/blog" className="nav-link">
        Blog
      </Link>
    );
    let contact_link = (
      <Link to="/contact" className="nav-link">
        Contact Us
      </Link>
    );
    if (localStorage.getItem("loggedInEmployer")) {
      emp_link = (
        <Link to="/home" className="nav-link" onClick={this.empSignOut}>
          Sign Out, {localStorage.getItem("loggedInEmployer")}
        </Link>
        
      );
      jobseeker_link = "";
      about_link = (<span className="nav-link">About Us</span>);
      candidates_link = (<span className="nav-link">Canditates</span>);
      blog_link = (<span className="nav-link">Blog</span>);
      contact_link = (<span className="nav-link">Contact Us</span>);
    }
    if (localStorage.getItem("loggedInJobSeeker")) {
      jobseeker_link = (
        <Link to="/home" className="nav-link" onClick={this.jobSeekerSignout}>
          Sign Out, {localStorage.getItem("loggedInJobSeekerName")}
        </Link>
      );
      emp_link = "";
      about_link = (<span className="nav-link">About Us</span>);
      candidates_link = (<span className="nav-link">Canditates</span>);
      blog_link = (<span className="nav-link">Blog</span>);
      contact_link = (<span className="nav-link">Contact Us</span>);   
    }
    return (
      <div className="mb-5">
        <nav
          className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
          id="ftco-navbar"
        >
          <div className="container">
            <Link className="navbar-brand" to="/home">
              {/* <img src={Logo1} /> */}
              <span style={{ color: "#6c63ff" }}>I N V E N I O</span>
            </Link>
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
                <li className="nav-item cta mr-md-1">{emp_link}</li>
                <li className="nav-item active">
                  <Link to="/home" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">{about_link}</li>
                <li className="nav-item">{candidates_link}</li>
                <li className="nav-item">{blog_link}</li>
                <li className="nav-item">{contact_link}</li>
                <li className="nav-item cta cta-colored">{jobseeker_link}</li>
              </ul>
            </div>
          </div>
        </nav>{" "}
      </div>
    );
  }
}

export default withRouter(header);
