import React, { Component } from 'react';

class ValidationError extends Component {

    

    render(){
        console.log("in validation error component: ");

        if(this.props.valError){
            let errors = this.props.errorMsg;
            let errorListing = [];
            if(typeof errors === 'string'){
                console.log("validation error. string. :" + errors);
                errorListing = <li>{errors}</li>;
            } else { 
                console.log("validation error. array. :" + errors);
                for(let i = 0; i < errors.length; i++){
                    errorListing.push(<li key={i}>{errors[i]}</li>)
                }
                console.dir(errorListing);
            }
            console.log("validation error should appear");
            return(
                <div>
                    <h2 className="validation--errors--label">Validation Errors</h2>
                    <div className="validation--errors">
                        <ul>
                            {errorListing}
                        </ul> 
                    </div>
                    <hr></hr>
                </div>
            );
        } else {
            console.log("no validation errors");
            return(
                <React.Fragment></React.Fragment>
            );
        }
    }

}

export default ValidationError;
