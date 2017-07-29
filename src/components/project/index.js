import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles'
//UI
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Menu, { MenuItem } from 'material-ui/Menu'
import Paper from 'material-ui/Paper';
import Dialog,{ DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import Slide from 'material-ui/transitions/Slide';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
//图标
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';
import FolderOpenIcon from 'material-ui-icons/FolderOpen'
//自定义组件
import SelfButton from './SelfButton'

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

const style = {
    paper: {
        display: 'inline-block',
        float: 'left',
        margin: '16px 32px 16px 0',
    },
    rightIcon: {
        textAlign: 'center',
        lineHeight: '24px',
    },
}

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
  
  handleOpen = () => {
    this.setState({ open: true });
  };

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
          <Dialog
            fullScreen
            open={this.state.open}
            onRequestClose={this.handleRequestClose}
            transition={<Slide direction="right" />}
          >
            <AppBar position="static">
                <Toolbar>
                <IconButton color="contrast" aria-label="Delete">
                    <ClearIcon />
                </IconButton>
                <Typography type="title" color="inherit" className={classes.flex}>
                 项目管理
                </Typography>
                </Toolbar>
            </AppBar>
            <SelfButton/>
          </Dialog>
        </div>
    )
  }
}

export default withStyles(styleSheet)(ProjectModule)