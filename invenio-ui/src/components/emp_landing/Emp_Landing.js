import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";
import Add_Job from './../add_job/Add_Job';
import Emp_Job_List from './../emp_job_list/Emp_Job_List';
class Emp_Landing extends Component {
    empSignOut = () => {
        localStorage.removeItem("loggedInEmployer");
        this.setState({ state: this.state });
        this.props.history.push('/home');
    }      
    render() {
        return (
      
            <div className="container-fluid home-margin-top-less-200px">
                      <div>
                <h1>Emp Landing</h1>
                <Link to="/home" className="nav-link" onClick={this.empSignOut}>
                    Sign Out, {localStorage.getItem("loggedInEmployer")}
                </Link>                
            </div>
            <div className="row">
                <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                    <div className="sidebar-sticky">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active" to="/home/dashboard">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                    Dashboard <span className="sr-only">Edit Profile</span>
                                </a>
                            </li>                            
                            <li className="nav-item">
                                <Link className="nav-link" to="/employer-landing/add-job" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-layers"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    Add Job
                                </Link>
                            </li>                            

                            <li className="nav-item">
                                <Link className="nav-link" to="/employer-landing/employer-job-list">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                                    Manage Existing Jobs
                                 </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                    Approve Candidate Interest
                                </a>
                            </li>
  
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                                    Search Candidates
                                 </a>
                            </li>
                        </ul>

                        
                    </div>
                </nav>

                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4"><div className="chartjs-size-monitor" style={{ position: 'absolute', left: '0px', top: '0px', right: '0px', bottom: '0px', overflow: 'hidden', 'pointerEvents': 'none', visibility: 'hidden', 'zIndex': '-1' }}><div className="chartjs-size-monitor-expand" style={{ position: 'absolute', left: '0', top: '0', right: '0', bottom: '0', overflow: 'hidden', 'pointerEvents': 'none', visibility: 'hidden', 'zIndex': '-1' }}><div style={{ position: 'absolute', width: '1000000px', height: '1000000px', left: '0', top: '0' }}></div></div><div className="chartjs-size-monitor-shrink" style={{ position: 'absolute', left: '0', top: '0', right: '0', bottom: '0', overflow: 'hidden', 'pointerEvents': 'none', visibility: 'hidden', 'zIndex': '-1' }}><div style={{ position: 'absolute', width: '200%', height: '200%', left: '0', top: '0' }}></div></div></div>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">{localStorage.getItem("loggedInEmployer")}'s profile</h1>
                    </div>
                    <Route path="/employer-landing/add-job" component={Add_Job} />
                    <Route path="/employer-landing/employer-job-list" component={Emp_Job_List} />    
                </main>
                 
            </div>
        </div>
        );
    }
}

export default Emp_Landing;