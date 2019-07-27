import React, { Component } from 'react';

class ValidationError extends Component {

    /***
     * renders validation errors if there are any
     * first it displays the title 'Validation' followed by a list of validation errors
     */
    render(){
        if(this.props.valError){
            let errors = this.props.errorMsg;
            let errorListing = [];
            
            if(this.props.errorIsString){
                errorListing.push(<li key={0}>{errors}</li>);
            } else { 
                for(let i = 0; i < errors.length; i++){
                    errorListing.push(<li key={i}>{errors[i]}</li>)
                }
            };
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
            return(
                <React.Fragment></React.Fragment>
            );
        }
    }

}

export default ValidationError;
