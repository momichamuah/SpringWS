import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
class ApplyJobs extends Component {
  state = {
    jobs: [],
    jobSeekerModel: undefined,
    jobjobseeker: {
      jsID: undefined,
      jobID: undefined,
    },
  };
  canapply(jobid) {
    const jsid = localStorage.getItem("loggedInJobSeeker");
    console.log("in canapply" + jobid);
    axios
      .get("http://localhost:5001/invenio/jobs/jobseeker/" + jsid + "/" + jobid)
      .then((response) => {
        console.log("canapply already applied");
        console.log(this.state.jobSeekerModel);
        console.log("canapply obj");
        console.log(this.state.jobs.find((obj) => obj.jobID === jobid));
        this.state.jobs.find(
          (obj) => obj.jobID === jobid
        ).isJobAppliedBySeeker = true;
        this.setState({
          jobs: this.state.jobs,
        });
        console.log("after");
        console.log(this.state.jobs.find((obj) => obj.jobID === jobid));
        console.log("canapply obj found");
      })
      .catch((error) => {
        //display some error messages
        console.log("canapply error");
        console.log(error);
      });
    console.log("canapply true");
  }
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
        console.log("componentDidMount success jobSeekerModel");
        console.log(this.state.jobSeekerModel);
      })
      .catch((error) => {
        //display some error messages
        console.log("componentDidMount error jobSeekerModel");
        console.log(error);
        return true;
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
        console.log("componentDidMount success jobs");
        console.log(this.state.jobs);
        this.state.jobs.forEach((t) => {
          this.canapply(t.jobID);
        });
        console.log(this.state.jobs);
      })
      .catch((error) => {
        //display some error messages
        console.log("componentDidMount error jobs");
        console.log(error);
        return true;
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

  handleApplyClick = (event) => {
    event.preventDefault();
    const jobid = event.target.name;
    const jsid = localStorage.getItem("loggedInJobSeeker");
    /*let alreadyapplied = false;
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
      });*/
      console.log("handleApplyClick");
    let tempjobjobseeker = { ...this.state.jobjobseeker };
    tempjobjobseeker.jsID = jsid;
    tempjobjobseeker.jobID = jobid;
    console.log(tempjobjobseeker);
    this.setState({
      jobjobseeker: tempjobjobseeker},
      ()=>   axios
            .post(
              "http://localhost:5001/invenio/jobs/jobseeker",
              this.state.jobjobseeker
            )
            .then((response) => {
              //navigate to a thankyou page
              console.log("handleApplyClick post response");
              console.log(response);
              //alert("Job applied, SUCCESS !!");
              //store the LoggedInUser
              //this.canapply(jobid);
              this.componentDidMount();
            })
            .catch((error) => {
              //display some error messages
              axios.post("Error in saving");
            })
          
    );
    
    
  }

  render() {
    console.log("render");
    console.log(this.state.jobs);
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
            job.isJobAppliedBySeeker === false ? (
              <button
                type="submit"
                className="btn btn-outline-success my-2 my-sm-0"
                name={job.jobID}
                onClick={this.handleApplyClick}
              >
                Apply
              </button>
            ) : (
              <span style={{ color: "#ff6347" }}>Already applied </span>
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
                <h2>
                  Jobs Match Result with Skills:{" "}
                  <span style={{ color: "#ff6347" }}>
                    {this.state.jobSeekerModel
                      ? this.state.jobSeekerModel.tags.map(function (item) {
                          return item["tag"] + ",  ";
                        })
                      : ""}
                  </span>
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
