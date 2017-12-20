import React, {Component} from 'react'
import { withStyles } from 'material-ui/styles';
import Dialog,{DialogContent,DialogTitle,DialogActions} from 'material-ui/Dialog'
// import Slide from 'material-ui/transitions/Slide';
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
import JZDList from "./JZDList";


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
    width: '1200px',
    height: '730px',
    marginTop: 20,
    marginLeft: 40
  }
}

class BoundaryModule extends Component {

  render() {
    const {
      handleCameraClose,
      // handleCameraShow,
      handlePhotoDeleteShow,
      handlePhotoDelete,
      CameraShow,
      DeleteShow,
      PrintProgress,
      //XCZJclick,
      // PhotoItemTest,
      // DeleteId,
      classes
    } = this.props;
  
    return (
    <div>
       {/* <ListItem button className={classes.listitem} disableGutters={true} onClick={ XCZJclick }>  */}
       {/* <ListItem button className={classes.listitem} disableGutters={true}> 
        <ListItemIcon>
          <PhotoCameraIcon className={classes.listItemIcon}/>
        </ListItemIcon>            
        <ListItemText
          disableTypography={true}
          className={classes.listItemText}
          primary="现场指界"
        />
      </ListItem> */}
       <JZDList /> 
        <Dialog
          fullScreen
          className={classes.dialog}
          open={CameraShow}
          onRequestClose={handleCameraClose}
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
    PhotoItemTest: state.BoundaryReduce.PhotoItemTest,
    DeleteId: state.BoundaryReduce.DeleteId
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    XCZJclick:()=>{
      dispatch({
        type: 'MAP_SKETCH_VIEW_SWITCH',
      }),
      dispatch({
        type: "drawPointClick",
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
    PrintProgress:false,
    DeleteId:[],
    PhotoItemTest:[],
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
        newState.PhotoItemTest = list.slice(0);
        list = JSON.parse(action.payload.data);

        for(let i = 0;i<list.length;i++)
          {
            projectData.PhotoItem.push({text:list[i].PhotoString,key:list[i].PhotoId,checked:false});
            newState.PhotoItemTest.push({text:list[i].PhotoString,key:list[i].PhotoId,checked:false})
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
    function timetrans()
      {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = "-";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + "-" + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
        return currentdate;
      }
    let PhotoId = projectData.PoiId.toString() + '-' + timetrans();
    
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
    newState.PhotoItemTest.push({text:PhotoString,key:PhotoId,checked:false})
    newState.CardShow =  !state.CardShow 
    return { ...state, ...newState };
  }
  
  if (action.type === "handlePhotoDeleteShow") {
    const DeleteShow = {DeleteShow: !state.DeleteShow }
    return Object.assign({}, state, { ...DeleteShow })
  }
  
  if(action.type === "handlePhotoDelete"){
    newState.DeleteShow = !state.DeleteShow;
    let Photoitems = newState.PhotoItemTest.filter( (todo) =>{return todo.checked === false } )
    projectData.PhotoItem = Photoitems.slice(0);
    newState.PhotoItemTest = Photoitems;
    
    console.log(appConfig.fileServiceRootPath + '//project/deletephoto/' + newState.DeleteId)
    fetch(appConfig.fileServiceRootPath + '//project/deletephoto/' + newState.DeleteId)
    .then(response => response.json())
    .then( json => {console.log(json)})
    .catch(err => {console.log(err)})
    return { ...state, ...newState };
  }

  if(action.type === "handleChoosePhoto"){
      let Photoitems = newState.PhotoItemTest.map( todo => {
        if ( todo.key === action.id ) {
          return {
            ...todo, 
            checked: !todo.checked
          }
        }
        return todo;
      })
      newState.DeleteId = [];
      Photoitems.foreach(todo =>{
        if(todo.checked === true){
          let data=todo.key.replace('.png','')
          newState.DeleteId.push(data)
        }
      })
      projectData.PhotoItem =Photoitems.slice(0);
      newState.PhotoItemTest = Photoitems;
      return { ...state, ...newState };
  }
  
  else
    return state
}

RootReducer.merge(BoundaryReduce);


