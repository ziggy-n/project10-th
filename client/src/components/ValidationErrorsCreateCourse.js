import React from 'react';

const ValidationErrorsCreateCourse = (props) => {

    const valErrors = true;
    
    if(valErrors){
        return(
            <div>
                <h2 className="validation--errors--label">Validation Errors</h2>
                <div className="validation--errors">
                    <ul>
                        
                    </ul>
                </div>
            </div>
        );
    } else {
        return(
            <div>

            </div>
        );
    }
    
}

export default ValidationErrorsCreateCourse;
