
/**
 * 登录界面view
 */
import React, { Component } from 'react';
import Login from '../components/Login';
import { connect } from 'react-redux';
import {LOGINTODO} from '../redux/actions/ActionTypes';

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

const LoginView=connect(mapStateToProps,mapDispatchToProps)(Login);

//注入dispatch
export default LoginView;