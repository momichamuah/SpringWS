import React, { Component, Fragment } from 'react';
import {Route, withRouter} from 'react-router-dom';
import SignUp from '../signup/SignUp';
import Header from '../header/header';
import AboutUs from '../aboutus/AboutUs';
import ThankYou from '../thankyou/ThankYou';
import Home from '../home/Home';

class Layout extends Component {
    render() {
        let routes = (
            <Fragment>
                {/* <Route exact path="/" component={SignUp} /> */}
                <Route path="/employer-login" component={SignUp} />
            </Fragment>

        );
        if (localStorage.getItem("loggedInEmployer")) {
            routes = (
                <Fragment>
                    <Route path="/home" component={Home} />
                    <Route exact path="/" component={Home} />
                </Fragment>
            );
        }
        return (
            <Fragment>
                <Header  {...this.props} />
                {routes}
                <Route path="/about-us" component={AboutUs} />
                <Route path="/thank-you" component={ThankYou} />
            </Fragment>
        );
    }
}

export default withRouter(Layout);