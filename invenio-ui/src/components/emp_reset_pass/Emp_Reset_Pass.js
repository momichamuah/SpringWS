import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import MessageBox from 'react-message-box'
/*
 showAlert() {
        this.refs.messageBox.alert("Alert", "This is alert!").ok(() => {
            console.log("Alert ok!");
        });
    }
 
    showConfirm() {
        this.refs.messageBox.confirm("Confirm", "This is confirm!").ok(() => {
            console.log("Confirm ok!");
        }).cancle(() => {
            console.log("Confirm cancle!");
        });
    }
*/
class Emp_Reset_Pass extends Component {
  state = {
    employerModel: {
      token: "",
      password: "",
      email: "",
    },
    confirm_password: "",
  };
  handleSubmit = (event) => {
    //prevent query string from displaying on the browser
    event.preventDefault();
    axios
      .post(
        "http://localhost:5001/invenio/employers/resetpassword",
        this.state.employerModel
      )
      .then((response) => {
        this.props.history.push("/employer-login");
        //axios.post('Saved');
        //this.props.setLoggedInUser(response.data)
      })
      .catch((error) => {
        console.log("reset failed");
        //this.refs.messageBox.alert("Error", "Password reset failed!");
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
        <form onSubmit={this.handleSubmit}>
          <h2>Employer Reset Password</h2>

          <input
            onChange={this.handleChange}
            value={this.state.employerModel.token}
            name="token"
            className="form-control mr-sm-2"
            type="text"
            placeholder="token"
            aria-label="Token"
          />

          <input
            onChange={this.handleChange}
            value={this.state.employerModel.email}
            name="email"
            type="text"
            className="form-control"
            placeholder="Email"
          />
          <input
            onChange={this.handleChange}
            value={this.state.employerModel.password}
            name="password"
            className="form-control mr-sm-2"
            type="password"
            placeholder="Password"
            aria-label="Password"
          />
          <input
            onChange={this.handleChange}
            value={this.state.confirm_password}
            name="confirm_password"
            className="form-control mr-sm-2"
            type="password"
            placeholder="Confirm Password"
            aria-label="Confirm Password"
          />
          <div className="form-group">
            <p>
              Not registered? <Link to="/employer-signup">Sign Up</Link> |{" "}
              <Link to="/employer-login">Login</Link>
            </p>
          </div>
          <button
            type="submit"
            className="btn btn-outline-success my-2 my-sm-0"
          >
            Reset Password
          </button>
        </form>
      </div>
    );
  }
}

export default Emp_Reset_Pass;
