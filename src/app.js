/**
 * 
 * 应用入口
 * @moidfy 2017/7/23
 * @author yellow date 2017/7/23
 * 
 * 可在后期加入
 * -PureComponent
 * -shouldComponentUpdate
 * -Immutable
 * 
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
//1.引入store
import store, { history } from 'STORE'
//2.引入route
import routes from 'ROUTE'
//3.引入assets文件夹下的 icon，css等资源文件

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} children={routes} />
    </Provider>,
    MOUNT_NODE
);