import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types';
//UI
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Dialog, { DialogContent,DialogContentText } from 'material-ui/Dialog'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
//图标
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';
import FolderOpenIcon from 'material-ui-icons/FolderOpen';
import { CircularProgress } from 'material-ui/Progress';
//自定义组件
import ProjectCard from './ProjectCard'
//redux
import { connect } from 'react-redux'
import RootReducer from './../../redux/RootReducer';
import projectData from './../../redux/RootData';
import appConfig from "../../redux/Config"

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
		color: '#C1C6C9',
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
  },
  prompt:{
    width: '300px',
    height: '400px',
    marginTop: 20,
    marginLeft: 50
  },
  divStyle:{
    opacity:'1',
    backgroundColor: 'transparent'
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
    } = this.props

    return (
        <div>
          <ListItem button className={ classes.listitem } disableGutters={ true } onClick={ handleContentShow }>
            <ListItemIcon>
              <FolderOpenIcon className={classes.listItemIcon}/>
            </ListItemIcon>            
            <ListItemText
              primary="数据导入"
              disableTypography={ true }
              className={classes.listItemText}
            />
        </ListItem>

        <Dialog
          fullScreen
          className={classes.dialog}
          open={ContentShow}
          onRequestClose={handleContentClose}
        >
          <AppBar position="static"  style ={{backgroundColor:"#455A64"}} >
            <Toolbar  >
              <Typography type="title" color="inherit" className={classes.flex}>
                数据导入
              </Typography>
              <IconButton color="contrast" onClick={handleContentClose} aria-label="Delete">
                <ClearIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <DialogContent style={{ overflowY: 'auto' }}>
            <ProjectCard />
          </DialogContent>
        </Dialog>
       
        <Dialog
          open={ ProjectTrue }
          onRequestClose={ handleProjectTrue } 
        >
          <DialogContent>
            <DialogContentText>
              数据导入成功！
            </DialogContentText>
          </DialogContent>
        </Dialog>
        
        <Dialog
          open={ ProjectFalse }
          onRequestClose={ handleProjectFalse } 
        >
          <DialogContent>
            <DialogContentText>
              数据导入失败！
            </DialogContentText>
          </DialogContent>
        </Dialog>
        
        <Dialog
          open={ ProjectProgress }
        >
        <div className={classes.divStyle}>
          <CircularProgress size={50} />
        </div>
        </Dialog>
      </div>
    )
  }
}

ProjectModule.propTypes = {
  handleContentClose: PropTypes.func.isRequired,
  handleContentShow: PropTypes.func.isRequired,
  ContentShow: PropTypes.bool.isRequired,
  ProjectTrue: PropTypes.bool.isRequired,
  ProjectFalse: PropTypes.bool.isRequired,
  ProjectProgress: PropTypes.bool.isRequired,
  handleProjectTrue:PropTypes.func.isRequired,
  handleProjectFalse:PropTypes.func.isRequired,
};

//声明State与Action
const mapStateToProps = (state, ownProps) => {

  return {
    ContentShow: state.ProjectReduce.ContentShow,
    ProjectTrue: state.ProjectReduce.ProjectTrue,
    ProjectFalse: state.ProjectReduce.ProjectFalse,
    ProjectProgress: state.ProjectReduce.ProjectProgress,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleContentShow: () => {
      dispatch({
        type: "saveClick",
      });
      dispatch({
          type: 'MAP_SKETCH_VIEW_HIDE',
      });
      dispatch({
          type: 'handleProjectProgress',
      });
      //console.log(appConfig.fileServiceRootPath + '/project/list')
      fetch(appConfig.fileServiceRootPath + '/project/list')
      .then(response => response.json())
      .then( json => {
        dispatch({
          type: 'handleContentShow',
          payload: json,
        })
        //console.log(json)
        dispatch({
          type: 'handleProjectProgress',
        }) 
      })
      .catch(e =>{        
        console.log("Oops, error", e)
        dispatch({
          type: 'handleProjectProgress',
        }) 
        dispatch({
          type: 'handleProjectFalse',
        })
      })
    },

    handleContentClose: () => {
      dispatch({
        type: 'handleContentClose',
      })
    },
    
    handleProjectFalse: () => {
      dispatch({
        type: 'handleProjectFalse',
      })
    },
    
    handleProjectTrue: () => {
      dispatch({
        type: 'handleProjectTrue',
      })
      

    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { name: 'ProjectModule' })(ProjectModule));
//Reducer 
const ProjectReduce = (
  state = {
    inputItems: [],
    ContentShow: false,
    ProjectFalse:false,
    ProjectTrue:false,
    ProjectProgress:false
  }, action) => {

  let newState = JSON.parse(JSON.stringify(state))

  // if(action.type==="handleAddItem"){
  //   const uuidv4 = require('uuid/v4');
  //   let IdNumber = uuidv4();

  //   newState.IdNumber = IdNumber;
  //   newState.showDialog = !state.showDialog;
  //   newState.inputItems.push({text:action.payload,key:IdNumber,checked:false})
  //   return { ...state, ...newState };
  // }

  // if(action.type==="handleChooseList"){
  //   let listItems = newState.inputItems.map( todo => {
  //     if ( todo.key === action.id ) {
  //       return {
  //         ...todo, 
  //         checked: !todo.checked
  //       }
  //     }
  //     return todo;
  //   })
  //   newState.inputItems = listItems
  //   return { ...state, ...newState };
  // }

  // if(action.type==="handleShowDialog"){
  //   const showDialog ={showDialog: !state.showDialog} 
  //   return Object.assign({},state,{... showDialog})
  // }

  // if(action.type==="handleRequestClose"){
  //   const showDialog ={showDialog: !state.showDialog} 
  //   return Object.assign({},state,{... showDialog})
  // }

  // if(action.type==="handleShowDelDialog"){
  //   const showDelDialog ={showDelDialog: !state.showDelDialog} 
  //   return Object.assign({},state,{... showDelDialog})
  // }

  // if(action.type==="handleCloseDelDialog"){
  //   const showDelDialog ={showDelDialog: !state.showDelDialog} 
  //   return Object.assign({},state,{... showDelDialog})
  // }

  // if(action.type==="handleDeleteCard"){
  //   const inputItems = state.inputItems
  //   newState.showDelDialog = !state.showDelDialog;
  //   let listItems = newState.inputItems.filter( (todo) =>{return todo.checked === false } )
  //   newState.inputItems = listItems
  //   return { ...state, ...newState };
  // }

  // if(action.type==="handleSwitchChange"){
  //   newState.SwitchChecked = !state.SwitchChecked
  //   newState.ButtonDisabled = !state.ButtonDisabled
  //   return { ...state, ...newState };
  // }

  if (action.type === "handleContentShow") {
    //console.log('Project Module ...')
    let list = [];
    newState.inputItems = list.slice(0);
    
    list = JSON.parse(action.payload.data);
    let sta0 = JSON.parse(action.payload.status);
   
    if(sta0 !== 200)
      {newState.ProjectFalse = !state.ProjectFalse}
    else
      {
        // newState.inputItems = list.slice(0);
        for(let i = 0;i<list.length;i++)
          {
            const uuidv4 = require('uuid/v4');
            let Id = uuidv4();
            newState.inputItems.push({text:list[i],key:Id})
          }
        newState.ContentShow = !state.ContentShow;
      }
    return { ...state, ...newState }; 
  }

  if (action.type === "handleProjectProgress") {
    const ProjectProgress = { ProjectProgress: !state.ProjectProgress }
    return Object.assign({}, state, { ...ProjectProgress })
  }
  
  if (action.type === "handleContentClose") {
    const ContentShow = { ContentShow: !state.ContentShow }
    return Object.assign({}, state, { ...ContentShow })
  }
  
  if (action.type === "handleProjectTrue") {
    const ProjectTrue = { ProjectTrue: !state.ProjectTrue }
    return Object.assign({}, state, { ...ProjectTrue })
  }
    
  if (action.type === "handleProjectFalse") {
    const ProjectFalse = { ProjectFalse: !state.ProjectFalse }
    return Object.assign({}, state, { ...ProjectFalse })
  }
  
  if (action.type === "handleChooseItem") {
    let list0 = [];
    let sta = JSON.parse(action.payload.status)
    let Prolist = [];
    list0 = JSON.parse(action.payload.data);
    Prolist = action.itemName;
   
    projectData.ProjectName = Prolist;
    projectData.ProjectItem = list0[0];
    
    projectData.Loaded = ! projectData.Loaded;
   
    newState.ContentShow = !state.ContentShow;
    
    if(sta === 200)
      newState.ProjectTrue = !state.ProjectTrue
    else
      newState.ProjectFalse = !state.ProjectFalse
    
     return { ...state, ...newState }; 
  }

  if(action.type === 'handleProjectTrue2'){
    newState.ProjectTrue = !state.ProjectTrue
    return { ...state, ...newState }; 
  }
  
  else
    return state
}

RootReducer.merge(ProjectReduce);


