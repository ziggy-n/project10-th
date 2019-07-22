import React, {Component} from 'react';
import Cookies from 'js-cookie';

const MyContext = React.createContext();

class Provider extends Component {

    constructor(){
        super();
        this.state = {
            currentAuthUserEmail: Cookies.getJSON('currentAuthUserEmail') || null,
            currentAuthUserFirstName: Cookies.getJSON('currentAuthUserFirstName') || null,
            currentAuthUserLastName: Cookies.getJSON('currentAuthUserLastName') || null
        }
    }

    render(){
        const { currentAuthUser } = this.state; 
        const value = {
            currentAuthUserEmail: this.state.currentAuthUserEmail,
            currentAuthUserFirstName: this.state.currentAuthUserFirstName,
            currentAuthUserLastName: this.state.currentAuthUserLastName,
            actions: {
                signUp: this.signUp,
                signIn: this.signIn
            }
        };

        return(
            <MyContext.Provider value={value}>
                {this.props.children}
            </MyContext.Provider>
        );
    }

    // creates new user entry in data base
    // if sign up is successful, sets new user as authenticated user
    signUp = async (data)  => {
        console.log("signup function");

        const response = await fetch('http://localhost:5000/api/users', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json; charset=utf-8',},
            body: JSON.stringify(data)
        });
        
        if(response.status === 201){
            console.log('successful sign up occurred');
            this.setState({
                currentAuthUserEmail: data.emailAddress,
                currentAuthUserFirstName: data.firstName,
                currentAuthUserLastName: data.lastName
              })
        } else {
            console.log('error occurred posting user');
        }
 
    }


    signIn = async (data)  => {
        console.log("signin function");

        // set options
        const options = {
            method: 'GET',
            headers: {'Content-Type': 'application/json; charset=utf-8',},
            body: null
        }

        // dealing with credentials
        const encodedCredentials = btoa(`${data.emailAddress}:${data.password}`);
        options.headers['Authorization'] = `Basic ${encodedCredentials}`;


        // check if email matches password
        const response = await fetch('http://localhost:5000/api/users', options);
        
        if(response.status === 200){
            const anw = response.json();
            console.dir(anw);
            anw.then((obj) => {
                this.setState({
                    currentAuthUserEmail: obj.emailAddress,
                    currentAuthUserFirstName: obj.firstName,
                    currentAuthUserLastName: obj.lastName
                });
                Cookies.set('currentAuthUserEmail', JSON.stringify(obj.emailAddress), { expires: 1 });
                Cookies.set('currentAuthUserFirstName', JSON.stringify(obj.firstName), { expires: 1 });
                Cookies.set('currentAuthUserLastName', JSON.stringify(obj.lastName), { expires: 1 });
            });
            
            console.log('successful sign in occurred');
        } else {
            console.log('error occurred authenticating user');
        }
 
    }


}

const Consumer = MyContext.Consumer;

function withContext(Component){
    return function ContextComponent(props){
        return(
            <MyContext.Consumer>
                {context => <Component {...props} context={context} />}
            </MyContext.Consumer>
        );
        
    }
}

export {
    Provider,
    MyContext,
    withContext
}