/**
 * login 登录组件
 * @author yellow date 2017/7/24
 * -由于此组件包含input,button。可以根据需要拆分组件
 * 
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import RootReducer from '../../redux/RootReducer'

import { withStyles, createStyleSheet } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import VisibilityIcon from 'material-ui-icons/Visibility'
import VisibilityOffIcon from 'material-ui-icons/VisibilityOff' 

const styleSheet = createStyleSheet('Login', theme => ({
  root: {
		position: 'relative',
		display: 'inline-block',
  },
	input: {
		width: '310px',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
	},
  checkbox: {
		marginTop: 12,
		position: 'absolute',
		top: 0,
		right: 0,
  },
  button: {
    margin: theme.spacing.unit,
  },
}));

class PasswordField extends Component {

  constructor (props) {
    super(props)
    this.state = {
      focused: false,
      visible: props.visible
    }
	}

	/**
   * Toogles the visibility the password.
   * @public
   */
  toggleVisibility () {
    this.setState({
      visible: !this.state.visible
    })
	}
	
  render() {
		const classes = this.props.classes;
		const {
      visible
		} = this.state
		
    return (
			<div className={classes.root}>
				<TextField
					id="password"
					label="密码"
					className={classes.input}
					type={visible ? 'text' : 'password'}
					autoComplete="current-password"
					margin="dense"
					required={true}
				/>                        
				<Checkbox 
					onClick={() => this.toggleVisibility()}
					className={classes.checkbox}
					icon={<VisibilityOffIcon />}
					checkedIcon={<VisibilityIcon />}
				/>
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

export default withStyles(styleSheet)(PasswordField);