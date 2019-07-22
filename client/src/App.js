import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import { Provider } from './components/Context';

//import TestComponent from './components/TestComponent';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetail';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import CreateCourse from './components/CreateCourse';

//import { withContext } from './components/Context';
//const HeaderWithContext = withContext(Header);


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
            <Provider>
              <Header />
            </Provider>
            
          </div>
          <Switch>
            <Provider>
              <Route exact path="/signup" component={UserSignUp} /> 
              
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

              <Route path="/create-course" component={CreateCourse} /> 

            </Provider>
            
            
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;



