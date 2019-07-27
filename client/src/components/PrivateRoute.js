import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';


// credit: I used the code (slightly adpated) from treehouse course unit "React Authentication"

/**
 * if there is an authenticated user, it will render the Component
 * if not, it will redirect to the 'forbidden' page
 */
export default ({ component: Component, ...rest }) => {
    return (
      <Consumer>
        { context => (
          <Route
            {...rest}
            render={props => context.currentAuthUserEmail ? 
              (
                <Component {...props} />
              ) : 
              (
                <Redirect to={{
                  pathname: '/forbidden',
                  state: {from: props.location}
                }
                } />
              )
            }
          />
        )}
      </Consumer>
    );
  };
