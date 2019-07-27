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


    /***
     * sends a post request to the REST API with the course details as a body and authorization credentials 
     * if post request is successful it will redirect user to root route /
     * if title or description are missing it will notify user
     * if api request failed it will redirect to error page
     */
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


        let status = null;
        let responseobj = await fetch('http://localhost:5000/api/courses', options)
            .then(response => {
                status = response.status;
                if(response.status === 201){
                    console.log('successful course creation occurred');
                    this.props.history.push('/');
                    return null;
                } else {
                    return response.json();
                }

            }).catch(err => {
                console.log("api request failed");
                this.props.history.push('/error');
            });
            
            
        if(responseobj) {
            if(responseobj.error.message){
                console.log("error occurred during course creation");
                if(typeof responseobj.error.message === 'string'){
                    this.setState({
                        valError: true,
                        errorMsg: responseobj.error.message,
                        errorIsString: true
                    });
                } else {
                    this.setState({
                        valError: true,
                        errorMsg: responseobj.error.message,
                        errorIsString: false
                    });
                }
                
                
            }
        } 

        
        if(status === 500) {
            this.props.history.push('/error');
        }
    }


    /***
     * renders form for course creation
     * displays input fields for course title, and estimated time
     * displays textareas for course description and materials needed
     * renders button for form submission named 'update' 
     * renders button to cancel course creation that will redirect user to route route /
     */
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