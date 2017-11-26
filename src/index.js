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
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import { createStore } from "redux";

//1.引入view
import LoginView from "./views/LoginView";
import MainView from "./views/MainView";
//2.引入route
//import store, { history } from 'STORE'
//3.引入assets文件夹下的 icon，css等资源文件
import RootReducer from "./redux/RootReducer";
import history from "./redux/history"
//4.引入reducer

// const initialState = Object.assign({},{
// 	sketchDisplayState: true,
// })

const store = createStore(RootReducer.combine(), {});
//5.doucment parent
const root = document.getElementById("root");
/**
 * 通过redux提供的provider,与Redux连接
 */
ReactDOM.render(
  <Provider store={store}>
    <Router basename="/">
      <div>
        <Route exact path="/" component={ MainView } />
        <Route path="/mainview" component={ MainView } />
      </div>
    </Router>
  </Provider>,
  root
);
