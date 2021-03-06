import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";
//UI
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Dialog, { DialogContent, DialogContentText } from "material-ui/Dialog";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
//图标
import IconButton from "material-ui/IconButton";
import ClearIcon from "material-ui-icons/Clear";
import FolderOpenIcon from "material-ui-icons/FolderOpen";
import { CircularProgress } from "material-ui/Progress";
//自定义组件
import ProjectCard from "./ProjectCard";
//redux
import { connect } from "react-redux";
import RootReducer from "./../../redux/RootReducer";
// import projectData from './../../redux/RootData';
import appConfig from "../../redux/Config";

const styles = {
  listitem: {
    flexDirection: "column",
    justifyContent: "center ",
    height: `${window.innerHeight * 0.1}px`
    // paddingTop: "15%",
    // paddingBottom: "15%",
  },
  listItemIcon: {
    width: "60%",
    height: "60%",
    margin: 0,
    color: "#C1C6C9"
  },
  listItemText: {
    fontSize: "1em",
    color: "#ffffff",
    fontFamily: "微软雅黑",
    fontWeight: "bold",
    padding: "0px"
  },
  AppBar: {
    root: {
      marginTop: 30,
      width: "100%"
    },
    position: "relative"
  },
  flex: {
    flex: 1
  },
  dialog: {
    width: "1200px",
    height: "730px",
    marginTop: 20,
    marginLeft: 40
  },
  prompt: {
    width: "300px",
    height: "400px",
    marginTop: 20,
    marginLeft: 50
  },
  divStyle: {
    opacity: "1",
    backgroundColor: "transparent",
    overflowX: "hidden",
    overflowY: "hidden",
  }
};

class ProjectModule extends Component {
  render() {
    const {
      handleProjectTrue,
      handleProjectFalse,
      handleContentClose,
      handleContentShow,
      ContentShow,
      ProjectTrue,
      ProjectFalse,
      ProjectProgress,
      classes
    } = this.props;

    return (
      <div>
        <ListItem
          button
          className={classes.listitem}
          disableGutters={true}
          onClick={handleContentShow}
        >
          <ListItemIcon>
            <FolderOpenIcon className={classes.listItemIcon} />
          </ListItemIcon>
          <ListItemText
            primary="数据导入"
            disableTypography={true}
            className={classes.listItemText}
          />
        </ListItem>

        <Dialog
          fullScreen
          className={classes.dialog}
          open={ContentShow}
          onRequestClose={handleContentClose}
        >
          <AppBar position="static" style={{ backgroundColor: "#455A64" }}>
            <Toolbar>
              <Typography type="title" color="inherit" className={classes.flex}>
                数据导入
              </Typography>
              <IconButton
                color="contrast"
                onClick={handleContentClose}
                aria-label="Delete"
              >
                <ClearIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <DialogContent style={{ overflowY: "auto" }}>
            <ProjectCard />
          </DialogContent>
        </Dialog>

        <Dialog open={ProjectTrue} onRequestClose={handleProjectTrue}>
          <DialogContent>
            <DialogContentText>数据导入成功！</DialogContentText>
          </DialogContent>
        </Dialog>

        <Dialog open={ProjectFalse} onRequestClose={handleProjectFalse}>
          <DialogContent>
            <DialogContentText>Error_import_001:数据导入失败！</DialogContentText>
          </DialogContent>
        </Dialog>

        <Dialog open={ProjectProgress}>
          <div className={classes.divStyle}>
            <CircularProgress size={50} />
          </div>
        </Dialog>
      </div>
    );
  }
}

ProjectModule.propTypes = {
  handleContentClose: PropTypes.func.isRequired,
  handleContentShow: PropTypes.func.isRequired,
  ContentShow: PropTypes.bool.isRequired,
  ProjectTrue: PropTypes.bool.isRequired,
  ProjectFalse: PropTypes.bool.isRequired,
  ProjectProgress: PropTypes.bool.isRequired,
  handleProjectTrue: PropTypes.func.isRequired,
  handleProjectFalse: PropTypes.func.isRequired,
  projectData: PropTypes.object.isRequired
};

//声明State与Action
const mapStateToProps = (state, ownProps) => {
  return {
    ContentShow: state.ProjectReduce.ContentShow,
    ProjectTrue: state.ProjectReduce.ProjectTrue,
    ProjectFalse: state.ProjectReduce.ProjectFalse,
    ProjectProgress: state.ProjectReduce.ProjectProgress,
    projectData: state.ProjectReduce.projectData //导入数据
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleContentShow: () => {
      if(ownProps.sketchHaveSaved){
        dispatch({
          type: 'MAP_SKETCH_VIEW_HIDE',
        });
      }
      dispatch({
        type: "handleProjectProgress"
      });
      //调用服务接口获取项目列表
      fetch(appConfig.fileServiceRootPath + "/project/list")
        .then(response => response.json())
        .then(json => {
          dispatch({
            type: "handleContentShow",
            payload: json
          });
          //console.log(json)
          dispatch({
            type: "handleProjectProgress"
          });
        })
        .catch(e => {
          console.log("Oops, error", e);

          dispatch({
            type: "STATUS_BAR_NOTIFICATION",
            payload: {
              notification: e
            }
          });

          dispatch({
            type: "handleProjectProgress"
          });

          dispatch({
            type: "handleProjectFalse"
          });
        });
    },

    handleContentClose: () => {
      dispatch({
        type: "handleContentClose"
      });
    },

    handleProjectFalse: () => {
      dispatch({
        type: "handleProjectFalse"
      });
    },

    handleProjectTrue: () => {
      dispatch({
        type: "handleProjectTrue"
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles, { name: "ProjectModule" })(ProjectModule)
);

//Reducer
const ProjectReduce = (
  state = {
    inputItems: [],
    projectData: {
      ProjectItem: [], //项目JOSN数据
      Project_DT_Point: [],
      Project_DT_Line: [],
      Project_DT_Polygon: [],
      ProjectName: [], //项目名称
      PhotoItem: [], //照片信息
      Loaded: false, //是否加载
      PoiId: 0, //点ID
      MacInfo: "" //设备信息
    },
    ContentShow: false,
    ProjectFalse: false,
    ProjectTrue: false,
    ProjectProgress: false
  },
  action
) => {
  let newState = JSON.parse(JSON.stringify(state));
  //显示项目列表
  if (action.type === "handleContentShow") {

    let list = [];
    newState.inputItems = list.slice(0);

    list = JSON.parse(action.payload.data);
    let sta0 = JSON.parse(action.payload.status);

    if (sta0 !== 200) {
      newState.ProjectFalse = !state.ProjectFalse;
    } else {
      for (let i = 0; i < list.length; i++) {
        const uuidv4 = require("uuid/v4");
        let Id = uuidv4();
        newState.inputItems.push({ text: list[i], key: Id });
      }
      newState.ContentShow = !state.ContentShow;
    }
    return { ...state, ...newState };
  }
  //显示进度条
  if (action.type === "handleProjectProgress") {
    const ProjectProgress = { ProjectProgress: !state.ProjectProgress };
    return Object.assign({}, state, { ...ProjectProgress });
  }
  //关闭项目列表对话框
  if (action.type === "handleContentClose") {
    const ContentShow = { ContentShow: !state.ContentShow };
    return Object.assign({}, state, { ...ContentShow });
  }
  //提示数据导入成功
  if (action.type === "handleProjectTrue") {
    const ProjectTrue = { ProjectTrue: !state.ProjectTrue };
    return Object.assign({}, state, { ...ProjectTrue });
  }
  //提示数据导入失败
  if (action.type === "handleProjectFalse") {
    const ProjectFalse = { ProjectFalse: !state.ProjectFalse };
    return Object.assign({}, state, { ...ProjectFalse });
  }
  //选择项目，将项目数据导入
  if (action.type === "handleChooseItem") {
    let list0 = [];
    let Prolist = [];
    list0 = action.payload;
    Prolist = action.itemName;
    newState.projectData.ProjectName = Prolist;
    newState.projectData.ProjectItem = JSON.parse(list0[3].data)[0];
    newState.projectData.Project_DT_Point = JSON.parse(list0[0].data);
    newState.projectData.Project_DT_Line = JSON.parse(list0[1].data);
    newState.projectData.Project_DT_Polygon = JSON.parse(list0[2].data);
    newState.projectData.Loaded = true;
    newState.ContentShow = !state.ContentShow;
    return { ...state, ...newState };
  }
  //响应图层数据更新的函数
  if (action.type === "updateData2projectData") {
    let list0 = {};
    console.log(action.payload.data);
    list0 = action.payload.data;
    newState.projectData.ProjectItem.L = list0;
    return { ...state, ...newState };
  }
  //响应表格数据更新的函数
  if (action.type === "TableData2projectData") {
    var list0 = action.payload.TableData;
    if(list0!==undefined)
    {
        list0.L = state.projectData.ProjectItem.L;
        newState.projectData.ProjectItem = list0;
        let JsonData = JSON.stringify([newState.projectData.ProjectItem]);
        console.log(JsonData)
        //调用接口，将数据保存导出到服务
        fetch(appConfig.fileServiceRootPath + '//project/forms/post', 
        { 
        method: 'POST', 
        body: JsonData
        })


        return { ...state, ...newState };
    }
    else
{
    let JsonData = JSON.stringify([newState.projectData]);
    console.log(JsonData)
    //调用接口，将数据保存导出到服务
    fetch(appConfig.fileServiceRootPath + '//project/forms/post', 
    { 
    method: 'POST', 
    body: JsonData
    })
    return state;
  }
  }
  //响应照片数据更新的函数
  if (action.type === "showPhoto2projectData") {
    let list = [];
    newState.projectData.PhotoItem = list.slice(0);

    list = JSON.parse(action.payload.json.data);

    for (let i = 0; i < list.length; i++) {
      newState.projectData.PhotoItem.push({
        text: list[i].PhotoString,
        key: list[i].PhotoId,
        checked: false
      });
    }

    return { ...state, ...newState };
  }
  //响应保存拍摄照片数据的函数
  if (action.type === "capture2projectData") {
    newState.projectData.PhotoItem = action.payload.ownProps.PhotoItemTest;
    return { ...state, ...newState };
  }
  //响应删除选择照片数据的函数
  if (action.type === "PhotoDelete2projectData") {
    newState.projectData.PhotoItem = action.payload.ownProps.PhotoItemTest;
    return { ...state, ...newState };
  }
  //响应选择照片数据的函数
  if (action.type === "ChoosePhoto2projectData") {
    newState.projectData.PhotoItem = action.payload.ownProps.PhotoItemTest;
    return { ...state, ...newState };
  }
  //响应现场指界点击，保存点选ID的函数
  if (action.type === "jzdXCZJClick") {
    newState.projectData.PoiId = action.payload.command;
    return { ...state, ...newState };
  } else return state;
};

RootReducer.merge(ProjectReduce);
