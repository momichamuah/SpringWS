import React, { Component } from 'react';
import axios from 'axios';
class StudentLife extends Component {
    state = {
        students: []
    }
    componentDidMount() {
        axios.get('http://localhost:8080/findAll')
        .then(response => {
            this.setState(
                {
                    students: response.data
                }
            )
        })
    }

    render() {
        return (
            this.state.students.map((student, index) =>
            <div className="card" style={{ width: '18rem' }} >
                <div className="card-body">
                    <h5 className="card-title">
                        {student.firstName} {student.lastName}</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{student.email}</li>
                    <li className="list-group-item">{student.age}</li>
                    <li className="list-group-item">{student.telephone}</li>
                </ul>
                <div className="card-body">
                    <a href="www.linkedin.com" className="card-link">LinkedIn</a>
                    <a href="www.facebook.com" className="card-link">Facebook</a>
                </div>
            </div>
            )
        );
    }
}

export default StudentLife;