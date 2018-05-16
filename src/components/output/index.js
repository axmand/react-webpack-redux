import React, {Component} from 'react'
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Dialog,{ DialogActions, DialogContent, DialogContentText, DialogTitle,} from 'material-ui/Dialog'
import Button from 'material-ui/Button';
//图标
import FileUploadIcon from 'material-ui-icons/FileUpload';
//redux
import { connect } from 'react-redux'
import RootReducer from './../../redux/RootReducer';
// import projectData from './../../redux/RootData';
import appConfig from "../../redux/Config"
// import coordinate from "../../utils/coordinate"

const styles = {
  listitem: {
    flexDirection: 'column',
    justifyContent: 'center ',
    height:`${window.innerHeight*0.1}px`,
    // paddingTop: "15%",
    // paddingBottom: "15%",
	},
	listItemIcon: {
		width: "60%",
    height: "60%",
		margin: 0,
		color: '#C1C6C9',
	},
  listItemText: {
    fontSize: '1em',
    color: '#ffffff',
    fontFamily: "微软雅黑",
    fontWeight: 'bold',
    padding: '0px',
  },
}

class OutputModule extends Component {

  render() {
    const { handleOutputClose,
      handleOutputShow,
      handleOutput,
      OutputShow,
      OutputTrue,
      OutputFalse,
      handleOutputFalse,
      handleOutputTrue,
      classes
    } = this.props

  
    return (
    <div>
      <ListItem button className={classes.listitem} disableGutters={true} onClick={ handleOutputShow }>
        <ListItemIcon>
          <FileUploadIcon className={classes.listItemIcon}/>
        </ListItemIcon>            
        <ListItemText
          disableTypography={true}
          className={classes.listItemText}
          primary="数据导出"
        />
      </ListItem>

      <Dialog
        open={OutputShow}
        onRequestClose={handleOutputClose}
      >
      <DialogTitle>{"数据导出"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            此操作将保存修改的数据，是否确认导出数据？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOutput} color="primary">
            确认
          </Button>
          <Button onClick={handleOutputClose} color="primary">
            取消
          </Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={OutputTrue} onRequestClose={handleOutputTrue}>
          <DialogContent>
            <DialogContentText>数据导出成功！</DialogContentText>
          </DialogContent>
        </Dialog>

      <Dialog open={OutputFalse} onRequestClose={handleOutputFalse}>
          <DialogContent>
            <DialogContentText>Error_import_001:数据导出失败！</DialogContentText>
          </DialogContent>
        </Dialog>
    </div>
    )
  }
}

OutputModule.propTypes = {
  handleOutputClose: PropTypes.func.isRequired,
  handleOutputShow: PropTypes.func.isRequired,
  handleOutput: PropTypes.func.isRequired,
  OutputShow: PropTypes.bool.isRequired,
  OutputData:PropTypes.object.isRequired,
  OutputTrue:PropTypes.bool.isRequired,
  OutputFalse:PropTypes.bool.isRequired,
  handleOutputTrue: PropTypes.func.isRequired,
  handleOutputFalse: PropTypes.func.isRequired,
};

//声明State与Action
const mapStateToProps = (state, ownProps) => {

  return {
    OutputShow: state.OutputReduce.OutputShow,
    OutputTrue: state.OutputReduce.OutputTrue,
    OutputFalse: state.OutputReduce.OutputFalse,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleOutputShow: () => {
      if(ownProps.sketchHaveSaved){
        dispatch({
          type: 'MAP_SKETCH_VIEW_HIDE',
        });
      }

      dispatch({
        type: 'handleOutputShow',
        payload: {
          Loaded:ownProps.OutputData.Loaded,
          sketchHaveSaved:ownProps.sketchHaveSaved
        }
      });
    },

    handleOutputClose: () => {
      dispatch({
        type: 'handleOutputClose',
      })
    },
    
    handleOutputTrue: () => {
      dispatch({
        type: 'handleOutputTrue',
      })
    },
    
    handleOutputFalse: () => {
      dispatch({
        type: 'handleOutputFalse',
      })
    },
    //响应数据导出
    handleOutput: () => {
      let JsonData = JSON.stringify([ownProps.OutputData.ProjectItem]);
      console.log(JsonData)
      //调用接口，将数据保存导出到服务
      fetch(appConfig.fileServiceRootPath + '//project/forms/post', 
      { 
      method: 'POST', 
      body: JsonData
      })
    .then(response => response.json())
    .then( json => {
      dispatch({
        type: 'handleOutput',
        payload: json,
      });
      if(json.status === 200){      
        dispatch({
        type: 'handleOutputTrue',
      })}
      else{
      dispatch({
        type: 'handleOutputFalse',
      })
      }

      console.log(json)})
    .catch(err => {
        console.log(err);
      dispatch({
        type: 'handleOutputFalse',
      })
      }
    )
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { name: 'OutputModule' })(OutputModule));
//Reducer 
const OutputReduce = (
  state = {
    OutputShow: false,
    OutputFalse:false,
    OutputTrue: false,
  }, action) => {

  let newState = JSON.parse(JSON.stringify(state))
  //显示对话框
  if (action.type === "handleOutputShow") {
    if(action.payload.Loaded === false){
      alert("Error_import_002:请选择项目！");
    }else{
      if(action.payload.sketchHaveSaved===false){
        alert("请先保存草图绘制数据！");
      }else{
        newState.OutputShow =  !state.OutputShow 
      }
    }
    return { ...state, ...newState }; 
  }
  //关闭对话框
  if (action.type === "handleOutputClose") {
    const OutputShow = { OutputShow: !state.OutputShow }
    return Object.assign({}, state, { ...OutputShow })
  }
  //响应数据导出
  if (action.type === "handleOutput") {
    newState.OutputShow = !state.OutputShow;
    return { ...state, ...newState }; 
  }
  //导出成功对话框
  if (action.type === "handleOutputTrue") {
    const OutputTrue = { OutputTrue: !state.OutputTrue };
    return Object.assign({}, state, { ...OutputTrue });
  }
  //导出失败对话框
  if (action.type === "handleOutputFalse") {
    const OutputFalse = { OutputFalse: !state.OutputFalse };
    return Object.assign({}, state, { ...OutputFalse });
  }
  else
    return state
}

RootReducer.merge(OutputReduce);