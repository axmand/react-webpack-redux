/**
 * login 登录组件
 * @author yellow date 2017/7/24
 * -由于此组件包含input,button。可以根据需要拆分组件
 * 
 */

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import RootReducer from "../../redux/RootReducer";
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
  navLink: {
    textDecoration: "none"
  },
  formControl: {
    width: "310px",
    margin: theme.spacing.unit,
  },
});

class Login extends Component {

  state = {
    showPassword: false,
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
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
              margin="dense"
              required={true}
              value={username}
            />

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={password}
                onChange={this.handleChange('password')}
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

            <NavLink className={classes.navLink} to="/mainview">
              <Button raised color="primary" className={classes.button} onClick={onInitialAppState}>
                <Typography type="title" style={{ color: "#FFF" }}>
                  登&nbsp;&nbsp;录
                </Typography>
              </Button>
            </NavLink>
          </Paper>
        </FormGroup>
      </div>
    );
  }
}
/**
 * 限定组件的一些属性
 */
Login.propTypes = {
  onChange: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const loginState = state.loginReduce;
  return {
    username: loginState.username,
    password: loginState.password,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitialAppState: () => {
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
    },
    handleChange: (inputID, event) => {
      dispatch({
        type: "CHANGE_INPUT_VALUE_LOGIN",
        payload: {
          targetID: inputID,
          targetValue: event.target.value
        }
      });
    }
  };
};

//加入reducer
const loginReduce = (state = {
  username: '',
  password: '',
}, action) => {
  if (action.type === "LOGIN_TODO") {
    //登录认证操作
  }
  return state;
};

RootReducer.merge(loginReduce);

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles, { name: "Login" })(Login)
);
