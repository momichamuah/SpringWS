import React from 'react'

export default (props) => {

    return (
        <div>
            <h3> Employer Sign Up</h3>
            <div className="row mb-2">
                <div className="col">
                    <input onChange={props.handleChange} value = {props.employerModel.empCode} name ="empCode" type="text" className="form-control" placeholder="Employer Code" />
                </div>
                <div className="col">
                    <input onChange={props.handleChange} value = {props.employerModel.empName} name ="empName" type="text" className="form-control" placeholder="Employer name" />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <input onChange={props.handleChange} value = {props.employerModel.email} name ="email" type="text" className="form-control" placeholder="Email" />
                </div>
                <div className="col">
                    <input onChange={props.handleChange} value = {props.employerModel.empDescription} name ="empDescription" type="text" className="form-control" placeholder="Employer Description" />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <input onChange={props.handleChange} value = {props.employerModel.telephone} name ="telephone" type="text" className="form-control" placeholder="Telephone" />
                </div>
                <div className="col">
                    <input onChange={props.handleChange} value = {props.employerModel.password} name ="password" type="password" className="form-control" placeholder="Password" />
                </div>
            </div>
        </div>
    )

}