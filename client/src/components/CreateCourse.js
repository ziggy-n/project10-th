import React, { Component } from 'react';
import { MyContext }  from './Context';
import ValidationErrorsCreateCourse from './ValidationErrorsCreateCourse';

class CreateCourse extends Component {

    titleInput = React.createRef();
    descriptionInput = React.createRef();
    estimatedTimeInput = React.createRef();
    materialsNeededInput = React.createRef();


    handleCancel = (event) => {
        event.preventDefault();

    }

    handleSubmit = (event) => {
        event.preventDefault();
    }


    render(){
        console.log("context stuff");
        console.log(this.context);
        
        return(
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    <ValidationErrorsCreateCourse />
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