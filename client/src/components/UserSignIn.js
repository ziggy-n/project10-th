import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MyContext }  from './Context';
import ValidationError from './ValidationError';

class UserSignIn extends Component {

    constructor(props){
        super(props);
        this.state = {
            valError: false,
            errorMsg: null,
            errorIsString: false
        }
    }


    emailAddressInput = React.createRef();
    passwordInput = React.createRef();

    handleCancel = (event) => {
        event.preventDefault();

    } 

    handleSubmit = async (event) => {
        event.preventDefault();

        console.log("inside handlesubmit usersignin");
        console.log(this.props.location);

        const { from } = this.props.location.state || { from: { pathname: '/'}};

        const data = {
            emailAddress:  this.emailAddressInput.current.value,
            password:  this.passwordInput.current.value,
        }

        if(data.emailAddress === "" && data.password === ""){
            this.setState({
                valError: true,
                errorMsg: "Access Denied",
                errorIsString: true
            })
            return null;
        }

        await this.context.actions.signIn(data);

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
            this.props.history.push(from);
        }
        
    }

    render(){

        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <ValidationError 
                            valError={this.state.valError}
                            errorMsg={this.state.errorMsg}
                            errorIsString={this.state.errorIsString}
                        />
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" ref={this.emailAddressInput} />
                            </div>
                            <div>
                                <input id="password" name="password" type="password" placeholder="Password" ref={this.passwordInput} />
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign In</button>
                                <Link to='/'> 
                                    <button className="button button-secondary">Cancel</button>
                                </Link>    
                            </div>
                        </form>
                    </div>
                    <p></p>
                    <p>
                        "Don't have a user account? "
                        <Link to="/signup">Click here</Link>
                        " to sign up!"
                    </p>
                </div>
            </div>

        );
    }
}

UserSignIn.contextType = MyContext;

export default UserSignIn;