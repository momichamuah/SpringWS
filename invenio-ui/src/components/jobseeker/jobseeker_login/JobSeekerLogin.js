import React, { Component } from 'react';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
class JobSeekerLogin extends Component {
    state = {
        jobSeekerModel: {
            jsId: 0,
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            image: "",
            password: "",
            telephone: "",
            linkedInUrl: "",
            gitHubUrl: "",
            information: "",
            tags: []
        },
    };

    handleSubmit = (event) => {
        //prevent query string from displaying on the browser
        event.preventDefault();
        console.log("Login user", this.state);
        axios
            .post(
                "http://localhost:5001/invenio/jobseekers/login",
                this.state.jobSeekerModel
            )
            .then((response) => {
                //store the LoggedInUser
                this.setState({
                    jobSeekerModel: response.data,
                  });
                localStorage.setItem(
                    "loggedInJobSeeker",
                    this.state.jobSeekerModel.jsId
                );
                localStorage.setItem(
                    "loggedInJobSeekerName",
                    this.state.jobSeekerModel.firstName + " " + this.state.jobSeekerModel.lastName
                );
                console.log(localStorage.getItem("loggedInJobSeeker"));
                console.log(localStorage.getItem("loggedInJobSeekerName"));
                //navigate to a home page
                console.log(response);
                this.props.jobSeekerLogin();
                this.props.history.push("/jobseeker-landing");
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
        const tempJobSeeker = { ...this.state.jobSeekerModel };
        tempJobSeeker[name] = value;
        this.setState({
            jobSeekerModel: tempJobSeeker,
        });
    };
    render() {
        return (
            <div className="middle formcontainer">
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <h2>JobSeeker Sign In</h2>
                    <div className="form-group">
                        <label htmlFor="email" className="sr-only">
                            Email
            </label>
                        <input
                            onChange={this.handleChange}
                            value={this.state.jobSeekerModel.email}
                            name="email"
                            className="form-control mr-sm-2"
                            type="text"
                            placeholder="Email"
                            aria-label="Email"
                        />
                    </div>
                    <input
                        onChange={this.handleChange}
                        value={this.state.jobSeekerModel.password}
                        name="password"
                        className="form-control mr-sm-2"
                        type="password"
                        placeholder="Password"
                        aria-label="Password"
                    />
                    <div className="form-group">
                        <p>
                            Not registered? <Link to="/jobseeker-signup">Sign Up</Link> |{" "}
                            <Link to="/jobseeker-forgot-password">Forgot Password?</Link>
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

export default withRouter(JobSeekerLogin);