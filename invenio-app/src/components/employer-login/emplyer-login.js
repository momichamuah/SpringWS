import React from 'react'

export default (props) => {

    return (
        <div>
            <h3> Employer Login</h3>
            <div className="row mb-2">
                <div className="col">
                    <input onChange={props.handleChange} value = {props.employerModel.empCode} name ="empCode" type="text" className="form-control" placeholder="Employer Code" />
                </div>
                <div className="col">
                    <input onChange={props.handleChange} value = {props.employerModel.password} name ="password" type="password" className="form-control" placeholder="Password" />
                </div>
            </div>
        </div>
    )

}