import React, {Component} from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import PeopleIcon from 'material-ui-icons/People'

import Menu, { MenuItem } from 'material-ui/Menu'
import FirstDialog from './FirstDialog'
const styleSheet = createStyleSheet('ObligeeModule', theme => ({
  listitem: {
    flexDirection: 'column',
    justifyContent: 'center ',
  },
  listitemicon: {
    width: '50%',
    height: '50%',
    margin: '0px',
  },
}));

class ObligeeModule extends Component {

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
            <PeopleIcon />
          </ListItemIcon>            
          <ListItemText primary="权利人" />
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
          
          <FirstDialog />
         
          {/*<MenuItem onClick={this.handleRequestClose}>界址签章表</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>调查审核表</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>共有宗地面积分摊表</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>属性查询</MenuItem>*/}
        </Menu>
      </div>
    )
  }
}

export default withStyles(styleSheet)(ObligeeModule);