import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MyContext }  from './Context';
import ValidationError from './ValidationError';


class UserSignUp extends Component {

    constructor(props){
        super(props);
        this.state = {
            valError: false,
            errorMsg: null,
            errorIsString: false
        }
    }


    firstNameInput = React.createRef();
    lastNameInput = React.createRef();
    emailAddressInput = React.createRef();
    passwordInput = React.createRef();
    passwordConfirmationInput = React.createRef();

    
    // redirects to route route / when cancel is selected
    handleCancel = (event) => {
        event.preventDefault();
        this.props.history.push('/');

    } 

    /***
     * checks if password and password confirmation match
     * signs in user if input data is complete
     * if data is incomplete it updates state to capture this
     * if sign in is successful it will redirect to root route /
     */
    handleSubmit = async (event) => {
        event.preventDefault();

        if(this.passwordInput.current.value !== this.passwordConfirmationInput.current.value){
            this.setState({
                valError: true,
                errorMsg: "passwords don't match",
                errorIsString: true
            });
            return;
        }

        const data = {
            firstName: this.firstNameInput.current.value,
            lastName:  this.lastNameInput.current.value,
            emailAddress:  this.emailAddressInput.current.value,
            password:  this.passwordInput.current.value,
        }

        await this.context.actions.signUp(data);

        if(this.context.status === 500){
            this.props.history.push('/error');
        }


        if(this.context.errorMessage){
            this.setState({
                valError: true,
                errorMsg: this.context.errorMessage,
                errorIsString: this.context.errorIsString
            })
        } else {
            this.setState({
                valError: false,
                errorMsg: null,
                errorIsString: false
            })
            this.props.history.push('/');
        }
    }


    /***
     * renders sign up form
     * renders input field for first name, last name, email, password and password confirmation
     * displays validation errors if incorrect data was submitted: 
     *      displays message if any of the fields are not completed
     *      displays message if password and password confirmation are not a match
     * renders signup up button for form submission
     * displays cancel button which is a link that redirects to the root route / 
     */
    render(){
        return(
            <div className="bounds">
                
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <ValidationError 
                            valError={this.state.valError}
                            errorMsg={this.state.errorMsg}
                            errorIsString={this.state.errorIsString}
                        />
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
                                <Link to='/'> 
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

UserSignUp.contextType = MyContext;

export default UserSignUp;