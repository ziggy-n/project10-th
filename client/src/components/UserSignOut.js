import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { MyContext } from './Context';


class UserSignOut extends Component {

    // signs out user
    componentDidMount(){
        this.context.actions.signOut();
    }

    // redirects to root route /
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

