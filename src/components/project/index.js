import React, {Component} from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types';
//UI
import  { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Dialog, { DialogContent } from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
//图标
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';
import FontAwesome from 'react-fontawesome'
//自定义组件
import SelfContent from './SelfContent'
//redux
import {connect} from 'react-redux'
import RootReducer from './../../redux/RootReducer';

const styles= {
  listitem: {
    flexDirection: 'column',
    justifyContent: 'center ',
  },
  listItemText: {
    padding: '0px',
    lineHeight: '32px',
    padding: '2px',
    color: '#ffffff',
    fontFamily: "微软雅黑",
    fontWeight: 'bold',
  },
  AppBar:{
    root:{
      marginTop:30,
      width:'100%',
    },
    position: 'relative'
  },
  flex: {
     flex: 1,
  },
  dialog:{
    width: '850px',
    height: '650px',
    marginTop:20,
    marginLeft:100
  }
};

class ProjectModule extends Component {

  render() {
    const { handleContentClose,
            handleContentShow,
            ContentShow,
            classes
		} = this.props

    return (
        <div>
          <ListItem button className={ classes.listitem } disableGutters={ true } onClick={ handleContentShow }>
            <ListItemIcon>
              <FontAwesome
                name='folder-o'
                size='2x'
                style={{
                  width: '29.71px',
                  height: '32px',
                  margin: '0px',
                  padding: '2px',
                  color: '#C1C6C9',
                }}
              />
            </ListItemIcon>            
            <ListItemText
              primary="项目管理"
              disableTypography={ true }
              className={classes.listItemText}
            />
          </ListItem>
          
          <Dialog
            fullScreen
            className={classes.dialog}
            open={ ContentShow }
            onRequestClose={ handleContentClose }
            transition={<Slide direction="up" />}
          >
            <AppBar position="static">
              <Toolbar>
                <Typography type="title" color="inherit" className={classes.flex}>
                 项目管理
                </Typography>
                <IconButton color="contrast" onClick={ handleContentClose }  aria-label="Delete">
                   <ClearIcon />
                </IconButton>
              </Toolbar>
            </AppBar>

            <DialogContent style={{overflowY:'auto'}}>
              <SelfContent/>
            </DialogContent>
          </Dialog>
        </div>
    )
  }
}

ProjectModule.propTypes = {
  handleContentClose:PropTypes.func.isRequired,
  handleContentShow:PropTypes.func.isRequired,
  ContentShow:PropTypes.bool.isRequired
};

//声明State与Action
const mapStateToProps = (state,ownProps) => {

  return {
     ContentShow: state.ProjectReduce.ContentShow,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleContentShow:()=>{
      dispatch({
        type:'handleContentShow',
      })
    },

    handleContentClose:()=>{
      dispatch({
        type:'handleContentClose',
      })
    },
	} 
}  		

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles,{name: 'ProjectModule'})(ProjectModule));

//Reducer
const ProjectReduce =(
  state={
    inputItems: [],
    IdNumber: '',
    showDialog: false,
    showDelDialog: false,
    SwitchChecked: false,
    ContentShow: false,
    ButtonDisabled: true,
  },action)=>{
    
    let newState = JSON.parse(JSON.stringify(state))

    if(action.type==="handleAddItem"){
      const uuidv4 = require('uuid/v4');
      let IdNumber = uuidv4();
      
      newState.IdNumber = IdNumber;
      newState.showDialog = !state.showDialog;
      newState.inputItems.push({text:action.payload,key:IdNumber,checked:false})
      return { ...state, ...newState };
    }

    if(action.type==="handleChooseList"){
      let listItems = newState.inputItems.map( todo => {
        if ( todo.key === action.id ) {
          return {
            ...todo, 
            checked: !todo.checked
          }
        }
        return todo;
      })
      newState.inputItems = listItems
      return { ...state, ...newState };
    }
    
    if(action.type==="handleShowDialog"){
      const showDialog ={showDialog: !state.showDialog} 
      return Object.assign({},state,{... showDialog})
    }
      
    if(action.type==="handleRequestClose"){
      const showDialog ={showDialog: !state.showDialog} 
      return Object.assign({},state,{... showDialog})
    }
    
    if(action.type==="handleShowDelDialog"){
      const showDelDialog ={showDelDialog: !state.showDelDialog} 
      return Object.assign({},state,{... showDelDialog})
    }
    
    if(action.type==="handleCloseDelDialog"){
      const showDelDialog ={showDelDialog: !state.showDelDialog} 
      return Object.assign({},state,{... showDelDialog})
    }

    if(action.type==="handleDeleteCard"){
      const inputItems = state.inputItems
      newState.showDelDialog = !state.showDelDialog;
      let listItems = newState.inputItems.filter( (todo) =>{return todo.checked === false } )
      newState.inputItems = listItems
      return { ...state, ...newState };
    }
    
    if(action.type==="handleSwitchChange"){
      newState.SwitchChecked = !state.SwitchChecked
      newState.ButtonDisabled = !state.ButtonDisabled
      return { ...state, ...newState };
    }

    if(action.type==="handleContentShow"){
      const ContentShow ={ContentShow: !state.ContentShow} 
      return Object.assign({},state,{... ContentShow})
    }

    if(action.type==="handleContentClose"){
      const ContentShow ={ContentShow: !state.ContentShow} 
      return Object.assign({},state,{... ContentShow})
    }
    
    if(action.type==="handleContentClose2"){
      const ContentShow ={ContentShow: !state.ContentShow} 
      return Object.assign({},state,{... ContentShow})
    }
    else
      return state
}
  
RootReducer.merge(ProjectReduce);

