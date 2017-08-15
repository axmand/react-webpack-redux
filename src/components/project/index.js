import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles'
//UI
import  { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
//图标
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';
import FontAwesome from 'react-fontawesome'
// import FolderOpenIcon from 'material-ui-icons/FolderOpen'
//自定义组件
import SelfContent from './SelfContent'
//redux


const styleSheet = createStyleSheet('ProjectModule', theme => ({
  listitem: {
    flexDirection: 'column',
    justifyContent: 'center ',
  },
  listItemText: {
    padding: '0px',
    lineHeight: '32px',
    padding: '2px',
    color: '#ffffff',
  },
  AppBar:{
    root:{
      marginTop:30,
      width:'100%',
    },
    position: 'relative'
  },
  flex: {
     flex: 1,
  }, 
  dialog:{
    width: '800px',
    height: '800px',
  }
}))

class ProjectModule extends Component {

  constructor(props){
    super(props);
    this.state ={
      open: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }
 
  handleClick = event => {
    this.setState({ open: true })
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  }
  

  render() {
    const classes = this.props.classes

    return (
        <div>
          <ListItem button className={classes.listitem} disableGutters={true} onClick={this.handleClick}>
            <ListItemIcon>
              <FontAwesome
                name='folder-o'
                size='2x'
                style={{
                  width: '29.71px',
                  height: '32px',
                  margin: '0px',
                  padding: '2px',
                  color: '#C1C6C9',
                }}
              />
            </ListItemIcon>            
            <ListItemText
              primary="项目管理"
              disableTypography={true}
              className={classes.listItemText}
            />
          </ListItem>
          
          <Dialog
            fullScreen
            //contentStyle={{maxWidth:'800'}}
            //className={classes.dialog}
            open={this.state.open}
            onRequestClose={this.handleRequestClose}
            transition={<Slide direction="up" />}
          >
            <AppBar position="static">
              <Toolbar>
                <Typography type="title" color="inherit" className={classes.flex}>
                 项目管理
                </Typography>
                <IconButton color="contrast" onClick={this.handleRequestClose}  aria-label="Delete">
                   <ClearIcon />
                </IconButton>
              </Toolbar>
            </AppBar>

            <DialogContent style={{overflowY:'auto'}}>
              <SelfContent/>
            </DialogContent>
          </Dialog>
           
        </div>
    )
  }
}

export default withStyles(styleSheet)(ProjectModule)

