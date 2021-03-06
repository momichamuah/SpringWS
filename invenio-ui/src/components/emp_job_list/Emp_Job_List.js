import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
class Emp_Job_List extends Component {
  state = {
    jobs: [],
  };
  componentDidMount() {
    console.log("componentDidMount");
    axios
      .get(
        "http://localhost:5001/invenio/jobs/employer/" +
          localStorage.getItem("loggedInEmployer")
      )
      .then((response) => {
        this.setState({
          jobs: response.data,
        });
      });
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
            return item["tag"] + ",  " ;
          })}
        </td>
        <td>{job.tagMatch}</td>
        <td>
          <a className="edit" title="Edit" data-toggle="tooltip">
            <i className="material-icons">&#xE254;</i>
          </a>
          <a className="delete" title="Delete" data-toggle="tooltip">
            <i className="material-icons">&#xE872;</i>
          </a>
        </td>
      </tr>
    ));

    return (
      <div className="container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-8">
                <h2>
                  Job <b>Details</b>
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

export default withRouter(Emp_Job_List);
