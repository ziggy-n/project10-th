import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import { Provider } from './components/Context';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';

//import { withContext } from './components/Context';
//const HeaderWithContext = withContext(Header);


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }




  render(){

    return(
      <Router>
        <div id="root">
            <Provider>
              <Header />

              <Switch>

                <Route exact path="/signup" component={UserSignUp} /> 
                
                <Route exact path="/signin" render={ (props) => 
                  <UserSignIn
                    {...props}
                  /> } 
                />

                <Route exact path="/signout" render={ (props) => 
                  <UserSignOut
                    {...props}
                  /> } 
                />

                <Route exact path="/" render={ (props) => 
                  <Courses
                    {...props}
                  /> } 
                />

                <PrivateRoute exact path="/courses/create" component={CreateCourse} /> 


                <PrivateRoute path="/courses/:val/update" component={UpdateCourse}/>

                <Route path="/courses/:val" render={ (props) => 
                  <CourseDetails 
                    {...props}
                  /> } 
                />
    
                <Route component={NotFound} />

              </Switch>
          </Provider>
        </div>
      </Router>
    );
  }
}

export default App;



/*** 
 * 
 * 
***/