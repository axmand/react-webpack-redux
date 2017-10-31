import React, {Component} from 'react'
import { withStyles } from 'material-ui/styles'

import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import ContactsIcon from 'material-ui-icons/Contacts';
// import FontAwesome from 'react-fontawesome'
// import DevicesIcon from 'material-ui-icons/Devices'

import Menu, { MenuItem } from 'material-ui/Menu'

const styles = {
  listitem: {
    flexDirection: 'column',
    justifyContent: 'center ',
    // paddingTop: "15%",
    // paddingBottom: "15%",
  },
  listItemIcon: {
    width: "40%",
    height: "40%",
    margin: 0,
    color: "#C1C6C9"
  },
  listItemText: {
    fontSize: '1em',
    color: '#ffffff',
    fontFamily: "微软雅黑",
    fontWeight: 'bold',
    padding: '0px',
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
            <ContactsIcon className={classes.listItemIcon}/>
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
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
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