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
            errorMessage: Cookies.getJSON('errorMessage') || null,
            errorIsString: Cookies.getJSON('errorIsString') || null,
        }
        // this.signIn = this.signIn.bind(this);
        // this.signOut = this.signOut.bind(this);
        // this.signUp = this.signUp.bind(this);
    }

    render(){
        const value = {
            currentAuthUserEmail: this.state.currentAuthUserEmail,
            currentAuthUserFirstName: this.state.currentAuthUserFirstName,
            currentAuthUserLastName: this.state.currentAuthUserLastName,
            currentAuthUserPassword: this.state.currentAuthUserPassword,
            currentAuthUserId: this.state.currentAuthUserId,
            errorMessage: this.state.errorMessage,
            errorIsString: this.state.errorIsString,
            actions: {
                signUp: this.signUp,
                signIn: this.signIn,
                signOut: this.signOut
            }
        };

        return(
            <MyContext.Provider value={value}>
                {this.props.children}
            </MyContext.Provider>
        );
    }


    // creates new user entry in database
    // if sign up is successful, sets new user as authenticated user
    signUp = async (userData)  => {
        console.log("signup function");

        const bodyOfData = {};

        if(userData.firstName){
            bodyOfData.firstName = userData.firstName;
        } 

        if(userData.lastName){
            bodyOfData.lastName = userData.lastName;
        }

        if(userData.emailAddress){
            bodyOfData.emailAddress = userData.emailAddress;
        }

        if(userData.password){
            bodyOfData.password = userData.password;
        }   
        

        let responseobj = null;
        await fetch('http://localhost:5000/api/users', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json; charset=utf-8',},
            body: JSON.stringify(bodyOfData)
        }).then(response => {
            responseobj = response;
            return response.json();
        }).then(data => {
            if(responseobj.status === 201){
                this.setState({
                    currentAuthUserEmail: userData.emailAddress,
                    currentAuthUserFirstName: data.firstName,
                    currentAuthUserLastName: data.lastName,
                    currentAuthUserPassword: userData.password,
                    currentAuthUserId: data.id,
                    errorMessage: null,
                    errorIsString: null
                });
                Cookies.set('currentAuthUserEmail', JSON.stringify(userData.emailAddress), { expires: 1 });
                Cookies.set('currentAuthUserFirstName', JSON.stringify(data.firstName), { expires: 1 });
                Cookies.set('currentAuthUserLastName', JSON.stringify(data.lastName), { expires: 1 });
                Cookies.set('currentAuthUserPassword', JSON.stringify(userData.password), { expires: 1 });
                Cookies.set('currentAuthUserId', JSON.stringify(data.id), { expires: 1 });
                Cookies.remove('errorMessage');
                Cookies.remove('errorIsString');

                console.log('successful sign up occurred');
            } else {
                console.log("error occurred signing up");
                if(typeof data.error.message === 'string'){
                    this.setState({
                        errorMessage: data.error.message,
                        errorIsString: true
                    });
                    Cookies.set('errorIsString', JSON.stringify(true), { expires: 1 });
                } else {
                    this.setState({
                        errorMessage: data.error.message,
                        errorIsString: false
                    });
                    Cookies.set('errorIsString', JSON.stringify(false), { expires: 1 });
                }
                
                Cookies.set('errorMessage', JSON.stringify(data.error.message), { expires: 1 });
            }
        }).catch(err => {
            console.log("api request failed");
            this.setState({
                errorMessage: "api request failed"
            });
            Cookies.set('errorMessage', JSON.stringify("api request failed"), { expires: 1 });
            Cookies.set('errorIsString', JSON.stringify(true), { expires: 1 });
        });

    }


    signIn = async (userData)  => {
        console.log("signin function");

        // set options
        const options = {
            method: 'GET',
            headers: {'Content-Type': 'application/json; charset=utf-8',},
            body: null
        }

        // dealing with credentials
        const encodedCredentials = btoa(`${userData.emailAddress}:${userData.password}`);
        options.headers['Authorization'] = `Basic ${encodedCredentials}`;


        // 
        let responseobj = null;
        await fetch('http://localhost:5000/api/users', options)
            .then(response => {
                responseobj = response;
                return response.json();
            }).then(data => {
                if(responseobj.status === 200){
                    this.setState({
                        currentAuthUserEmail: userData.emailAddress,
                        currentAuthUserFirstName: data.firstName,
                        currentAuthUserLastName: data.lastName,
                        currentAuthUserPassword: userData.password,
                        currentAuthUserId: data.id,
                        errorMessage: null,
                        errorIsString: false
                    });
                    Cookies.set('currentAuthUserEmail', JSON.stringify(userData.emailAddress), { expires: 1 });
                    Cookies.set('currentAuthUserFirstName', JSON.stringify(data.firstName), { expires: 1 });
                    Cookies.set('currentAuthUserLastName', JSON.stringify(data.lastName), { expires: 1 });
                    Cookies.set('currentAuthUserPassword', JSON.stringify(userData.password), { expires: 1 });
                    Cookies.set('currentAuthUserId', JSON.stringify(data.id), { expires: 1 });
                    Cookies.remove('errorMessage');
                    Cookies.remove('errorIsString');

                    console.log('successful sign in occurred');
                } else {
                    console.log("error occurred signing in");
                    if(typeof data.error.message === 'string'){
                        this.setState({
                            errorMessage: data.error.message,
                            errorIsString: true
                        });
                        Cookies.set('errorIsString', JSON.stringify(true), { expires: 1 });
                    } else {
                        this.setState({
                            errorMessage: data.error.message,
                            errorIsString: false
                        });
                        Cookies.set('errorIsString', JSON.stringify(false), { expires: 1 });
                    }
                    
                    Cookies.set('errorMessage', JSON.stringify(data.error.message), { expires: 1 });
                }
            }).catch(err => {
                console.log("api request failed");
                this.setState({
                    errorMessage: "api request failed",
                    errorIsString: true
                });
                Cookies.set('errorMessage', JSON.stringify("api request failed"), { expires: 1 });
                Cookies.set('errorIsString', JSON.stringify(true), { expires: 1 });
            });
 
    }

    signOut = async () => {
        console.log("signout function");
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
        console.log("successful sign out occurred");
        return null;
    }


}

const Consumer = MyContext.Consumer;

export {
    Provider,
    Consumer,
    MyContext
}


// signUp = async (data)  => {
//     console.log("signup function");

//     const response = await fetch('http://localhost:5000/api/users', {
//         method: 'POST', 
//         headers: {'Content-Type': 'application/json; charset=utf-8',},
//         body: JSON.stringify(data)
//     });

//     console.log("how a response looks like: ");
//     console.dir(response);

//     if(response.status === 201){
//         const responseobj = response.json();

//         responseobj.then((obj) => {
//             this.setState({
//                 currentAuthUserEmail: data.emailAddress,
//                 currentAuthUserFirstName: obj.firstName,
//                 currentAuthUserLastName: obj.lastName,
//                 currentAuthUserPassword: data.password,
//                 currentAuthUserId: obj.id,
//             });
//             Cookies.set('currentAuthUserEmail', JSON.stringify(data.emailAddress), { expires: 1 });
//             Cookies.set('currentAuthUserFirstName', JSON.stringify(obj.firstName), { expires: 1 });
//             Cookies.set('currentAuthUserLastName', JSON.stringify(obj.lastName), { expires: 1 });
//             Cookies.set('currentAuthUserPassword', JSON.stringify(data.password), { expires: 1 });
//             Cookies.set('currentAuthUserId', JSON.stringify(obj.id), { expires: 1 });
//         });

//         console.log('successful sign up occurred');
//         return null;
//     } else {
//         console.log('error occurred posting user');
//         //dealWithError();
//         let errorMsg = response.json();
//         console.log(errorMsg);
//         return null;
//     }

// }



// signIn = async (data)  => {
//     console.log("signin function");

//     // set options
//     const options = {
//         method: 'GET',
//         headers: {'Content-Type': 'application/json; charset=utf-8',},
//         body: null
//     }

//     // dealing with credentials
//     const encodedCredentials = btoa(`${data.emailAddress}:${data.password}`);
//     options.headers['Authorization'] = `Basic ${encodedCredentials}`;


//     // check if email matches password
//     let response = await fetch('http://localhost:5000/api/users', options);
    
//     if(response.status === 200){
//         const responseobj = response.json();
//         console.dir(responseobj);
//         responseobj.then((obj) => {
//             this.setState({
//                 currentAuthUserEmail: data.emailAddress,
//                 currentAuthUserFirstName: obj.firstName,
//                 currentAuthUserLastName: obj.lastName,
//                 currentAuthUserPassword: data.password,
//                 currentAuthUserId: obj.id,
//             });
//             Cookies.set('currentAuthUserEmail', JSON.stringify(data.emailAddress), { expires: 1 });
//             Cookies.set('currentAuthUserFirstName', JSON.stringify(obj.firstName), { expires: 1 });
//             Cookies.set('currentAuthUserLastName', JSON.stringify(obj.lastName), { expires: 1 });
//             Cookies.set('currentAuthUserPassword', JSON.stringify(data.password), { expires: 1 });
//             Cookies.set('currentAuthUserId', JSON.stringify(obj.id), { expires: 1 });
//         });
        
//         console.log('successful sign in occurred');
//         return null;
//     } else {
//         console.log('error occurred authenticating user');
//         return null;
//     }

// }