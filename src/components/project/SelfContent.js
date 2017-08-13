import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
//UI
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import Dialog,{ DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import Switch from 'material-ui/Switch';
import Button from 'material-ui/Button';
//自定义组件
import SelfCard from './SelfCard'
//Redux
import {connect} from 'react-redux'
import RootReducer from './../../redux/RootReducer';

class SelfContent extends Component {

  render() {
    const { handleDelete,handleShowDelDialog,showDelDialog,handleCloseDelDialog } = this.props
    
    return (
      <div>
        <FormControlLabel
          control={
            <Switch/>
          }
          label="编辑"
        />
       <FormLabel>
          <Button onClick={ handleShowDelDialog }>删除</Button>
          <Button>完成</Button>
       </FormLabel>
      
       <Dialog
          open={ showDelDialog }
          onRequestClose={ handleCloseDelDialog }
       >
          <DialogContent>
            <DialogContentText>
              确定删除所选项目？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={ handleCloseDelDialog } color="default">
              取消
            </Button>
            <Button onClick={ handleDelete } color="primary">
              确认
            </Button>
          </DialogActions>
       </Dialog>
       <SelfCard/>
      </div>
    );
  }
}

SelfContent.propTypes = {
  handleDelete:PropTypes.func.isRequired,
  handleCloseDelDialog:PropTypes.func.isRequired,
  handleShowDelDialog:PropTypes.func.isRequired,
  showDelDialog:PropTypes.bool.isRequired,
}

//声明State与Action
const mapStateToProps = (state,ownProps) => {

  return {
     showDelDialog: state.ProjectReduce.showDelDialog,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDelete:()=>{
      dispatch({
         type: 'handleDelete',
			})
    },

    handleShowDelDialog:()=>{
      dispatch({
         type: 'handleShowDelDialog',
			})
    },

    handleCloseDelDialog:()=>{
      dispatch({
         type: 'handleCloseDelDialog',
			})
    },
	} 
}  		

export default connect(mapStateToProps, mapDispatchToProps)(SelfContent);


//Reducer
const ProjectReduce =(
  state={
    inputItems: [],
    IdNumber: '',
    showDialog: false,
    showDelDialog: false,
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

    if(action.type==="handleDelete"){
      const inputItems = state.inputItems
      newState.showDelDialog = !state.showDelDialog;
      let listItems = newState.inputItems.filter( (todo) =>{return todo.checked === false } )
      newState.inputItems = listItems
      return { ...state, ...newState };
    }
    
    else
      return state
}
  
RootReducer.merge(ProjectReduce);
