import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { MyContext } from './Context';
// I know this was supposed to be a stateless component but I ran into a billion and one  
// problems trying to keep it one. So I changed it. 

class UserSignOut extends Component {

    componentDidMount(){
        this.context.actions.signOut();
    }

    render() {
        return(
            <React.Fragment>
                <Redirect to={{
                  pathname: '/'
                }
                } />
            </React.Fragment>
        );
    }
}

UserSignOut.contextType = MyContext;

export default UserSignOut;

// const UserSignOut = (props) => {

//   return(
//     <Consumer>
//       { context => (
//         <Route
//           render={props => 
//               <Redirect to={{
//                 pathname: '/',
//                 state: {from: props.location}
//               }
//               } />
//           }
//         />
//       )}
//     </Consumer>
//   );
  
// }