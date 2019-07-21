import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


//import TestComponent from './components/TestComponent';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetail';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';



class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      courseSite: 2
    }
  }

  
  setCourseSite = (id) => {
    this.setState({
      courseSite: id
    });
  }


  render(){

    return(
      <Router>
        <div className="root">
          <div>
            <Header />
          </div>
          <Switch>
            <Route exact path="/signup" render={ (props) => 
              <UserSignUp
                
                {...props}
              /> } 
            />
            <Route exact path="/signin" render={ (props) => 
              <UserSignIn

                {...props}
              /> } 
            />
            <Route exact path="/index" render={ (props) => 
              <Courses
                setCourseSite={this.setCourseSite}
                {...props}
              /> } 
            />
            <Route path="/index/:val" render={ (props) => 
              <CourseDetails 
                courseId={this.state.courseSite}
                {...props}
              /> } 
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;



