
/**
 * 登录界面view
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {LOGINTODO} from '../redux/actions/ActionTypes';
import Map from '../components/Map';
import Login from '../components/Login';

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(LOGINTODO(1111))
    }
  }
}

const LoginView=connect(mapStateToProps,mapDispatchToProps)(Map);

//注入dispatch
export default LoginView;