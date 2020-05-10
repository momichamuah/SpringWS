import React, { Component, Fragment } from "react";
import { Route, withRouter } from "react-router-dom";
import Header from "../header/header";
import Emp_Login from "../emp_login/Emp_Login";
import Emp_Landing from './../emp_landing/Emp_Landing';
import Home from './../home/Home';
import Emp_Signup from './../emp_signup/Emp_Signup';
import Emp_Forgot_Password from './../emp_forgot_password/Emp_Forgot_Password';
import Emp_Reset_Pass from './../emp_reset_pass/Emp_Reset_Pass';

import Footer from './../footer/Footer';

import JobSeekerLanding from "../jobseeker/jobseeker_landing/JobSeekerLanding";
import JobSeekerLogin from "../jobseeker/jobseeker_login/JobSeekerLogin";
import JobSeekerSignup from "../jobseeker/jobseeker_signup/JobSeekerSignup";


class Layout extends Component {
  state = {
    isLoggedInEmployer: false,
    isLoggedInJobSeeker: false
  }

  empLogin(){
    this.setState({isLoggedInEmployer: true})
  }
  jobSeekerLogin(){
    this.setState({isLoggedInJobSeeker: true})
  }

  empSignout(){
    this.setState({isLoggedInEmployer: false});
    localStorage.removeItem("loggedInEmployer");
    this.props.history.push('/');
  }
  jobSeekerSignout(){
    this.setState({isLoggedInJobSeeker: false});
    localStorage.removeItem("loggedInJobSeeker");
    localStorage.removeItem("loggedInJobSeekerName");
  }
  render() {
    let routes = (
        <Fragment>
            <Route path="/employer-login" component={() => <Emp_Login empLogin={() => this.empLogin()}  {...this.props} />} />
            <Route path="/employer-signup" component={() => <Emp_Signup empLogin={() => this.empLogin()} {...this.props} />} />
            <Route path="/employer-forgot-password" component={Emp_Forgot_Password} />
            <Route path="/employer-reset-password" component={Emp_Reset_Pass} />
            <Route path="/jobseeker-login" component={() => <JobSeekerLogin jobSeekerLogin={() => this.jobSeekerLogin()}  {...this.props} />} />
            <Route path="/jobseeker-signup" component={() => <JobSeekerSignup jobSeekerLogin={() => this.jobSeekerLogin()} {...this.props} />} />            
            <Route path="/home" component={Home} />
            <Route exact path="/" component={Home} />
        </Fragment>

    );   
    //ocalStorage.getItem("loggedInEmployer")) 
    if (this.state.isLoggedInEmployer) {
        routes = (
            <Fragment>
                <Route path="/home" component={Emp_Landing} />
                <Route exact path="/" component={Emp_Landing} />
                <Route path="/employer-landing" component={() => <Emp_Landing empSignout={() => this.empSignout()}  {...this.props} />} />
            </Fragment>
        );
    }   
    if (this.state.isLoggedInJobSeeker) {
      routes = (
          <Fragment>
              <Route path="/home" component={JobSeekerLanding} />
              <Route exact path="/" component={JobSeekerLanding} />
              <Route path="/jobseeker-landing" component={() => <JobSeekerLanding jobSeekerSignout={() => this.jobSeekerSignout()}  {...this.props} />} />
          </Fragment>
      );
  }        
    return (
      <Fragment>
        <Header {...this.props} empSignout={() => this.empSignout()} jobSeekerSignout={() => this.jobSeekerSignout()}/>
        {routes}
        <Footer {...this.props} />
      </Fragment>
    );
  }
}

export default withRouter(Layout);
