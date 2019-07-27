import React, { Component } from 'react';
import { MyContext }  from './Context';
import Delete from  './Delete';
import CourseDetailsBar from './CourseDetailsBar';
import { Redirect } from 'react-router-dom';


class CourseDetails extends Component {

    constructor(props){
        super(props);
        this.state = {
          courseDetails: {},
          ownerDetails: {},
          askDelete: false, 
          notOwner: true
        }
    }
    
    async componentDidMount(){

        let id = this.props.match.params.val;
        let course = null;
        let owner = null;
        
        let status = null;
        let errorMessage = null;

        await fetch(`http://localhost:5000/api/courses/${id}`
            ).then(function(response){
                status = response.status;
                return response.json();
            }).then(function(data){
                if(status === 200){
                    owner = data.owner;
                    course = data.course;
                } else {
                    errorMessage = data.error.message;
                }
                
            }).catch(function(err){
                console.log('error occurred fetching course details');
            });

        if(status === 500){
            this.props.history.push('/error');
            return null;
        }
        
        if(status === 400 && errorMessage === 'No such course exists'){
            this.props.location.push('/notfound');
            return null;
        }

        this.setState({
            courseDetails: course,
            ownerDetails: owner
        });

        if(this.state.ownerDetails.emailAddress === this.context.currentAuthUserEmail){
            this.setState(
                {notOwner: false}
            )
        }

        

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
            if(response.status === 500) {
                this.props.history.push('/error');
            }
            console.log("error occurred when deleting course");
        }
        
    }

    structureText = (text) => {
        let str = String(text);
        let array = [];
        let i = 0;
        let wordBeginning = 0;
        let wordEnd = 0;
        while(i < str.length){
            if(str.charAt(i) === "\n"){
                wordEnd = i; 
                array.push(str.substring(wordBeginning, wordEnd));
                wordBeginning = i + 1;
                wordEnd = i + 1;
            }
            i++;
        }
        array.push(str.substring(wordBeginning, str.length ));
        return array;
    }


    // make react component for materialsNeeded
    render(){
        console.log("inside course detail render");
        
        let objOwner = this.state.ownerDetails;
        let objCourse = this.state.courseDetails;

        let materialsArray = this.structureText(this.state.courseDetails.materialsNeeded);
        let descriptionArray = this.structureText(this.state.courseDetails.description);


        let materials = [];
        let description = [];
        if(materialsArray.length !== 1 || materialsArray[0] !== ""){
            for(let i = 0; i < materialsArray.length; i++){
                materials.push( <li key={i}> {materialsArray[i]} </li>);
            }
        } 

        if(descriptionArray.length !== 1 || descriptionArray[0] !== ""){
            for(let i = 0; i < descriptionArray.length; i++){
                description.push( <p key={i}> {descriptionArray[i]} </p>);
            }
        } 
        
               

        if(! this.state.courseDetails){
            this.render(
                <React.Fragment>
                    <Redirect to={{
                        pathname: '/forbidden',
                        state: {from: this.props.location}
                        }
                    } />
                </React.Fragment>
            );
            
        } else {
            return(
                <div>
                    <div className="actions--bar">
                        <div className="bounds">
                            <CourseDetailsBar 
                                askDelete={this.state.askDelete}
                                requestDelete={this.requestDelete}
                                courseId={this.props.match.params.val}
                                notOwner={this.state.notOwner}
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
                                {description}
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
                                               {materials}
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
}

CourseDetails.contextType = MyContext;

export default  CourseDetails;

