import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MyContext }  from './Context';


class UserSignIn extends Component {


    emailAddressInput = React.createRef();
    passwordInput = React.createRef();

    handleCancel = (event) => {
        event.preventDefault();

    } 

    handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            emailAddress:  this.emailAddressInput.current.value,
            password:  this.passwordInput.current.value,
        }
        this.context.actions.signIn(data);
        this.props.history.push('/');
    }

    render(){
        // this.setState({
        //     from: this.props.location.state.from
        // });
        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" ref={this.emailAddressInput} />
                            </div>
                            <div>
                                <input id="password" name="password" type="password" placeholder="Password" ref={this.passwordInput} />
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign In</button>
                                <Link to='/index'> 
                                    <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
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