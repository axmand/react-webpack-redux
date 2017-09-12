import React, {Component} from 'react'
import { withStyles } from 'material-ui/styles'

import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import FontAwesome from 'react-fontawesome'
// import DevicesIcon from 'material-ui-icons/Devices'

import Menu, { MenuItem } from 'material-ui/Menu'

const styles = {
  listitem: {
    flexDirection: 'column',
    justifyContent: 'center ',
  },
  listItemText: {
    fontSize: '24px',
    lineHeight: '40px',
    color: '#ffffff',
    fontFamily: "微软雅黑",
    fontWeight: 'bold',
  },
}

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
          <ListItemIcon>
            <FontAwesome
              name='database'
              size='4x'
              style={{
                width: '54.85px',
                height: '64px',
                margin: '0px',
                color: '#C1C6C9',
              }}
            />
          </ListItemIcon>            
          <ListItemText
            primary="调查取证"
            disableTypography={true}
            className={classes.listItemText}
          />
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

export default withStyles(styles)(InvestigationModule)