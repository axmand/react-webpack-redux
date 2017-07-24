/**
 * 
 * 页面布局基页
 * @author yellow date 2017/7/23
 * 
 */

import React from 'react';
import { Link } from 'react-router';

//前置存在login登录页，此页作为第二页
const MainView = ({ children, location }) => (
    <div>
        <Link
            className="btn btn-default btn-lg btn-block"
            to="/msg/add">
            添加消息
        <span className="glyphicon glyphicon-plus"></span>
        </Link>
    </div>
);

export default MainView;