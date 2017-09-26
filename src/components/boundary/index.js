import React, {Component} from 'react'
import { withStyles } from 'material-ui/styles';
import CameraWrapper from './CameraWrapper.js'

import Dialog from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
// import FontAwesome from 'react-fontawesome'
import PhotoCameraIcon from 'material-ui-icons/PhotoCamera';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';
//redux
import { connect } from 'react-redux'
import RootReducer from './../../redux/RootReducer';
import projectData from './../../redux/RootData';

const styles = {
  listitem: {
    flexDirection: 'column',
    justifyContent: 'center ',
    paddingTop: "15%",
    paddingBottom: "15%",
	},
	listItemIcon: {
    width: "50%",
    height: "50%",
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
  AppBar: {
    root: {
      marginTop: 30,
      width: '100%',
    },
    position: 'relative'
  },
  flex: {
    flex: 1,
  },
  dialog: {
    width: '1650px',
    height: '1150px',
    marginTop: 20,
    marginLeft: 200
  }
}

class BoundaryModule extends Component {

  render() {
    const {
      handleCameraClose,
      handleCameraShow,
      CameraShow,
      classes
    } = this.props;
  
    return (
      <div>
      <ListItem button className={classes.listitem} disableGutters={true} onClick={ handleCameraShow }>
        <ListItemIcon>
          <PhotoCameraIcon className={classes.listItemIcon}/>
        </ListItemIcon>            
        <ListItemText
          disableTypography={true}
          className={classes.listItemText}
          primary="现场指界"
        />
      </ListItem>
      
      <Dialog
          fullScreen
          open={CameraShow}
          onRequestClose={handleCameraClose}
          transition={<Slide direction="up" />}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography type="title" color="inherit" className={classes.flex}>
                现场指界
              </Typography>
              <IconButton color="contrast" onClick={handleCameraClose} aria-label="Delete">
                <ClearIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <CameraWrapper/>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
    CameraShow: state.BoundaryReduce.CameraShow,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleCameraShow: () => {
       dispatch({
        type: 'handleCameraShow',
      })
    },

    handleCameraClose: () => {
      dispatch({
        type: 'handleCameraClose',
      })
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)( withStyles(styles,{name:'BoundaryModule'})(BoundaryModule));

//Reducer 
const BoundaryReduce = (
  state = {
    CameraShow: false,
  }, action) => {
  
  if (action.type === "handleCameraShow") {
    const CameraShow = { CameraShow: !state.CameraShow }
    return Object.assign({}, state, { ...CameraShow })
  }

  if (action.type === "handleCameraClose") {
    const CameraShow = {CameraShow: !state.CameraShow }
    return Object.assign({}, state, { ...CameraShow })
  }
  
  if (action.type === "capture") {
    
    const uuidv4 = require('uuid/v4');
    let PhotoId = uuidv4();
    let Stringitem = action.payload;
    let PhotoString = Stringitem.slice(23);
    let PhotoData = JSON.stringify({
        PhotoId: PhotoId,
        PhotoString: PhotoString,
    });

    fetch('http://172.16.102.90:1338//project/photo', 
    { 
      method: 'POST', 
      body: PhotoData
    })
    .then(response => response.json())
    .then( json => {console.log(json)})
    .catch(err => {console.log(err)})

    projectData.PhotoItem.push(PhotoString);
    return state; 
  }
  
  else
    return state
}

RootReducer.merge(BoundaryReduce);