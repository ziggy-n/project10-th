import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MyContext }  from './Context';


class UserSignUp extends Component {

    constructor(props){
        super(props);
    }

    firstNameInput = React.createRef();
    lastNameInput = React.createRef();
    emailAddressInput = React.createRef();
    passwordInput = React.createRef();
    passwordConfirmationInput = React.createRef();

    
    handleCancel = (event) => {
        event.preventDefault();

    } 

    handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            firstName: this.firstNameInput.current.value,
            lastName:  this.lastNameInput.current.value,
            emailAddress:  this.emailAddressInput.current.value,
            password:  this.passwordInput.current.value,
            confirmPassword:  this.firstNameInput.current.value
        }
        this.context.actions.signUp(data);
        //event.currentTaget.reset();
    }


    render(){
        return(
            <div className="bounds">
                
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input id="firstName" name="firstName" type="text" placeholder="First Name"  ref={this.firstNameInput}/>
                            </div>
                            <div>
                                <input id="lastName" name="lastName" type="text" placeholder="Last Name"  ref={this.lastNameInput}/>
                            </div>
                            <div>
                                <input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" ref={this.emailAddressInput} />
                            </div>
                            <div>
                                <input id="password" name="password" type="password" placeholder="Password" ref={this.passwordInput} />
                            </div>
                            <div>
                                <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" ref={this.passwordConfirmationInput}/>
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit" >Sign Up</button>
                                <Link to='/index'> 
                                    <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
                                </Link>
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

UserSignUp.contextType = MyContext;

export default UserSignUp;