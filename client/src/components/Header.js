import React from 'react';


const Header = (props) => {

    return(
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav>
                    <span>Welcome </span>
                    <a className="signout" href="#">Sign Out</a>
                </nav>
            </div>
        </div>
    );
}

export default Header;
