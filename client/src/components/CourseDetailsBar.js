import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MyContext }  from './Context';


class CourseDetailsBar extends Component {
    
    handleUpdate = (event) => {
        event.preventDefault();
        this.context.actions.setFrom(`/index/${this.props.courseId}`);
        this.props.history.push(`/update_${this.props.courseId}`);
    }

    handleDelete = (event) => {
        event.preventDefault();
        this.props.requestDelete();
    }

    render(){
        if(this.props.askDelete){
            return(
                <React.Fragment></React.Fragment>
            );
        } else {
            return(
                <div className="grid-100">
                    <span>
                        <Link className="button" to="" onClick={this.handleUpdate}>Update Course</Link>
                        <button className="button" onClick={this.handleDelete}>Delete Course</button>
                    </span>
                    <Link className="button button--secondary" to="/index">Return to List</Link>
                </div>
            );
        }
        
    }
}

CourseDetailsBar.contextType = MyContext;

export default CourseDetailsBar;