import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
    let tabledata = this.state.jobs.map((job, index) => 
    <tr>
        <td>{job.jobID}</td>
        <td>{job.jobTitle}</td>
        <td>{job.jobDescription}</td>
        <td>{job.tagMatch}</td>
        <td>
        <a className="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
        <a className="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
     
        </td>
    </tr>);
    return (
      <div class="container">
        <div class="table-wrapper">
          <div class="table-title">
            <div class="row">
              <div class="col-sm-8">
                <h2>
                  Job <b>Details</b>
                </h2>
              </div>
            </div>
          </div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Job ID</th>  
                <th>Job Title</th>
                <th>Description</th>
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

export default Emp_Job_List;
