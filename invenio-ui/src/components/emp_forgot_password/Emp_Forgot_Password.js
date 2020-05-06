import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
class Emp_Forgot_Password extends Component {
    state = {
      employerModel: {
        email: ""
      },      
        alerMessage : ""
    };
    handleSubmit = (event) => {
      //prevent query string from displaying on the browser
      event.preventDefault();
      axios
        .post(
          "http://localhost:5001/invenio/employers/forgetpassword",
          this.state.employerModel
        )
        .then((response) => {
          this.setState({
            alerMessage: "Email Sent, Success !!",
          });
        })
        .catch((error) => {
          console.log("Signin failed");
          this.setState({
            alerMessage: "Email Sent, Failure !!",
          });
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
      <div className="middle formcontainer" onSubmit={this.handleSubmit}>
        <form>
          <h2>Forgot Password</h2>
          <div class="form-group">
            <div class="alert alert-success" role="alert">
                {this.state.alerMessage}
            </div>
            <input
            onChange={this.handleChange}
            value={this.state.employerModel.email}
            name="email"
            className="form-control mr-sm-2"
            type="text"
            placeholder="Employer Email"
            aria-label="Employer Email"
          />
						<div class="form-group">
							<p><Link to="employer-login">Sign In</Link> or <Link to="employer-signup">Sign Up</Link> or <Link to="employer-reset-password">Reset</Link></p>
						</div>
						<div class="form-group">
							<input type="submit" value="Send Email" class="btn btn-primary"/>
						</div>          
          </div>
        </form>
      </div>
    );
  }
}

export default Emp_Forgot_Password;
