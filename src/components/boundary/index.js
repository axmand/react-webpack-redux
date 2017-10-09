import React, {Component} from 'react'
import { withStyles } from 'material-ui/styles';


import Dialog,{DialogContent} from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
// import FontAwesome from 'react-fontawesome'
import PhotoCameraIcon from 'material-ui-icons/PhotoCamera';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';
import PhotoContent from './PhotoContent'
import { LinearProgress } from 'material-ui/Progress';
//redux
import { connect } from 'react-redux'
import RootReducer from './../../redux/RootReducer';
import projectData from './../../redux/RootData';

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
    width: '900px',
    height: '600px',
    marginTop: 20,
    marginLeft: 30
  }
}

class BoundaryModule extends Component {

  render() {
    const {
      handleCameraClose,
      handleCameraShow,
      CameraShow,
      PrintProgress,
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
          className={classes.dialog}
          open={CameraShow}
          onRequestClose={handleCameraClose}
          transition={<Slide direction="up" />}
        >
          <AppBar position="static" style ={{backgroundColor:"#455A64"}}>
            <Toolbar>
              <Typography type="title" color="inherit" className={classes.flex}>
                现场指界
              </Typography>
              <IconButton color="contrast" onClick={handleCameraClose} aria-label="Delete">
                <ClearIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        
         <DialogContent style={{ overflowY: 'auto' }}>
          <PhotoContent/>
          </DialogContent>
        </Dialog>
       
        <Dialog
        open={ PrintProgress }
        >
        <div style={{ width: 320,marginTop: 30}}>
          <LinearProgress />
        </div>`
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
          type: 'ProgressShow',
      }) 

      fetch('http://172.16.102.90:1338//project/photolist' )
      .then(response => response.json())
      .then( json => {
        dispatch({
          type: 'handleCameraShow',
          payload:json,
        })
        console.log(json)
        dispatch({
          type: 'ProgressShow',
        }) 
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: 'ProgressShow',
        }) 
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
    CardShow:false,
    PrintProgress:false
  }, action) => {
  
  let newState = JSON.parse(JSON.stringify(state))
  
  if (action.type === "ProgressShow") {
    const PrintProgress = { PrintProgress: !state.PrintProgress }
    return Object.assign({}, state, { ...PrintProgress })
  }
  
  if (action.type === "handleCameraShow") {
    let sta = JSON.parse(action.payload.status)
    if(projectData.Loaded === false||sta !== 200)
      alert("请选择项目！或检查数据是否成功导入！");
    else
      { 
        let list = [];
        projectData.PhotoItem = list.slice(0);
        list = JSON.parse(action.payload.data);

        for(let i = 0;i<list.length;i++)
          {
            const uuidv4 = require('uuid/v4');
            let Id = uuidv4();
            projectData.PhotoItem.push({text:list[i].PhotoString,key:Id})
          }
        newState.CameraShow =  !state.CameraShow
      }
   
      return { ...state, ...newState }; 
  }

  if (action.type === "handleCameraClose") {
    const CameraShow = {CameraShow: !state.CameraShow }
    return Object.assign({}, state, { ...CameraShow })
  }

  if (action.type === "handleCardShow") {
    const CardShow = { CardShow: !state.CardShow }
    return Object.assign({}, state, { ...CardShow })
  }

  if (action.type === "handleCardClose") {
    const CardShow = {CardShow: !state.CardShow }
    return Object.assign({}, state, { ...CardShow })
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
    const CardShow = {CardShow: !state.CardShow }
    return Object.assign({}, state, { ...CardShow })
  }
  
  else
    return state
}

RootReducer.merge(BoundaryReduce);


