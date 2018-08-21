import React, {Component} from 'react'
import { withStyles } from 'material-ui/styles';
import Dialog,{DialogContent,DialogTitle,DialogActions} from 'material-ui/Dialog'
// import Slide from 'material-ui/transitions/Slide';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
// import FontAwesome from 'react-fontawesome'
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';
import PhotoContent from './PhotoContent'
import { LinearProgress } from 'material-ui/Progress';
//redux
import { connect } from 'react-redux'
import RootReducer from './../../redux/RootReducer';
// import projectData from './../../redux/RootData';
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
      handlePhotoDeleteShow,
      handlePhotoDelete,
      CameraShow,
      DeleteShow,
      PrintProgress,
      classes
    } = this.props;
  
    return (
    <div>
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
    DeleteId: state.BoundaryReduce.DeleteId,
    projectData: state.ProjectReduce.projectData
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(ownProps)
  return {
    XCZJclick:()=>{
      dispatch({
        type: 'MAP_SKETCH_VIEW_SWITCH',
        payload:ownProps,
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
      }),
      dispatch({
        type: 'PhotoDelete2projectData',
        payload:{ownProps:ownProps}
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
  //显示进度条
  if (action.type === "ProgressShow") {
    const PrintProgress = { PrintProgress: !state.PrintProgress }
    return Object.assign({}, state, { ...PrintProgress })
  }
  //显示界址点的照片
  if (action.type === "handleCameraShow") {
    let sta = JSON.parse(action.payload.json.status)
    if(action.payload.ownProps.projectData.Loaded === false||sta !== 200)
      alert("Error_import_002:请选择项目或检查数据是否成功导入！");
    else
      { 
        let list = [];
        newState.PhotoItemTest = list.slice(0);
        list = JSON.parse(action.payload.json.data);

        for(let i = 0;i<list.length;i++)
          {
            newState.PhotoItemTest.push({text:list[i].PhotoString,key:list[i].PhotoId,checked:false})
          }
        newState.CameraShow =  !state.CameraShow
      }
   
      return { ...state, ...newState }; 
  }
  //关闭照片显示对话框
  if (action.type === "handleCameraClose") {
    const CameraShow = {CameraShow: !state.CameraShow }
    return Object.assign({}, state, { ...CameraShow })
  }
  //显示照相机
  if (action.type === "handleCardShow") {
    const CardShow = { CardShow: !state.CardShow }
    return Object.assign({}, state, { ...CardShow })
  }
  //关闭照相机
  if (action.type === "handleCardClose") {
    const CardShow = {CardShow: !state.CardShow }
    return Object.assign({}, state, { ...CardShow })
  }
  //截取视频流获得照片
  if (action.type === "capture") {       
    //获取时间进行照片命名
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
    let PhotoId = action.payload.ownProps.projectData.PoiId.toString() + '-' + timetrans();
    
    let Stringitem = action.payload.data;
    let PhotoString = Stringitem.slice(23);
    let PhotoData = JSON.stringify({
        PhotoId: PhotoId,
        PhotoString: PhotoString,
    });
    //通过调用接口将照片保存到服务
    fetch(appConfig.fileServiceRootPath + '//project/photo', 
    { 
      method: 'POST', 
      body: PhotoData
    })
    .then(response => response.json())
    .then( json => {console.log(json)})
    .catch(err => {console.log(err)})
    
    newState.PhotoItemTest.push({text:PhotoString,key:PhotoId,checked:false})
    newState.CardShow =  !state.CardShow 
    return { ...state, ...newState };
  }
  //显示删除照片对话框
  if (action.type === "handlePhotoDeleteShow") {
    const DeleteShow = {DeleteShow: !state.DeleteShow }
    return Object.assign({}, state, { ...DeleteShow })
  }
  //删除照片
  if(action.type === "handlePhotoDelete"){
    newState.DeleteShow = !state.DeleteShow;
    let Photoitems = newState.PhotoItemTest.filter( (todo) =>{return todo.checked === false } )
    newState.PhotoItemTest = Photoitems;
    //通过调用接口删除照片
    console.log(appConfig.fileServiceRootPath + '//project/deletephoto/' + newState.DeleteId)
    fetch(appConfig.fileServiceRootPath + '//project/deletephoto/' + newState.DeleteId)
    .then(response => response.json())
    .then( json => {console.log(json)})
    .catch(err => {console.log(err)})
    return { ...state, ...newState };
  }
  //选中照片，获取需要删除的照片ID
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
      Photoitems.map(todo =>{
        if(todo.checked === true){
          let data=todo.key.replace('.png','')
          newState.DeleteId.push(data)
        }
      })
     
      newState.PhotoItemTest = Photoitems;
      return { ...state, ...newState };
  }
  
  else
    return state
}

RootReducer.merge(BoundaryReduce);


