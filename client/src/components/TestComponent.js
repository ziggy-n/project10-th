import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from 'react-router-dom';

class TestComponent extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        userlist: []
      }
    }
  
    async componentDidMount(){
      console.log("beginning of TESTCOMPONENT");
      // get response body
      let users = null;
      await fetch('http://localhost:5000/test'
          ).then(function(response){
              return response.json();
          }).then(function(data){
              console.log(data);
              users = data;
          }).catch(function(err){
              console.log('error occurred in get users react part');
          });
  
      console.log("users here: ");
      console.dir(users);
      this.setState({
        userlist: users
      });
    }
  
    render(){
      let array = this.state.userlist;
      console.log("console logging array of users");
      console.log(array);
      let rows = [];
      for(let i = 0; i < array.length; i++){
        rows.push( <li> {array[i].firstName} </li>);
      }
  
      return(
        
        <Router>
          <div>
            <div>
              <ul>
                {rows}     
              </ul>
            </div>
          </div>
          
  
        </Router>
      );
    }
  }
  

export default TestComponent;