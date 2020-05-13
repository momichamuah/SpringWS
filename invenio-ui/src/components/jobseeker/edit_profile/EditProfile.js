import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import axios from "axios";
class EditProfile extends Component {
  state = {
    jobSeekerModel: [],
    selectedFile: undefined,
    uploadedFile: undefined
  };
  componentDidMount() {
    axios
      .get(
        "http://localhost:5001/invenio/jobseekers/" +
          localStorage.getItem("loggedInJobSeeker")
      )
      .then((response) => {
        console.log("USEr ::> ", response.data)
        this.setState({
          jobSeekerModel: response.data,
          uploadedFile: response.data.image,
        });
      });

    //  axios.get("http://localhost:5001/invenio/jobseekers/profileimage/" + localStorage.getItem("loggedInJobSeeker"))
    // .then((response) => {
    //         console.log("image found");
    //         console.log(response);
    //         this.setState({
    //             uploadedFile: response.data,
    //           });
    //           console.log(this.state.selectedFile);
    //     }
    //  ).catch((error) => {
    //     //display some error messages
    //     console.log("error in getting image");
    //   });
  }
  handleSubmit = (event) => {
    //prevent query string from displaying on the browser
    event.preventDefault();
    axios
      .put(
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

        //this.props.jobSeekerLogin();
        this.props.history.push("/jobseeker-landing");
        //axios.post('Saved');
      })
      .catch((error) => {
        //display some error messages
        axios.post("Error in saving");
      });
  };
  handleImageSubmit = (event) => {
    //prevent query string from displaying on the browser
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.selectedFile);
    axios
      .put(
        "http://localhost:5001/invenio/jobseekers/profileimage/" +
          localStorage.getItem("loggedInJobSeeker"),
        formData
      )
      .then((res) => {
        console.log("Image ::> ", res.data);
        this.setState({
          uploadedFile: res.data.image,
        });
        alert("File uploaded successfully.");
      });
  };

  handleImageChange = (e) => {
    e.preventDefault();
    this.setState({
      selectedFile: e.target.files[0],
    });
    console.log("file:", e.target.files[0]);

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
      <div className="middle container">
        <form onSubmit={this.handleImageSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Profile Picture</td>
                <td>
                  { this.state.uploadedFile ? <img className="container" src={`${process.env.PUBLIC_URL}/images/upload/jobseekers/${localStorage.getItem("loggedInJobSeeker")}/profile/${this.state.uploadedFile}`} alt=""  /> : ""}
                </td>
              </tr>
              <tr>
                <td>Change Profile Picture</td>
                <td>
                  <input
                    type="file"
                    className="form-control"
                    name="file"
                    onChange={this.handleImageChange}
                    accept="image/png, image/jpeg"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="submit" value="Update profile image" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>

        <form onSubmit={this.handleSubmit}>
          <h3> Edit Profile</h3>
          <table>
            <tbody>
              <tr>
                <td>First Name</td>
                <td>
                  <input
                    onChange={this.handleChange}
                    value={this.state.jobSeekerModel.firstName}
                    name="firstName"
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                  />
                </td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>
                  <input
                    onChange={this.handleChange}
                    value={this.state.jobSeekerModel.lastName}
                    name="lastName"
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                  />
                </td>
              </tr>
              <tr>
                <td>Email/Login</td>
                <td>
                  <input
                    onChange={this.handleChange}
                    value={this.state.jobSeekerModel.email}
                    name="email"
                    type="text"
                    className="form-control"
                    placeholder="Email"
                  />
                </td>
              </tr>
              <tr>
                <td>JobSeeker Information</td>
                <td>
                  <textarea
                    onChange={this.handleChange}
                    value={this.state.jobSeekerModel.information}
                    name="information"
                    type="text"
                    className="form-control"
                    placeholder="JobSeeker Information"
                    cols="30"
                    rows="5"
                  />
                </td>
              </tr>
              <tr>
                <td>Telephone</td>
                <td>
                  <input
                    onChange={this.handleChange}
                    value={this.state.jobSeekerModel.phone}
                    name="phone"
                    type="text"
                    className="form-control"
                    placeholder="Telephone"
                  />
                </td>
              </tr>
              <tr>
                <td>LinkedIn profile</td>
                <td>
                  <input
                    onChange={this.handleChange}
                    value={this.state.jobSeekerModel.linkedInUrl}
                    name="linkedInUrl"
                    type="text"
                    className="form-control"
                    placeholder="LinkedIn URL"
                  />
                </td>
              </tr>
              <tr>
                <td>Github link</td>
                <td>
                  <input
                    onChange={this.handleChange}
                    value={this.state.jobSeekerModel.gitHubUrl}
                    name="gitHubUrl"
                    type="text"
                    className="form-control"
                    placeholder="GitHub Url"
                  />
                </td>
              </tr>
              <tr>
                <td>Password</td>
                <td>
                  <input
                    onChange={this.handleChange}
                    value={this.state.jobSeekerModel.password}
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td style={{ textAlign: "right", verticalAlign: "middle" }}>
                  <button
                    type="submit"
                    className="btn btn-outline-success my-2 my-sm-0"
                  >
                    Save Profile
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default withRouter(EditProfile);
