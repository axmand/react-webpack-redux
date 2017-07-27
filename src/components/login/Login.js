/**
 * login 登录组件
 * @author yellow date 2017/7/24
 * -由于此组件包含input,button。可以根据需要拆分组件
 * 
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import RootReducer from '../../redux/RootReducer'
import PropTypes from 'prop-types'

import { withStyles, createStyleSheet } from 'material-ui/styles'
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import Button from 'material-ui/Button';
import VisibilityIcon from 'material-ui-icons/Visibility'
import VisibilityOffIcon from 'material-ui-icons/VisibilityOff' 

const styleSheet = createStyleSheet('Login', theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
		height: '100%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  checkbox: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
}));

class Login extends Component {

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.container}>
        <FormGroup >
          <TextField
            id="username"
            label="用户名"
            className={classes.textField}
            margin="normal"
            required={true}
          />
          <TextField
            id="password"
            label="密码"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            required={true}
          >
                         
          </TextField>
          <Checkbox 
              className={classes.checkbox}
              icon={<VisibilityIcon />}
              checkedIcon={<VisibilityOffIcon />}
            /> 
          <Button className={classes.button}>忘记密码</Button>
          <Button raised color="primary" className={classes.button}>登录</Button>
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