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


class Layout extends Component {
  render() {
    let routes = (
        <Fragment>
            <Route path="/employer-login" component={Emp_Login} />
            <Route path="/employer-signup" component={Emp_Signup} />
            <Route path="/employer-forgot-password" component={Emp_Forgot_Password} />
            <Route path="/employer-reset-password" component={Emp_Reset_Pass} />
            <Route path="/home" component={Home} />
            <Route exact path="/" component={Home} />
        </Fragment>

    );    
    if (localStorage.getItem("loggedInEmployer")) {
        routes = (
            <Fragment>
                <Route path="/home" component={Emp_Landing} />
                <Route exact path="/" component={Emp_Landing} />
                <Route path="/employer-landing" component={Emp_Landing} />  
            </Fragment>
        );
    }      
    return (
      <Fragment>
        <Header {...this.props} />
        {routes}
        <Footer {...this.props} />
      </Fragment>
    );
  }
}

export default Layout;
