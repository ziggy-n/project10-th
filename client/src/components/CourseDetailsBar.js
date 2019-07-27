import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MyContext }  from './Context';


class CourseDetailsBar extends Component {


    handleDelete = (event) => {
        event.preventDefault();
        this.props.requestDelete();
    }

    /***
     * does not render when there is a request to delete
     * renders only "return to list" button if the owner of the course is not the currently authenticated user
     * renders "return to list", "delete", "update" buttons if owner is the currently authenticated user
     */
    render(){
        if(this.props.askDelete){
            return(
                <React.Fragment></React.Fragment>
            );
        } else if (this.props.notOwner) {
            return(
                <div className="grid-100">
                    <Link className="button button--secondary" to="/">Return to List</Link>
                </div>
            );
        } else {
            return(
                <div className="grid-100">
                    <span>
                        <Link className="button" to={`/courses/${this.props.courseId}/update`}>Update Course</Link>
                        <button className="button" onClick={this.handleDelete}>Delete Course</button>
                    </span>
                    <Link className="button button--secondary" to="/">Return to List</Link>
                </div>
            );
        }
        
    }
}

CourseDetailsBar.contextType = MyContext;

export default CourseDetailsBar;