import React, { Component } from 'react';
import { MyContext } from './Context';
import { Link } from 'react-router-dom';

class UpdateCourse extends Component {

    constructor(props){
        super(props);

        this.state = {
          ownerFirstName: null,
          ownerLastName: null,
          courseTitle: "",
          courseDescription: "",
          courseEstimatedTime: "",
          courseMaterialsNeeded: "",
          courseId: null
        }
    }
    

    async componentDidMount(){

        let id = this.props.match.params.val;
        let course = null;
        let owner = null;
        
        this.setState({
            courseId: id
        })

        await fetch(`http://localhost:5000/api/courses/${id}`
            ).then(function(response){
                return response.json();
            }).then(function(data){
                owner = data.owner;
                course = data.course;
            }).catch(function(err){
                console.log('error occurred fetching course details');
            });

        console.log("course here: ");
        console.dir(course);
        console.dir(owner);
        this.setState({
            ownerFirstName: owner.firstName || "",
            ownerLastName: owner.lastname || "",
            courseTitle: course.title || "Course title...",
            courseDescription: course.description || "Course description...",
            courseEstimatedTime: course.estimatedTime || "Hours",
            courseMaterialsNeeded: course.materialsNeeded || "List materials"
        });
    }


    handleChangeTitle = (event) => {
        event.preventDefault();
        this.setState({
            courseTitle: event.target.value
        });
    }

    handleChangeDescription = (event) => {
        event.preventDefault();
        this.setState({
            courseDescription: event.target.value
        });
    }

    handleChangeEstimatedTime = (event) => {
        event.preventDefault();
        this.setState({
            courseEstimatedTime: event.target.value
        });
    }

    handleChangeMaterialsNeeded = (event) => {
        event.preventDefault();
        this.setState({
            courseMaterialsNeeded: event.target.value
        });
    }


    handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            title: this.state.courseTitle,
            description: this.state.courseDescription,
            estimatedTime: this.state.courseEstimatedTime,
            materialsNeeded: this.state.courseMaterialsNeeded,
            userId: this.context.currentAuthUserId
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


        // 
        const response = await fetch(`http://localhost:5000/api/courses/${this.state.courseId}`, options);

        if(response.status === 204){
            console.log("course successfully updated");
            this.props.history.push(`/courses/${this.state.courseId}`);
        } else {
            console.log("error occurred while creating new course");
        }
    }



    render() {
        console.log("inside update course render");

        return(
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input id="title" name="title" type="text" className="input-title course--title--input" value={this.state.courseTitle} onChange={this.handleChangeTitle} />
                                </div>
                                <p>By {this.state.ownerFirstName} {this.state.ownerLastName}</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea id="description" name="description" value={this.state.courseDescription} onChange={this.handleChangeDescription} />
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--lists--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" value={this.state.courseEstimatedTime} onChange={this.handleChangeEstimatedTime}  />
                                        </div>
                                    </li>
                                    <li className="course--stats--lists--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea id="materialsNeeded" name="materialsNeeded" value={this.state.courseMaterialsNeeded} onChange={this.handleChangeMaterialsNeeded}  />
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