import React, { Component } from 'react';
import axios from 'axios';
import EmployerLogin from '../employer-login/emplyer-login'
import EmployerSignUp from '../employer-signup/employer-signup'

class SignUp extends Component {
    state = {
        employerModel: {
            empCode: '',
            empName:'',
            empDescription: '',
            email:'',
            password: '',
            telephone: ''
        },
        displayLoginForm: true

    }
    handleSubmit = (event) => {
        //prevent query string from displaying on the browser
        event.preventDefault();
        axios.post('http://localhost:5001/invenio/employers', this.state.employerModel)
        .then(response=> {
            //navigate to a thankyou page
            console.log(response)
            //store the LoggedInUser
            localStorage.setItem('loggedInEmployer',response.data);
            this.props.history.push('/home');
            //axios.post('Saved');
        }).catch(error=>{
            //display some error messages
            axios.post('Error in saving');

        });
    }
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempEmployer = {...this.state.employerModel};
        tempEmployer[name] = value;
        this.setState (
            {
                employerModel: tempEmployer
            }
        )
    }

    signupUser(event){
        if(this.state.displayLoginForm == false){
            this.handleSubmit(event)
        }else{
            this.setState({displayLoginForm: false})
        }
    }

    loginUser(event){
        if(this.state.displayLoginForm){
            this.handleSubmit(event)
        }else{
            this.setState({displayLoginForm: true})
        }
    }

    render() {
        return (
            <div>
                <form className="container" >
                    {this.state.displayLoginForm? <EmployerLogin handleChange={(e) => this.handleChange(e)} {...this.state}/> :  <EmployerSignUp  {...this.state}  handleChange={(e) => this.handleChange(e)} />}
                    <div className="row">
                        <div className="col-6" >
                            <button type = "button" onClick={(e) => this.signupUser(e)} className="btn btn-primary">Sign up</button>
                        </div>
                        { this.state.displayLoginForm == true?
                            <div className="col-6" >
                                <button type = "button" onClick={(e) => this.loginUser(e)} className="btn btn-primary">Login</button>
                            </div> : ""
                        }
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUp;