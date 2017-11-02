import React, {Component} from 'react'
import { withStyles } from 'material-ui/styles';
import Dialog,{DialogContent,DialogTitle,DialogActions} from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
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
import appConfig from "../../redux/Config";


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
      handlePhotoDeleteShow,
      handlePhotoDelete,
      CameraShow,
      DeleteShow,
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
          transition={<Slide direction="up" />}>
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
              <Button style={{padding:0,}} onClick={ handlePhotoDeleteShow }>
                删除
              </Button>
              <PhotoContent/>
          </DialogContent>
      </Dialog>
       
      <Dialog open={ PrintProgress } >
          <div style={{ width: 320,marginTop: 30}}>
            <LinearProgress />
          </div>
      </Dialog>

      <Dialog open={ DeleteShow }>
          <DialogTitle>是否确认删除照片？</DialogTitle>
          <DialogActions>
            <Button onClick={ handlePhotoDelete } color="primary">
              确认
            </Button>
            <Button onClick={ handlePhotoDeleteShow } color="primary" autoFocus>
              取消
            </Button>
          </DialogActions>
      </Dialog>
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
    CameraShow: state.BoundaryReduce.CameraShow,
    DeleteShow: state.BoundaryReduce.DeleteShow,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleCameraShow: () => {
      dispatch({
        type: "saveClick",
      }); 
      dispatch({
        type: 'MAP_SKETCH_VIEW_HIDE',
      });
      dispatch({
          type: 'ProgressShow',
      });

      fetch(appConfig.fileServiceRootPath + '//project/photolist' )
      .then(response => response.json())
      .then( json => {
        dispatch({
          type: 'handleCameraShow',
          payload:json,
        })
        //console.log(json)
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

    handlePhotoDeleteShow: () => {
      dispatch({
        type: 'handlePhotoDeleteShow',
      })
    },
    
    handlePhotoDelete: () => {
    
      let deletedPhotoItems = projectData.PhotoItem.filter( (todo) =>{return todo.checked === true } )
      console.log(deletedPhotoItems)

      dispatch({
        type: 'handlePhotoDelete',
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
    DeleteShow:false,
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
            projectData.PhotoItem.push({text:list[i].PhotoString,key:list[i].PhotoId,checked:false})
          }
        newState.CameraShow =  !state.CameraShow
        // console.log(projectData.PhotoItem)
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
    // let PhotoId = projectData.PhotoId;
    // projectData.PhotoId = projectData.PhotoId + 1;
    const uuidv4 = require('uuid/v4');
    let PhotoId = uuidv4();

    let Stringitem = action.payload;
    let PhotoString = Stringitem.slice(23);
    let PhotoData = JSON.stringify({
        PhotoId: PhotoId,
        PhotoString: PhotoString,
    });

    fetch(appConfig.fileServiceRootPath + '//project/photo', 
    { 
      method: 'POST', 
      body: PhotoData
    })
    .then(response => response.json())
    .then( json => {console.log(json)})
    .catch(err => {console.log(err)})
    
    projectData.PhotoItem.push({text:PhotoString,key:PhotoId,checked:false})
    const CardShow = {CardShow: !state.CardShow }
    return Object.assign({}, state, { ...CardShow })
  }
  
  if (action.type === "handlePhotoDeleteShow") {
    const DeleteShow = {DeleteShow: !state.DeleteShow }
    return Object.assign({}, state, { ...DeleteShow })
  }
  
  if(action.type === "handlePhotoDelete"){
    newState.DeleteShow = !state.DeleteShow;
    let Photoitems = projectData.PhotoItem.filter( (todo) =>{return todo.checked === false } )
    projectData.PhotoItem =Photoitems.slice(0);
    console.log(projectData.PhotoItem)
    return { ...state, ...newState };
  }

  if(action.type === "handleChoosePhoto"){
   let Photoitems = projectData.PhotoItem.map( todo => {
      if ( todo.key === action.id ) {
        return {
          ...todo, 
          checked: !todo.checked
        }
      }
      return todo;
    })
    projectData.PhotoItem =Photoitems.slice(0);
    console.log(projectData.PhotoItem)
    return state;
  }
  
  else
    return state
}

RootReducer.merge(BoundaryReduce);


