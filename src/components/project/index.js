import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types';
//UI
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Dialog, { DialogContent,DialogContentText } from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
//图标
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';
import FolderOpenIcon from 'material-ui-icons/FolderOpen';
//自定义组件
import ProjectCard from './ProjectCard'
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
		width: '50%',
		height: '50%',
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
    marginLeft: 50
  },
  prompt:{
    width: '300px',
    height: '400px',
    marginTop: 20,
    marginLeft: 50
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
          transition={<Slide direction="up" />}
        >
          <AppBar position="static">
            <Toolbar>
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
  handleProjectTrue:PropTypes.func.isRequired,
  handleProjectFalse:PropTypes.func.isRequired,
};

//声明State与Action
const mapStateToProps = (state, ownProps) => {

  return {
    ContentShow: state.ProjectReduce.ContentShow,
    ProjectTrue: state.ProjectReduce.ProjectTrue,
    ProjectFalse: state.ProjectReduce.ProjectFalse,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleContentShow: () => {
      fetch('http://172.16.102.90:1338//project/list')
      .then(response => response.json())
      .then( json => {
        dispatch({
          type: 'handleContentShow',
          payload: json,
        })
        console.log(json)
      })
      .catch(e => console.log("Oops, error", e))
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
    console.log('Project Module ...')
    let list = [];
    list = JSON.parse(action.payload.data);
    // for(let i = 0;i<list.length;i++)
    //   {
    //     const uuidv4 = require('uuid/v4');
    //     let Id = uuidv4();
    //     newState.inputItems.push({text:list[i],key:Id})
    //   }
    newState.inputItems = list.slice(0);
    newState.ContentShow = !state.ContentShow;
    return { ...state, ...newState }; 
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
    projectData.ProjectItem = list0.slice(0);
    projectData.Loaded = ! projectData.Loaded;
   
    newState.ContentShow = !state.ContentShow;
    
    if(sta === 200)
      newState.ProjectTrue = !state.ProjectTrue
    else
      newState.ProjectFalse = !state.ProjectFalse
    
     return { ...state, ...newState }; 
  }

  else
    return state
}

RootReducer.merge(ProjectReduce);


