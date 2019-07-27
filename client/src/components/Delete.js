import React, {Component} from 'react';

class Delete extends Component {

    handleNo = (event) => {
        event.preventDefault();
        this.props.declineDelete();
    }

    handleYes = (event) => {
        event.preventDefault();
        this.props.acceptDelete();
    }

    // Delete component is only rendered if course owner asked for the course to be deleted
    // renders "yes" button which deletes the course
    // renders "no" button which redirects back to the root route /
    render(){
        if(this.props.askDelete){
            return(
                <div className="grid-100">
                    <span>
                        <h3>Are you sure you want to delete the course "{this.props.title}"?</h3>
                        <button className="button" onClick={this.handleYes}>Yes</button>
                        <button className="button" onClick={this.handleNo}>No</button>
                    </span>
                </div>
            );
        } else {
            return(
                <React.Fragment>

                </React.Fragment>
            );
        }
        
    }
}

export default Delete;
