/**
 * login 登录组件
 * @author yellow date 2017/7/24
 * -由于此组件包含input,button。可以根据需要拆分组件
 * 
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import RootReducer from './../redux/reducers/RootReducer';
import { LOGIN_TODO } from './../redux/actions/ActionTypes';
import PropTypes from 'prop-types';

const Login = ({ onClick, complete, text }) => (
    <div>
        <input type='text'/>
        <input type='text'/>
        <button onClick={onClick} >登录</button>
    </div>
)
/**
 * 限定组件的一些属性
 */
Login.propTypes = {
    onClick: PropTypes.func.isRequired
}

//加入reducer
const loginReduce = (state = 0, action) => {
    if (action.type === LOGIN_TODO) {
        //登录认证操作
    }
    return state;
}

RootReducer.merge(loginReduce);

export default Login;