import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
class Emp_Signup extends Component {
  state = {
    employerModel: {
      empCode: "",
      empName: "",
      empDescription: "",
      email: "",
      password: "",
      telephone: "",
    },
  };

  handleSubmit = (event) => {
    //prevent query string from displaying on the browser
    event.preventDefault();
    axios
      .post("http://localhost:5001/invenio/employers", this.state.employerModel)
      .then((response) => {
        //navigate to a thankyou page
        console.log(response);
        //store the LoggedInUser
        localStorage.setItem(
          "loggedInEmployer",
          this.state.employerModel.empCode
        );
        this.props.empLogin();
        this.props.history.push("/employer-landing");
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
    const tempEmployer = { ...this.state.employerModel };
    tempEmployer[name] = value;
    this.setState({
      employerModel: tempEmployer,
    });
  };
  render() {
    return (
      <div className="middle formcontainer">
        <form onSubmit={this.handleSubmit}>
          <h3> Employer Sign Up</h3>
          <div className="row mb-2">
            <div className="col">
              <input
                onChange={this.handleChange}
                value={this.state.employerModel.empCode}
                name="empCode"
                type="text"
                className="form-control"
                placeholder="Employer Code"
              />
            </div>
            <div className="col">
              <input
                onChange={this.handleChange}
                value={this.state.employerModel.empName}
                name="empName"
                type="text"
                className="form-control"
                placeholder="Employer name"
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <input
                onChange={this.handleChange}
                value={this.state.employerModel.email}
                name="email"
                type="text"
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="col">
              <input
                onChange={this.handleChange}
                value={this.state.employerModel.empDescription}
                name="empDescription"
                type="text"
                className="form-control"
                placeholder="Employer Description"
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <input
                onChange={this.handleChange}
                value={this.state.employerModel.telephone}
                name="telephone"
                type="text"
                className="form-control"
                placeholder="Telephone"
              />
            </div>
            <div className="col">
              <input
                onChange={this.handleChange}
                value={this.state.employerModel.password}
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
          </div>
          <div class="form-group">
							<p>Already registered? <Link to="/employer-login">Sign In</Link></p>
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

export default withRouter( Emp_Signup);
