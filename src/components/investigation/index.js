import React, {Component} from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import DevicesIcon from 'material-ui-icons/Devices'

import Menu, { MenuItem } from 'material-ui/Menu'

const styleSheet = createStyleSheet('InvestigationModule', theme => ({
  listitem: {
    flexDirection: 'column',
    justifyContent: 'center ',
  },
  listitemicon: {
    width: '50%',
    height: '50%',
    margin: '0px',
  },
}))

class InvestigationModule extends Component {

  state = {
    anchorEl: undefined,
    open: false,
  }

   handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  render() {
    const classes = this.props.classes
  
    return (
      <div>
        <ListItem button className={classes.listitem} disableGutters={true} onClick={this.handleClick}>
          <ListItemIcon className={classes.listitemicon}>
            <DevicesIcon />
          </ListItemIcon>            
          <ListItemText primary="调查取证" />
        </ListItem>
        <Menu
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          anchorOrigin={{
              horizontal:'right',
              vertical:'center',
          }}
        >
          <MenuItem onClick={this.handleRequestClose}>照片</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>音频</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>指纹</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>身份证</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>其他证明文件</MenuItem>
        </Menu>          
      </div>
    )
  } 
}

export default withStyles(styleSheet)(InvestigationModule)