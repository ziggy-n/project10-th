import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class CourseDetails extends Component {

    constructor(props){
        super(props);
        this.state = {
          courseDetails: {},
        }
    }
    
    async componentDidMount(){
        let course = null;
        await fetch(`http://localhost:5000/api/courses/${this.props.courseId}`
            ).then(function(response){
                return response.json();
            }).then(function(data){
                course = data;
            }).catch(function(err){
                console.log('error occurred fetching course details');
            });

        console.log("course here: ");
        console.dir(course);
        this.setState({
            courseDetails: course
        });
    }



    render(){
        let obj = this.state.courseDetails;
        console.log("console logging course obj");
        console.log(obj);
        console.log("type of materials needed");
        console.log(typeof obj.materialsNeeded);
        
        // parse materialsneeded from string to array
        let string = obj.materialsNeeded;
        let materialsArray = [];
        let chunkStart = 1;
        let chunkEnd = 1;
        console.log(string);
        console.dir(string);
        
        //let temp = string.length;
        //console.log(string.length);

        // for(let i = 1; i < string.length; i++){
        //     while(string.charAt(i) !== "*" && i < string.length){
        //         i++;
        //     }
        //     if(string.charAt(i) !== "*"){
        //         chunkEnd = i-1;
        //         materialsArray.push(string.substring(chunkStart, chunkEnd));
        //         chunkStart = i + 1;
        //         chunkEnd = chunkStart;
        //     }
            
        // }

        // make react component for materialsNeeded
        // let materials = [];
        // for(let i = 0; i < materialsArray.length; i++){
        //     materials.push( <li> {materialsArray[i]} </li>);
        // }

        return(
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            <span>
                                <Link className="button" to="">Update Course</Link>
                                <Link className="button" to="">Delete Course</Link>
                            </span>
                            <Link className="button button--secondary" to="">Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--details">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{obj.title}</h3>
                            <p>By Course Owner (replace)</p>
                        </div>
                        <div className="course--description">
                            <p>{obj.description}</p>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <h3>{obj.estimatedTime}</h3>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <ul>
                                           
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default  CourseDetails;

