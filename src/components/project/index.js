import React, {Component} from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import FolderOpenIcon from 'material-ui-icons/FolderOpen'

import Menu, { MenuItem } from 'material-ui/Menu'

const styleSheet = createStyleSheet('ProjectModule', theme => ({
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

class ProjectModule extends Component {

  state = {
    anchorEl: undefined,
    open: false,
  }

    handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  }

  render() {
    const classes = this.props.classes
  
    return (
        <div>
          <ListItem button className={classes.listitem} disableGutters={true} onClick={this.handleClick}>
            <ListItemIcon className={classes.listitemicon}>
              <FolderOpenIcon />
            </ListItemIcon>            
            <ListItemText primary="项目管理" />
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
            <MenuItem onClick={this.handleRequestClose}>新建项目</MenuItem>
            <MenuItem onClick={this.handleRequestClose}>打开项目</MenuItem>
            <MenuItem onClick={this.handleRequestClose}>保存项目</MenuItem>
            <MenuItem onClick={this.handleRequestClose}>退出项目</MenuItem>
            <MenuItem onClick={this.handleRequestClose}>删除项目</MenuItem>
            <MenuItem onClick={this.handleRequestClose}>上传项目</MenuItem>
          </Menu>
        </div>
    )
  }
}

export default withStyles(styleSheet)(ProjectModule)