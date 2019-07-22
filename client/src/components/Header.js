import React from 'react';
import { MyContext } from './Context';

const Header = (props) => {
    console.log("header context props");
    console.log(props);
    return(
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                    <MyContext.Consumer>
                        {context => (
                            <nav>
                                <span>Welcome {context.currentAuthUserFirstName}</span>
                                <a className="signout" href="#">Sign Out</a>
                            </nav>
                        )}
                    </MyContext.Consumer>
            </div>
        </div>
    );
}

Header.contextType = MyContext;

export default Header;
