import React, { Component } from 'react';
import { MyContext } from './Context';
import { Link } from 'react-router-dom';
import ValidationError from './ValidationError';


class UpdateCourse extends Component {

    constructor(props){
        super(props);

        this.state = {
          ownerFirstName: null,
          ownerLastName: null,
          ownerId: null,
          
          courseId: null,  
          courseTitle: "",
          courseDescription: "",
          courseEstimatedTime: "",
          courseMaterialsNeeded: "",

          valError: false,
          errorMsg: null,
          errorIsString: false
        };
    }
    

    /***
     * fetches course data and data about the coure's owner from REST API and stores the data in state
     * if course not found it redirects to 'notfound' page
     * if error occurs it redirects to 'errors' page
     * if the currently authenticated user is not the owner of the course it redirect to the 'forbidden' page
     */
    async componentDidMount(){

        let id = this.props.match.params.val;
        let course = null;
        let owner = null;

        let status = null;
        await fetch(`http://localhost:5000/api/courses/${id}`
            ).then(function(response){
                status = response.status;
                return response.json();
            }).then(function(data){
                owner = data.owner;
                course = data.course;
            }).catch(function(err){  
                console.log('error occurred fetching course details');
                this.props.history.push('/error');
            });

        
        if(!course){
            this.props.history.push('/notfound');
            return null;
        }

        if(status === 500){
            this.props.history.push('/error');
            return null;
        }

        if(owner.id !== this.context.currentAuthUserId){
            this.props.history.push('/forbidden');
            return null;
        }

        this.setState({
            courseId: id,
            ownerFirstName: owner.firstName || "",
            ownerLastName: owner.lastname || "",
            ownerId: owner.id || null,
            courseTitle: course.title || "",
            courseDescription: course.description || "",
            courseEstimatedTime: course.estimatedTime || "",
            courseMaterialsNeeded: course.materialsNeeded || ""
        });

        
    }

    // sets state of course title according to the corresponding input field value
    handleChangeTitle = (event) => {
        event.preventDefault();
        this.setState({
            courseTitle: event.target.value
        });
    }

    // sets state of course description according to the corresponding input field value
    handleChangeDescription = (event) => {
        event.preventDefault();
        this.setState({
            courseDescription: event.target.value
        });
    }

    // sets state of course's estimated time according to the corresponding input field value
    handleChangeEstimatedTime = (event) => {
        event.preventDefault();
        this.setState({
            courseEstimatedTime: event.target.value
        });
    }

    // sets state of course's materials needed according to the corresponding input field value
    handleChangeMaterialsNeeded = (event) => {
        event.preventDefault();
        this.setState({
            courseMaterialsNeeded: event.target.value
        });
    }


    /***
     * takes course data stored in state and makes it the body of a http put request to the resp api
     * a successful requests updates the course and redirects to the "course details" page
     * if title or description are missing, it will denote this
     * if an error occurred during the api request, it will redirect to the 'error' page
     */
    handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            estimatedTime: this.state.courseEstimatedTime,
            materialsNeeded: this.state.courseMaterialsNeeded,
            userId: this.context.currentAuthUserId
        }

        if(this.state.courseTitle === ""){
            data.title = null;
        } else {
            data.title = this.state.courseTitle;
        }

        if(this.state.courseDescription === ""){
            data.description = null;
        } else {
            data.description = this.state.courseDescription
        }

        // set options
        const options = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(data)
        }

        // dealing with credentials
        const encodedCredentials = btoa(`${this.context.currentAuthUserEmail}:${this.context.currentAuthUserPassword}`);
        options.headers['Authorization'] = `Basic ${encodedCredentials}`;


        let status = null;
        let responseobj = await fetch(`http://localhost:5000/api/courses/${this.state.courseId}`, options)
        .then(response => {
            status = response.status;
            if(response.status === 204){
                console.log('successful course update occurred');              
                this.props.history.push(`/courses/${this.state.courseId}`);
                return null;
            } else {
                return response.json();
            }
        }).catch(err => {
            console.log("api request failed");
            this.props.history.push('/error');
        });

        if(responseobj){
            if(responseobj.error.message){
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

        if(status === 500){
            this.props.history.push('/error');
        }

    }


    /***
     * renders update course form
     * it renders input fields for course title and estimated time
     * it renders a textarea for the course description and materials needed
     * it renders with the current course data as values to the input field and textarea
     * if there is no estimated time in the current course data, the placeholder "Hours" appears
     * if there is no listed materials in the current course data, the placeholder "List materials ..." appears
     * it renders a submit button
     * it renders a cancel button which redirects to the 'course detail' page
     */
    render() {
            return(
                <div className="bounds course--detail">
                    <h1>Update Course</h1>
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
                                        <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={this.state.courseTitle} onChange={this.handleChangeTitle} />
                                    </div>
                                    <p>By {this.state.ownerFirstName} {this.state.ownerLastName}</p>
                                </div>
                                <div className="course--description">
                                    <div>
                                        <textarea id="description" name="description" placeholder="Course Description..." value={this.state.courseDescription} onChange={this.handleChangeDescription} />
                                    </div>
                                </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--lists--item">
                                            <h4>Estimated Time</h4>
                                            <div>
                                                <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" value={this.state.courseEstimatedTime} onChange={this.handleChangeEstimatedTime}  />
                                            </div>
                                        </li>
                                        <li className="course--stats--lists--item">
                                            <h4>Materials Needed</h4>
                                            <div>
                                                <textarea id="materialsNeeded" name="materialsNeeded" placeholder="List materials..." value={this.state.courseMaterialsNeeded} onChange={this.handleChangeMaterialsNeeded}  />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit" onClick={this.handleSubmit}>Update Course</button>
                                <Link className="button button-secondary" to={`/courses/${this.props.match.params.val}`}>Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            );

    }
}

UpdateCourse.contextType = MyContext;
export default UpdateCourse;