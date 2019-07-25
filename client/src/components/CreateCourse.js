import React, { Component } from 'react';
import { MyContext }  from './Context';
import ValidationError from './ValidationError';

class CreateCourse extends Component {

    constructor(props){
        super(props);
        this.state = {
            valError: false,
            errorMsg: null,
            errorIsString: false
        }
    }


    titleInput = React.createRef();
    descriptionInput = React.createRef();
    estimatedTimeInput = React.createRef();
    materialsNeededInput = React.createRef();


    handleCancel = (event) => {
        event.preventDefault();
        this.props.history.push('/');
    }

    handleSubmit = async (event) => {
        
        event.preventDefault();

        const data = {
            estimatedTime: this.estimatedTimeInput.current.value,
            materialsNeeded: this.materialsNeededInput.current.value,
            userId: this.context.currentAuthUserId
        }

        if(this.titleInput.current.value){
            data.title = this.titleInput.current.value;
        }

        if(this.descriptionInput.current.value){
            data.description = this.descriptionInput.current.value
        }

        // set options
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(data)
        }

        // dealing with credentials
        const encodedCredentials = btoa(`${this.context.currentAuthUserEmail}:${this.context.currentAuthUserPassword}`);
        options.headers['Authorization'] = `Basic ${encodedCredentials}`;


        // 
        await fetch('http://localhost:5000/api/courses', options)
            .then(response => {
                console.log("first then");
                
                if(response.status === 201){
                    this.setState({
                        valError: false,
                        errorMsg: null,
                        errorIsString: false
                    });
                    console.log('successful course creation occurred');
                    
                    this.props.history.push('/');

                } else {
                    return response.json();
                }

            }).then(data => {
                console.log("second then");
                if(data.error.message){
                    console.log("error occurred during course creation");
                    if(typeof data.error.message === 'string'){
                        this.setState({
                            valError: true,
                            errorMsg: data.error.message,
                            errorIsString: true
                        });
                    } else {
                        this.setState({
                            valError: true,
                            errorMsg: data.error.message,
                            errorIsString: false
                        });
                    }
                    
                    
                }
            }).catch(err => {
                console.log("api request failed");
                this.setState({
                    valError: true,
                    errorMsg: "api request failed",
                    errorIsString: true
                });
            });
        
    }


    render(){

        return(
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    <ValidationError 
                            valError={this.state.valError}
                            errorMsg={this.state.errorMsg}
                            errorIsString={this.state.errorIsString}
                    />
                    <form onSubmit={this.handleSubmit}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." ref={this.titleInput} />
                                </div>
                                <p>By {this.context.currentAuthUserFirstName} {this.context.currentAuthUserLastName}</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea id="description" name="description" type="text" className="" placeholder="Course description..." ref={this.descriptionInput} />
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input id="estimatedTime" name="estimatedtime" type="text" className="course--time--input" placeholder="Hours" ref={this.estimatedTimeInput} />
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials ..." ref={this.materialsNeededInput} />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Create Course</button>
                            <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>    
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

CreateCourse.contextType = MyContext;

export default CreateCourse;