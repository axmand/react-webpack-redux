/**
 * login 登录组件
 * @author yellow date 2017/7/24
 * -由于此组件包含input,button。可以根据需要拆分组件
 * 
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import RootReducer from "../../redux/RootReducer";
import history from "../../redux/history";
import PropTypes from "prop-types";

import { withStyles } from "material-ui/styles";
import { FormGroup } from "material-ui/Form";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import IconButton from 'material-ui/IconButton';
import Typography from "material-ui/Typography";
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';

import appConfig from "../../redux/Config"
import WaitingModule from "../universe/WaitingModule"
import time from "../../utils/time"

const styles = theme => ({
  container: {
    width: "100%",
    height: `${window.innerHeight}px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  paper: {
    width: "360px",
    height: "280px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  textField: {
    width: "310px",
    margin: theme.spacing.unit,
  },
  iconButton: {
    position: "absolute",
    top: 0,
    right: 0
  },
  button: {
    width: "310px",
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 3,
  },
  buttonForgetPassword: {
    width: "70px",
    padding: "0px",
    margin: theme.spacing.unit
  },
  // navLink: {
  //   textDecoration: "none"
  // },
  formControl: {
    width: "310px",
    margin: theme.spacing.unit,
  },
});

class Login extends Component {

  state = {
    showPassword: false,
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { 
      classes,
      username,
      password,
      loginNotificaion,
      handleChange,
      onInitialAppState 
    } = this.props;

    return (
      <div className={classes.container}>
        <FormGroup>
          <Paper className={classes.paper}>
            <div>
              <Typography type="headline">用户登录</Typography>
            </div>
            <TextField
              id="username"
              label="用户名"
              className={classes.textField}
              margin="none"
              value={username}
              onChange={handleChange('username')}
            />

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={this.handleClickShowPasssword}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>{loginNotificaion}</FormHelperText>
            </FormControl>

            {/* <div
              style={{
                display: "flex",
                width: "310px",
                justifyContent: "flex-end"
              }}
            >
              <Button className={classes.buttonForgetPassword}>
                <Typography>忘记密码?</Typography>
              </Button>
            </div> */}

              <Button raised color="primary" className={classes.button} onClick={onInitialAppState}>
                <Typography type="title" style={{ color: "#FFF" }}>
                  登&nbsp;&nbsp;录
                </Typography>
              </Button>
          </Paper>
        </FormGroup>
        <WaitingModule />
      </div>
    );
  }
}
/**
 * 限定组件的一些属性
 */
Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const loginState = state.loginReduce;
  return {
    loginNotificaion: loginState.loginNotificaion,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onInitialAppState: () => {

      dispatch({
        type: "OPEN_WAITING_MODULE",
      });

      const LoginRequestURL = appConfig.affairsInterfaceRootPath + "/token";

      const LoginRequestDetails = {
        'grant_type': 'password',
        'username': ownProps.username,
        'password': ownProps.password,
      };
      let LoginRequesFormBodyPost = [];
      
      for (let property in LoginRequestDetails) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(LoginRequestDetails[property]);
        LoginRequesFormBodyPost.push(encodedKey + "=" + encodedValue);
      }
      
      const LoginRequestBodyPost = LoginRequesFormBodyPost.join("&");

      // console.log(LoginRequestBodyPost);

      fetch(LoginRequestURL, {
        method: "POST",
        mode: "cors",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: LoginRequestBodyPost
      })
        .then(response => {
          return response.json()
            .then(json => {
              if (response.ok) {
                return json
              } 
              else {
                return Promise.reject(json)
              }
            })
        })
        .then(json => {
          
          // console.log(json);

          dispatch({
            type: "CLOSE_WAITING_MODULE",
          });
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
              data: json,
            }
          });
          history.push('/mainview');
          
          fetch(appConfig.fileServiceRootPath + "//project/list")
            .then(response => response.json())
            .then(json => {
              dispatch({
                type: "handleContentShow",
                payload: json
              });
              //console.log(json);
            })
            .catch(e => console.log("Oops, error", e));
          
        })
        .catch(err => {

          console.log(err);

          dispatch({
            type: "CLOSE_WAITING_MODULE",
          });
          dispatch({
            type: "LOGIN_FAILURE",
            payload: {
              data: err,
            }
          });
        });
      
      // fetch(appConfig.fileServiceRootPath + "//project/list")
      //   .then(response => response.json())
      //   .then(json => {
      //     dispatch({
      //       type: "handleContentShow",
      //       payload: json
      //     });
      //     //console.log(json);
      //   })
      //   .catch(e => console.log("Oops, error", e));      
    },

    handleChange: props => event => {
      dispatch({
        type: "CHANGE_INPUT_VALUE_LOGIN",
        payload: {
          targetID: props,
          targetValue: event.target.value
        }
      });
    },


  };
};

//加入reducer
const loginReduce = (state = {
  username: '',
  password: '',
  loginNotificaion: '',
}, action) => {

  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    //登录认证操作
    case 'CHANGE_INPUT_VALUE_LOGIN':
      if (action.payload.targetID === 'username')
        newState.username = action.payload.targetValue; 
      if (action.payload.targetID === 'password')
        newState.password = action.payload.targetValue; 
      return {...state, ...newState}
    case 'LOGIN_SUCCESS':
      newState.loginNotificaion = "登陆成功！";
      const authenticationInfo = action.payload.data
      for (let key in authenticationInfo) {
        localStorage.setItem(key, authenticationInfo[key])        
      }
      if (localStorage.getItem('latestLoginTime') !== localStorage.getItem('currentLoginTime'))
        localStorage.setItem('latestLoginTime', localStorage.getItem('currentLoginTime'))
      localStorage.setItem('currentLoginTime', time.getNowFormatDate())
      
      return {...state, ...newState}
    case 'LOGIN_FAILURE':
      newState.loginNotificaion = action.payload.data.error_description;
      return {...state, ...newState}
    
    default:
      return state;
  }
  
};

RootReducer.merge(loginReduce);

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles, { name: "Login" })(Login)
);
