import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserSignUp extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <form>
                            <div>
                                <input id="firstName" name="firstName" type="text" placeholder="First Name"/>
                            </div>
                            <div>
                                <input id="lastName" name="lastName" type="text" placeholder="Last Name" />
                            </div>
                            <div>
                                <input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address"/>
                            </div>
                            <div>
                                <input id="password" name="password" type="password" placeholder="Password" />
                            </div>
                            <div>
                                <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" />
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign Up</button>
                                <Link to='/index'> 
                                    <button className="button button-secondary">Cancel</button>
                                </Link>
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

export default UserSignUp;