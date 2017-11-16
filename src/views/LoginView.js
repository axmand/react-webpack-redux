
/**
 * 登录界面view
 */
import Login from '../components/login/Login';

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from "react-redux";

//前置存在login登录页，此页作为第二页
class LoginView extends Component {

  render() {
    const {
      username,
      password,
    } = this.props;

    return (
      <Login username={username} password={password}/>
    )
  }
}

LoginView.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const loginState = state.loginReduce;
  return {
    username: loginState.username,
    password: loginState.password,
  };
};

export default connect(mapStateToProps, null)(LoginView)