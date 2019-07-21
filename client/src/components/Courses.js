import React, {Component} from 'react';
import { Link } from 'react-router-dom';


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
                <div className="grid-33"> 
                    <Link to={`/index/${array[i].id}`} className="course--module course--link" onClick={() => this.props.setCourseSite(array[i].id)}>
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{array[i].title}</h3>
                    </Link>
                </div>);
        }
        return(
            <div className="bounds">
                {rows}
            </div>
        );
    }
}

export default  Courses;

