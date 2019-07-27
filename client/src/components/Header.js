import React from 'react';
import { MyContext } from './Context';
import { Link } from 'react-router-dom';

/***
 * renders bar with 'signup' and 'signin' links if there is no authenticated user
 * renders bar with 'signout' link and "Welcome FirstName LastName" if there is an authenticated user 
 */
const Header = (props) => {

    const currentpath = props.location;

    return(
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                    <MyContext.Consumer>
                        {context => (
                            <React.Fragment>
                                { context.currentAuthUserEmail ?
                                    <nav>
                                        <span>Welcome {context.currentAuthUserFirstName} {context.currentAuthUserLastName}!</span>
                                        <Link className="signout" to="/signout">Sign Out</Link>
                                    </nav>
                                    :
                                    <nav>
                                        <Link className="signup" to="/signup">Sign Up</Link>
                                        <Link className="signin" to={{ pathname: "/signin", state: {from: currentpath}}} >Sign In</Link>
                                    </nav>
                                }
                            </React.Fragment>
                            
                        )}
                    </MyContext.Consumer>
            </div>
        </div>
    );

    
}


export default Header;
