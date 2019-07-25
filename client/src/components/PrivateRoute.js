import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';


// used code from treehouse course unit 

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


