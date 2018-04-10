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
    </div>
    )
  }
}

OutputModule.propTypes = {
  handleOutputClose: PropTypes.func.isRequired,
  handleOutputShow: PropTypes.func.isRequired,
  handleOutput: PropTypes.func.isRequired,
  OutputShow: PropTypes.bool.isRequired,
  Outputdata:PropTypes.array.isRequired,
};

//声明State与Action
const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps);
  return {
    OutputShow: state.OutputReduce.OutputShow,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  // console.log(ownProps);
  return {
    handleOutputShow: () => {
      dispatch({
        type: "saveClick",
      });
      dispatch({
        type: 'MAP_SKETCH_VIEW_HIDE',
      });
      dispatch({
        type: 'handleOutputShow',
        payload: ownProps.OutputData.Loaded
      });
    },

    handleOutputClose: () => {
    //  let PointX= coordinate.LB2XY(108.1226789,22.59317239).descartesX;
    //  let PointY= coordinate.LB2XY(108.1226789,22.59317239).descartesY;
    //  console.log(PointX,PointY)
      dispatch({
        type: 'handleOutputClose',
      })
    },

    handleOutput: () => {
      // console.log(ownProps);
      let JsonData = JSON.stringify([ownProps.OutputData.ProjectItem]);

      // console.log(JsonData)
      fetch(appConfig.fileServiceRootPath + '//project/forms/post', 
      { 
      method: 'POST', 
      // headers: {
      //    "Access-Control-Allow-Origin": "*",
      //   'Content-Type': 'x-www-form-urlencoded;charset=UTF-8',
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json',
      // }, 
      // body: params(JsonData) 
      body: JsonData
      })
    .then(response => response.json())
    .then( json => {
      dispatch({
        type: 'handleOutput',
        payload: json,
      })
      console.log(json)})
      .catch(err => {
        console.log(err)
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { name: 'OutputModule' })(OutputModule));
//Reducer 
const OutputReduce = (
  state = {
    OutputShow: false,
  }, action) => {

  let newState = JSON.parse(JSON.stringify(state))

  if (action.type === "handleOutputShow") {
    if(action.payload === false)
      alert("Error_import_002:请选择项目！");
    else
      { newState.OutputShow =  !state.OutputShow }
    return { ...state, ...newState }; 
  }

  if (action.type === "handleOutputClose") {
    const OutputShow = { OutputShow: !state.OutputShow }
    return Object.assign({}, state, { ...OutputShow })
  }

  if (action.type === "handleOutput") {
    newState.OutputShow = !state.OutputShow;
    return { ...state, ...newState }; 
  }

  else
    return state
}

RootReducer.merge(OutputReduce);