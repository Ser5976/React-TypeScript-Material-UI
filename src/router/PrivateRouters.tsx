//import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthReducerType } from '../store/reducers/userReducer';
import { RootStateType } from '../store/store';

// типизация
type MapStateToPropsType = { auth: AuthReducerType };

type PrivateRouteType = {
  component: React.ComponentType<any>;
  path: string;
};
type PropsType = MapStateToPropsType & PrivateRouteType;
//------------------------------------------------------

function PrivateRoute({ auth, component: Component, ...rest }: PropsType) {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.token || sessionStorage.getItem('token') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/auth', state: { from: props.location } }}
          />
        )
      }
    />
  );
}
const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    auth: state.users.auth,
  };
};
export default connect<
  MapStateToPropsType,
  unknown,
  PrivateRouteType,
  RootStateType
>(mapStateToProps)(PrivateRoute);
