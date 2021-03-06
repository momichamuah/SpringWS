import React, { Component } from "react";
import axios from "axios";
import EmployerLogin from "../employer-login/emplyer-login";
import EmployerSignUp from "../employer-signup/employer-signup";

class SignUp extends Component {
  state = {
    employerModel: {
      empCode: "",
      empName: "",
      empDescription: "",
      email: "",
      password: "",
      telephone: "",
    },
    displayLoginForm: true,
  };
  handleSubmit = (event) => {
    //prevent query string from displaying on the browser
    event.preventDefault();
    if (event.target.name === "emp-signup") {
      axios
        .post(
          "http://localhost:5001/invenio/employers",
          this.state.employerModel
        )
        .then((response) => {
          //navigate to a thankyou page
          console.log(response);
          //store the LoggedInUser
          localStorage.setItem("loggedInEmployer", this.state.employerModel.empCode);
          this.props.history.push("/home");
          //axios.post('Saved');
        })
        .catch((error) => {
          //display some error messages
          axios.post("Error in saving");
        });
    }
    if (event.target.name === "emp-login") {
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
          this.props.history.push("/home");
          //axios.post('Saved');
          //this.props.setLoggedInUser(response.data)
        })
        .catch((error) => {
          console.log("Signin failed");
          //display some error messages
          //this.props.history.push('/signedin-failed');
        });
    }
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

  signupUser(event) {
    if (this.state.displayLoginForm === false) {
      this.handleSubmit(event);
    } else {
      this.setState({ displayLoginForm: false });
    }
  }

  loginUser(event) {
    if (this.state.displayLoginForm) {
      this.handleSubmit(event);
    } else {
      this.setState({ displayLoginForm: true });
    }
  }

  render() {
    return (
      <div>
        <form className="container">
          {this.state.displayLoginForm ? (
            <EmployerLogin
              handleChange={(e) => this.handleChange(e)}
              {...this.state}
            />
          ) : (
            <EmployerSignUp
              {...this.state}
              handleChange={(e) => this.handleChange(e)}
            />
          )}
          <div className="row">
            <div className="col-6">
              <button
                type="button"
                onClick={(e) => this.signupUser(e)}
                className="btn btn-primary"
                name="emp-signup"
              >
                Sign up
              </button>
            </div>
            {this.state.displayLoginForm === true ? (
              <div className="col-6">
                <button
                  type="button"
                  onClick={(e) => this.loginUser(e)}
                  className="btn btn-primary"
                  name="emp-login"
                >
                  Login
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
