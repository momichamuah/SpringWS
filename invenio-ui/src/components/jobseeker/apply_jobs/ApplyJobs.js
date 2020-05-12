import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
class ApplyJobs extends Component {
  state = {
    jobs: [],
    jobSeekerModel: [],
  };
  componentDidMount() {
    console.log("componentDidMount");
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
  }
  getmatches(params) {
    let tempTags = params;
    let m=0;
    tempTags.forEach((t) => {
      if (this.state.jobSeekerModel.tags.some((v) => v.tag === t.tag)) {
        m++;
        console.log(t);
      }
    });
    return m;
  }
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
        <td>{this.getmatches(job.tags )}</td>
        <td>
        {this.getmatches(job.tags )>=job.tagMatch?(<button
            type="submit"
            className="btn btn-outline-success my-2 my-sm-0"
            
          >
            Apply
          </button>):("")}
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
                <h2>
                  Jobs Match Result with Skills:{" "} {}
                  
                </h2>
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
