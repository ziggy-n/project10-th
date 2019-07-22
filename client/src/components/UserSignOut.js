import React from 'react';
import { MyContext } from './Context';

const signout = () => {
    console.log("in signout");
    //{() => signout}
}

const UserSignOut = (props) => {

    return(
            <MyContext.Consumer>
                {context => (
                    <React.Fragment>
                        
                    </React.Fragment>
                )}
            </MyContext.Consumer>
    );
}

export default UserSignOut;