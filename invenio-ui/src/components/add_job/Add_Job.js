import React, { Component } from "react";
import axios from "axios";
class Add_Job extends Component {
  componentDidMount() {
    axios.get("http://localhost:5001/invenio/tags").then((response) => {
      this.setState({
        tasks: response.data,
        //{ tag: "Learn Angular", tagState: "wip", description: "Some information" }
      });
    });
  }
 
  state = {
    selectedtags: 0,
    tasks: [],
    jobModel: {
      jobTitle: "",
      jobDescription: "",
      tagMatch: 0,
      tags: [],
      employer: {
        empCode: localStorage.getItem("loggedInEmployer"),
      },
    },
    /*     tasks: [
      { name: "Learn Angular", category: "wip", bgcolor: "yellow" },
      { name: "React", category: "wip", bgcolor: "pink" },
      { name: "Vue", category: "complete", bgcolor: "skyblue" },
    ], */
  };
  handleSubmit = (event) => {
    //prevent query string from displaying on the browser
    event.preventDefault();
    axios
      .post("http://localhost:5001/invenio/jobs", this.state.jobModel)
      .then((response) => {
        console.log(response);
        this.props.history.push("/employer-landing/employer-job-list");
      })
      .catch((error) => {
        //display some error messages
        axios.post("Error in saving");
      });
  };
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempJob = { ...this.state.jobModel };
    tempJob[name] = value;
    this.setState({
      jobModel: tempJob,
    });
  };
  onDragOver = (ev) => {
    ev.preventDefault();
  };
  onDragStart = (ev, id) => {
    console.log("dragstart:", id);
    ev.dataTransfer.setData("id", id);
  };
  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    let tasks = this.state.tasks.filter((task) => {
      if (task.tag === id) {
        task.category = cat;
      }
      return task;
    });
    this.setState({ ...this.state, tasks });
    
    console.log("onDrop");
    console.log(this.state.tasks);

    const completed_tasks=this.state.tasks && this.state.tasks.filter(t=>t.category==="complete");

    const tempJob = { ...this.state.jobModel };
    tempJob.tags = completed_tasks;
    this.setState({
      jobModel: tempJob,
    });
    console.log(this.state.jobModel)
    console.log(completed_tasks);
  };

  render() {
    var tempCount = 0;
    var tasks = { wip: [], complete: [] };
    this.state.tasks.forEach((t) => {
      if (t.category === "complete") tempCount++;
      tasks[t.category].push(
        <div
          title={t.description}
          key={t.tag}
          onDragStart={(e) => this.onDragStart(e, t.tag)}
          draggable
          className="draggable"
          style={{
            backgroundColor: t.category === "wip" ? "yellow" : "skyblue",
          }}
        >
          {t.tag}{" "}
        </div>
      );
    });
    return (
      <div>
        <h1>Add Job</h1>
        <form onSubmit={this.handleSubmit} className="p-5 bg-white">
          <div className="row form-group">
            <div className="col-md-12 mb-3 mb-md-0">
              <label className="font-weight-bold" htmlFor="jobTitle">
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                onChange={this.handleChange}
                value={this.state.jobModel.jobTitle}
                name="jobTitle"
                className="form-control"
                placeholder="eg. Professional UI/UX Designer"
              />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-12">
              <h3>Job Description</h3>
            </div>
            <div className="col-md-12 mb-3 mb-md-0">
              <textarea
                onChange={this.handleChange}
                value={this.state.jobModel.jobDescription}
                name="jobDescription"
                className="form-control"
                id="jobDescription"
                cols="30"
                rows="5"
              ></textarea>
            </div>
          </div>
          <div className="formcontainer_notop">
            <h2 className="header">
              Drag Tags from [Available] to [For this job]
            </h2>
            <div className="container-drag">
              <table>
                <tbody>
                <tr>
                  <td>
                    <div
                      className="wip"
                      onDragOver={(e) => this.onDragOver(e)}
                      onDrop={(e) => {
                        this.onDrop(e, "wip");
                      }}
                    >
                      <span className="task-header">
                        <h2>[Available]</h2>
                      </span>
                      {tasks.wip}
                    </div>
                  </td>
                  <td width="100%"></td>
                  <td>
                    <div
                      className="droppable"
                      onDragOver={(e) => this.onDragOver(e)}
                      onDrop={(e) => this.onDrop(e, "complete")}
                    >
                      <span className="task-header">
                        <h2>[For this job]</h2>
                      </span>
                      {tasks.complete}
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-12 mb-3 mb-md-0">
              <label className="font-weight-bold" htmlFor="tagMatch">
                Eligibility to apply
              </label>
              <input
                type="text"
                id="tagMatch"
                onChange={this.handleChange}
                value={this.state.jobModel.tagMatch}
                name="tagMatch"
                className="form-control"
                placeholder=""
              />
              <label className="font-weight-bold" htmlFor="fullname">
                {" of "}
              </label>
              <input
                readOnly
                type="text"
                id="fullname"
                value={tempCount}
                className="form-control"
                placeholder="eg. Professional UI/UX Designer"
              />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-12">
              <input
                type="submit"
                value="Post"
                className="btn btn-primary  py-2 px-5"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Add_Job;
