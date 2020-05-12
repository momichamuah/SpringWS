import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
class ApplyJobs extends Component {
  state = {
    jobs: [],
    jobSeekerModel: [],
    jobjobseeker: {
      jsID: 0,
      jobID: 0,
    },
  };
  componentDidMount() {
    console.log("componentDidMount");
    axios
      .get(
        "http://localhost:5001/invenio/jobseekers/" +
          localStorage.getItem("loggedInJobSeeker")
      )
      .then((response) => {
        this.setState({
          jobSeekerModel: response.data,
        });
        console.log(this.state.jobSeekerModel);
      });
    axios
      .get(
        "http://localhost:5001/invenio/jobs/jobseeker/" +
          localStorage.getItem("loggedInJobSeeker")
      )
      .then((response) => {
        this.setState({
          jobs: response.data,
        });
      });
  }
  getmatches(params) {
    let tempTags = params;
    let m = 0;

    tempTags.forEach((t) => {
      if (this.state.jobSeekerModel.tags.some((v) => v.tag === t.tag)) {
        m++;
        console.log(t);
      }
    });
    return m;
  }
  canapply(jobid) {
    const jsid = localStorage.getItem("loggedInJobSeeker");

    axios
      .get("http://localhost:5001/invenio/jobs/jobseeker/" + jsid + "/" + jobid)
      .then((response) => {
        //alert("canapply already applied");
        console.log(this.state.jobSeekerModel);
        return false;
      })
      .catch((error) => {
        //display some error messages
        //alert("canapply error");
        //alert(error);
        return true;
      });
    //alert("canapply true");
    return true;
  }

  handleApplyClick = (event) => {
    event.preventDefault();
    const jobid = event.target.name;
    const jsid = localStorage.getItem("loggedInJobSeeker");
    let alreadyapplied = false;
    // alert(jobid + ":" + jsid);
    axios
      .get("http://localhost:5001/invenio/jobs/jobseeker/" + jsid + "/" + jobid)
      .then((response) => {
        alert("already applied");
        console.log(this.state.jobSeekerModel);
        alreadyapplied = true;
        return;
      })
      .catch((error) => {
        //display some error messages
        //alert("not applied");
      });
    const tempjobjobseeker = { ...this.state.jobjobseeker };
    tempjobjobseeker.jsID = jsid;
    tempjobjobseeker.jobID = jobid;
    this.setState({
      jobjobseeker: tempjobjobseeker,
    });
    console.log(this.state.jobjobseeker);
    //alert(alreadyapplied);
    if (alreadyapplied === false) {
      axios
        .post(
          "http://localhost:5001/invenio/jobs/jobseeker",
          this.state.jobjobseeker
        )
        .then((response) => {
          //navigate to a thankyou page
          console.log(response);
          //alert("Job applied, SUCCESS !!");
          //store the LoggedInUser
        })
        .catch((error) => {
          //display some error messages
          axios.post("Error in saving");
        });
    }
  };

  render() {
    console.log("render");

    let tabledata = this.state.jobs.map((job, index) => (
      <tr>
        <td>{job.jobID}</td>
        <td>{job.jobTitle}</td>
        <td>{job.jobDescription}</td>
        <td>
          {job.tags.map(function (item) {
            return item["tag"] + ",  ";
          })}
        </td>
        <td>{job.tagMatch}</td>
        <td>{this.getmatches(job.tags)}</td>
        <td>
          {this.getmatches(job.tags) >= job.tagMatch ? (
            this.canapply(job.jobID) ? (
              <button
                type="submit"
                className="btn btn-outline-success my-2 my-sm-0"
                name={job.jobID}
                onClick={this.handleApplyClick}
              >
                Apply
              </button>
            ) : (
              "Already applied"
            )
          ) : (
            ""
          )}
        </td>
      </tr>
    ));
    //let dispTags =  this.state.jobSeekerModel.tags.toString();

    return (
      <div className="container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-8">
                <h2>Jobs Match Result with Skills: {}</h2>
              </div>
            </div>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Job Title</th>
                <th>Description</th>
                <th>Tags</th>
                <th>Tags to Match</th>
                <th>Tags Matched</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{tabledata}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(ApplyJobs);
