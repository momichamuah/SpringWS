import React, { Component } from "react";
import axios from "axios";
import { Link,  withRouter } from 'react-router-dom';
class Emp_Login extends Component {
  state = {
    employerModel: {
      empCode: "",
      password: "",
    },
  };
  handleSubmit = (event) => {
    //prevent query string from displaying on the browser
    event.preventDefault();
    console.log("Login user", this.state);
    axios
      .post(
        "http://localhost:5001/invenio/employers/login",
        this.state.employerModel
      )
      .then((response) => {
        //store the LoggedInUser
        localStorage.setItem("loggedInEmployer", response.data.empCode);
        console.log(localStorage.getItem("loggedInEmployer"));
        //navigate to a home page
        console.log(response);
        this.props.empLogin();
        this.props.history.push("/employer-landing");
        //axios.post('Saved');
        //this.props.setLoggedInUser(response.data)
      })
      .catch((error) => {
        console.log("Signin failed", error);
        //display some error messages
        //this.props.history.push('/signedin-failed');
      });
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempEmployer = { ...this.state.employerModel };
    tempEmployer[name] = value;
    this.setState({
      employerModel: tempEmployer,
    });
  };
  render() {
    return (
      <div className="middle formcontainer">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <h2>Employer Sign In</h2>
          <div className="form-group">
            <label htmlFor="username" className="sr-only">
              Employer Code
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.employerModel.empCode}
              name="empCode"
              className="form-control mr-sm-2"
              type="text"
              placeholder="Emp Code"
              aria-label="Employer Code"
            />
          </div>
          <input
            onChange={this.handleChange}
            value={this.state.employerModel.password}
            name="password"
            className="form-control mr-sm-2"
            type="password"
            placeholder="Password"
            aria-label="Password"
          />
          <div className="form-group">
            <p>
              Not registered? <Link to="/employer-signup">Sign Up</Link> |{" "}
              <Link to="/employer-forgot-password">Forgot Password?</Link>
            </p>
          </div>
          <button
            type="submit"
            className="btn btn-outline-success my-2 my-sm-0"
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter( Emp_Login);
