import React, {Component} from 'react';
import Cookies from 'js-cookie';

const MyContext = React.createContext();

class Provider extends Component {

    constructor(){
        super();
        this.state = {
            currentAuthUserEmail: Cookies.getJSON('currentAuthUserEmail') || null,
            currentAuthUserFirstName: Cookies.getJSON('currentAuthUserFirstName') || null,
            currentAuthUserLastName: Cookies.getJSON('currentAuthUserLastName') || null,
            currentAuthUserPassword: Cookies.getJSON('currentAuthUserPassword') || null,
            currentAuthUserId: Cookies.getJSON('currentAuthUserId') || null,
            from: null
        }
    }

    render(){
        const { currentAuthUser } = this.state; 
        const value = {
            currentAuthUserEmail: this.state.currentAuthUserEmail,
            currentAuthUserFirstName: this.state.currentAuthUserFirstName,
            currentAuthUserLastName: this.state.currentAuthUserLastName,
            currentAuthUserPassword: this.state.currentAuthUserPassword,
            currentAuthUserId: this.state.currentAuthUserId,
            actions: {
                signUp: this.signUp,
                signIn: this.signIn,
                delete: this.delete,
                setFrom: this.setFrom
            }
        };

        return(
            <MyContext.Provider value={value}>
                {this.props.children}
            </MyContext.Provider>
        );
    }

    // remember page visited before current one
    setFrom = (x) => {
        this.setState(
            {from: x}
        )
    }

    //
    delete = async (course) => {

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
            const responseobj = response.json();

            responseobj.then((obj) => {
                this.setState({
                    currentAuthUserEmail: data.emailAddress,
                    currentAuthUserFirstName: obj.firstName,
                    currentAuthUserLastName: obj.lastName,
                    currentAuthUserPassword: data.password,
                    currentAuthUserId: obj.id
                });
                Cookies.set('currentAuthUserEmail', JSON.stringify(data.emailAddress), { expires: 1 });
                Cookies.set('currentAuthUserFirstName', JSON.stringify(obj.firstName), { expires: 1 });
                Cookies.set('currentAuthUserLastName', JSON.stringify(obj.lastName), { expires: 1 });
                Cookies.set('currentAuthUserPassword', JSON.stringify(data.password), { expires: 1 });
                Cookies.set('currentAuthUserId', JSON.stringify(obj.id), { expires: 1 });
            });

            console.log('successful sign up occurred');
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
            const responseobj = response.json();
            console.dir(responseobj);
            responseobj.then((obj) => {
                this.setState({
                    currentAuthUserEmail: data.emailAddress,
                    currentAuthUserFirstName: obj.firstName,
                    currentAuthUserLastName: obj.lastName,
                    currentAuthUserPassword: data.password,
                    currentAuthUserId: obj.id
                });
                Cookies.set('currentAuthUserEmail', JSON.stringify(data.emailAddress), { expires: 1 });
                Cookies.set('currentAuthUserFirstName', JSON.stringify(obj.firstName), { expires: 1 });
                Cookies.set('currentAuthUserLastName', JSON.stringify(obj.lastName), { expires: 1 });
                Cookies.set('currentAuthUserPassword', JSON.stringify(data.password), { expires: 1 });
                Cookies.set('currentAuthUserId', JSON.stringify(obj.id), { expires: 1 });
            });
            
            console.log('successful sign in occurred');
        } else {
            console.log('error occurred authenticating user');
        }
 
    }

    signOut = () => {
        this.setState({
            currentAuthUserEmail: null,
            currentAuthUserFirstName: null,
            currentAuthUserLastName: null,
            currentAuthUserPassword: null,
            currentAuthUserId: null,
        });
        Cookies.remove('currentAuthUserEmail');
        Cookies.remove('currentAuthUserFirstName');
        Cookies.remove('currentAuthUserLastName');
        Cookies.remove('currentAuthUserPassword');
        Cookies.remove('currentAuthUserId');
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