import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

class JobSeekerSignup extends Component {
  state = {
    jobSeekerModel: {
      jsId: 0,
      firstName: "",
      lastName: "",
      image: "",
      password: "",
      phone: "",
      linkedInUrl: "",
      gitHubUrl: "",
      information: "",
      tags: [],
    },
  };

  handleSubmit = (event) => {
    //prevent query string from displaying on the browser
    event.preventDefault();
    axios
      .post(
        "http://localhost:5001/invenio/jobseekers",
        this.state.jobSeekerModel
      )
      .then((response) => {
        //navigate to a thankyou page
        console.log(response);
        //store the LoggedInUser
        localStorage.setItem(
          "loggedInJobSeeker",
          this.state.jobSeekerModel.jsId
        );
        localStorage.setItem(
          "loggedInJobSeekerName",
          this.state.jobSeekerModel.firstName +
            " " +
            this.state.jobSeekerModel.lastName
        );

        this.props.jobSeekerLogin();
        this.props.history.push("/jobseeker-landing");
        //axios.post('Saved');
      })
      .catch((error) => {
        //display some error messages
        axios.post("Error in saving");
      });
  };
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempJobSeeker = { ...this.state.jobSeekerModel };
    tempJobSeeker[name] = value;
    this.setState({
      jobSeekerModel: tempJobSeeker,
    });
  };
  render() {
    return (
      <div className="middle formcontainer">
        <form onSubmit={this.handleSubmit}>
          <h3 style={{ color: '#ff6347' }}> JobSeeker Sign Up</h3>
          <div className="row mb-2">
            <div className="col">
              <input
                onChange={this.handleChange}
                value={this.state.jobSeekerModel.firstName}
                name="firstName"
                type="text"
                className="form-control"
                placeholder="First Name"
              />
            </div>
            <div className="col">
              <input
                onChange={this.handleChange}
                value={this.state.jobSeekerModel.lastName}
                name="lastName"
                type="text"
                className="form-control"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <input
                onChange={this.handleChange}
                value={this.state.jobSeekerModel.email}
                name="email"
                type="text"
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="col">
              <input
                onChange={this.handleChange}
                value={this.state.jobSeekerModel.information}
                name="information"
                type="text"
                className="form-control"
                placeholder="JobSeeker Information"
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <input
                onChange={this.handleChange}
                value={this.state.jobSeekerModel.phone}
                name="phone"
                type="text"
                className="form-control"
                placeholder="Telephone"
              />
            </div>
            <div className="col">
              <input
                onChange={this.handleChange}
                value={this.state.jobSeekerModel.password}
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
          </div>
          <div class="form-group">
            <p style={{ color: '#ff6347' }}>
              Already registered? <Link to="/jobseeker-login">Sign In</Link>
            </p>
          </div>
          <button
            type="submit"
            className="btn btn-outline-success my-2 my-sm-0"
          >
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(JobSeekerSignup);
