/**
 * login 登录组件
 * @author yellow date 2017/7/24
 * -由于此组件包含input,button。可以根据需要拆分组件
 * 
 */

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import RootReducer from '../../redux/RootReducer'
// import PropTypes from 'prop-types'

import { withStyles, createStyleSheet } from 'material-ui/styles'
import { FormGroup } from 'material-ui/Form';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography'
import PasswordFeild from './PasswordField'

import { white } from 'material-ui/colors';

const styleSheet = createStyleSheet('Login', theme => ({
  container: {
    width: '100%',
    height: `${window.innerHeight}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  paper: {
    width: '360px',
    height: '280px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  textField: {
    width: '310px',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,    
  },
  iconButton: {
    position: 'absolute',
		top: 0,
		right: 0,
  },
  button: {
    width: '310px',
    margin: theme.spacing.unit,
  },
  buttonForgetPassword: {
    width: '70px',
    padding: '0px',
    margin: theme.spacing.unit,
  },
}));

class Login extends Component {

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.container}>
        <FormGroup>
          <Paper className={classes.paper}>
            <div>
              <Typography type='headline'>用户登录</Typography>
            </div>
            <TextField
              id="username"
              label="用户名"
              className={classes.textField}
              margin="dense"
              required={true}
            />
            <PasswordFeild />
            <div style={{display: 'flex', width: '310px', justifyContent: 'flex-end'}}>
              <Button className={classes.buttonForgetPassword}>
                <Typography>忘记密码?</Typography>
              </Button>
            </div>
            <NavLink to="/mainview">
              <Button raised color="primary" className={classes.button}>
                <Typography type='title' style={{color: '#FFF'}} >登&nbsp;&nbsp;录</Typography>
              </Button>
            </NavLink>
          </Paper> 
        </FormGroup>        
      </div>
    )
  }
  
}
/**
 * 限定组件的一些属性
 */
// Login.propTypes = {
//     onClick: PropTypes.func.isRequired
// }

//加入reducer
const loginReduce = (state = 0, action) => {
    if (action.type === 'LOGIN_TODO') {
        //登录认证操作
    }
    return state;
}

RootReducer.merge(loginReduce);

export default withStyles(styleSheet)(Login);