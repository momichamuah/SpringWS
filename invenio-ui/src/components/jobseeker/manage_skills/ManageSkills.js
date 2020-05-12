import React, { Component } from "react";
import axios from "axios";
class ManageSkills extends Component {
  componentDidMount() {
    axios.get("http://localhost:5001/invenio/tags").then((response) => {
      this.setState({
        alltags: response.data,
        //{ tag: "Learn Angular", tagState: "wip", description: "Some information" }
      });
    });

    axios
      .get(
        "http://localhost:5001/invenio/jobseekers/" +
          localStorage.getItem("loggedInJobSeeker")
      )
      .then((response) => {
        console.log("axios");
        console.log(response.data);
        this.setState({
          jobSeekerModel: response.data,
        });
        console.log("componentDidMount");
        console.log(this.state.jobSeekerModel);
        console.log(this.state.jobSeekerModel.tags);
        let tempTags = this.state.alltags;
          tempTags.forEach((t) => {
            if (this.state.jobSeekerModel.tags.some((v) => v.tag === t.tag)) {
              t.category = "complete";
              console.log(t);
            }
          });
        this.setState({ ...this.state, tempTags });
        console.log(this.state.alltags);
      })
      .catch((error) => {
        //display some error messages
        console.log("Error in fetching");
        console.log(error);
      });
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
        console.log(response);
        this.props.history.push("/jobseeker-landing");
      })
      .catch((error) => {
        //display some error messages
        axios.post("Error in saving");
      });
  };
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const tempModel = { ...this.state.jobSeekerModel };
    tempModel[name] = value;
    this.setState({
        jobSeekerModel: tempModel,
    });
  };

  state = {
    selectedtags: 0,
    alltags: [],
    jobSeekerModel: {
      jsId: 0,
      tags: [],
    },
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
    let tasks = this.state.alltags.filter((task) => {
      if (task.tag === id) {
        task.category = cat;
      }
      return task;
    });
    this.setState({ ...this.state, tasks });

    console.log("onDrop");
    console.log(this.state.alltags);

    const completed_tasks =
      this.state.alltags &&
      this.state.alltags.filter((t) => t.category === "complete");

    const tempModel = { ...this.state.jobSeekerModel };
    tempModel.tags = completed_tasks;
    this.setState({
      jobSeekerModel: tempModel,
    });
    console.log(this.state.jobSeekerModel);
    console.log(completed_tasks);
  };
  render() {
    var tempCount = 0;
    var tasks = { wip: [], complete: [] };
    this.state.alltags.forEach((t) => {
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
        <div className="formcontainer_notop">
          <h2 className="header">
            Drag Tags from [Available] to [For {localStorage.getItem("loggedInJobSeekerName")}]
          </h2>
          <hr/>
            <form onSubmit={this.handleSubmit}>
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
                          <h2>[Available Skills]</h2>
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
                          <h2>
                            [For {localStorage.getItem("loggedInJobSeekerName")}
                            }]
                          </h2>
                        </span>
                        {tasks.complete}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="submit"
                        className="btn btn-primary  py-2 px-5"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ManageSkills;
