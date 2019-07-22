import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import UserSignOut from './UserSignOut';


class Courses extends Component {

    constructor(props){
        super(props);
        this.state = {
          courseList: []
        }
    }
    
    async componentDidMount(){
        let courses = null;
        await fetch('http://localhost:5000/api/courses'
            ).then(function(response){
                return response.json();
            }).then(function(data){
                console.log(data);
                courses = data;
            }).catch(function(err){
                console.log('error occurred fetching courses');
            });

        console.log("courses here: ");
        console.dir(courses);
        this.setState({
            courseList: courses
        });
    }


    render(){
        let array = this.state.courseList;
        console.log("console logging array of courses");
        console.log(array);
        let rows = [];
        for(let i = 0; i < array.length; i++){
            rows.push( 
                <div className="grid-33" key={i}> 
                    <Link to={`/courses/${array[i].id}`} className="course--module course--link" >
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{array[i].title}</h3>
                    </Link>
                </div>);
        }
        return(
            <div className="bounds">
                <UserSignOut />
                {rows}
                <div className="grid-33"> 
                    <Link to={'/courses/create'} className="course--module course--add--module" >
                        <h3 className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                            </svg>
                            New Course
                        </h3>
                    </Link>
                </div>
            </div>
        );
    }
}

export default  Courses;

