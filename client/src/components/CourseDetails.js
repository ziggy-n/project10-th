import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MyContext }  from './Context';
import Delete from  './Delete';
import CourseDetailsBar from './CourseDetailsBar';

class CourseDetails extends Component {

    constructor(props){
        super(props);
        this.state = {
          courseDetails: {},
          ownerDetails: {},
          askDelete: false
        }
    }
    
    async componentDidMount(){

        let id = this.props.match.params.val;
        let course = null;
        let owner = null;
        
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
            courseDetails: course,
            ownerDetails: owner
        });
    }


    declineDelete = () => {
        this.setState({
            askDelete: false
        })
    }

    requestDelete = () => {
        this.setState({
            askDelete: true
        })
    }

    acceptDelete = async () => {

        // set options
        const options = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json; charset=utf-8',},
            body: null
        }

        // dealing with credentials
        const encodedCredentials = btoa(`${this.context.currentAuthUserEmail}:${this.context.currentAuthUserPassword}`);
        options.headers['Authorization'] = `Basic ${encodedCredentials}`;


        // check if email matches password
        const response = await fetch(`http://localhost:5000/api/courses/${this.state.courseDetails.id}`, options);
 
        if(response.status === 204){
            // is it necessary if you redirect after this anyways? 
            this.setState({
                askDelete: false
            });
            console.log("deleted course successfully");
            this.props.history.push('/');
        } else {
            console.log("error occurred when deleting course");
        }
        
    }

    render(){
        console.log("inside course detail render")
        let objOwner = this.state.ownerDetails;
        let objCourse = this.state.courseDetails;

        //console.log("check course number");
        //console.log(this.props.match.params.val)

        // console.log("console logging course obj");
        // console.log(obj);
        // console.log("type of materials needed");
        // console.log(typeof obj.materialsNeeded);
        
        // parse materialsneeded from string to array
        // let string = obj.materialsNeeded;
        // let materialsArray = [];
        // let chunkStart = 1;
        // let chunkEnd = 1;
        // console.log(string);
        // console.dir(string);
        
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
                        <CourseDetailsBar 
                            askDelete={this.state.askDelete}
                            requestDelete={this.requestDelete}
                            courseId={this.props.match.params.val}
                        />
                        <Delete 
                            askDelete={this.state.askDelete} 
                            title={objCourse.title}
                            declineDelete={this.declineDelete}
                            acceptDelete={this.acceptDelete}
                        />
                    </div>
                </div>
                <div className="bounds course--details">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{objCourse.title}</h3>
                            <p>By {objOwner.firstName} {objOwner.lastName}</p>
                        </div>
                        <div className="course--description">
                            <p>{objCourse.description}</p>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <h3>{objCourse.estimatedTime}</h3>
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

CourseDetails.contextType = MyContext;

export default  CourseDetails;

