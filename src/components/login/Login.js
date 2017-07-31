/**
 * login 登录组件
 * @author yellow date 2017/7/24
 * -由于此组件包含input,button。可以根据需要拆分组件
 * 
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import RootReducer from '../../redux/RootReducer'
import PropTypes from 'prop-types'

import { withStyles, createStyleSheet } from 'material-ui/styles'
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import VisibilityIcon from 'material-ui-icons/Visibility'
import VisibilityOffIcon from 'material-ui-icons/VisibilityOff'
import ClearIcon from 'material-ui-icons/Clear';

import { blue } from 'material-ui/colors';

import PasswordFeild from './PasswordField'

const styleSheet = createStyleSheet('Login', theme => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
		height: '100%',
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
}));

class Login extends Component {

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.container}>
        <FormGroup>
          <Paper className={classes.paper}>
            <div style={{width: '310px'}}>
              <p>用户登录</p>
            </div>
            <TextField
              id="username"
              label="用户名"
              className={classes.textField}
              margin="dense"
              required={true}
            />
            <PasswordFeild />
            <Button className={classes.button}>忘记密码?</Button>
            <NavLink to="/mainview">
              <Button raised color="primary" className={classes.button}>登&nbsp;&nbsp;录</Button>
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