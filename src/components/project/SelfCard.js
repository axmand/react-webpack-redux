import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
//UI
import Button from 'material-ui/Button';
import Dialog,{ DialogActions, DialogContent,DialogTitle } from 'material-ui/Dialog';
import Input from 'material-ui/Input';
//图标
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
//img
//自定义
import AddCard from './AddCard';
//Redux
import RootReducer from './../../redux/RootReducer';
import {connect} from 'react-redux'

class SelfCard extends Component {

  onChanged=(e)=>
  {
    inputName = e.target.value;
  }

  render(){
    const { inputItems,
            IdNumber,
            showDialog,
            handleAddItem,
            handleShowDialog,
            handleRequestClose,
            ChooseList,
            handleChooseList,
		} = this.props

    return (
    <div>
      <AddCard entries = { inputItems }  handleChooseList={ () => handleChooseList(IdNumber) }/>
     
      <IconButton onClick = { handleShowDialog } 
                  style = {{  width: '300px',
                              height: '300px',
                              padding: '14px 16px 15px',
                              margin: '0px',}}>
        <AddIcon/>
      </IconButton>
     
      <Dialog
          open={ showDialog } 
          onRequestClose={ handleRequestClose }
      >
        <DialogTitle>
            请输入项目名称
        </DialogTitle>
        <DialogContent>
          <Input type="text" ref="NameInput"  onChange={this.onChanged} placeholder="权利人+宗地代码等"/>
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleRequestClose } color="default">
              取消
          </Button>
          <Button onClick={ handleAddItem } color="primary">
              确认
          </Button>
        </DialogActions>
      </Dialog>      
    </div>
  );
  }
}

SelfCard.propTypes = {
  inputItems: PropTypes.array.isRequired,
  IdNumber: PropTypes.string.isRequired,
  showDialog: PropTypes.bool.isRequired,
  handleAddItem:PropTypes.func.isRequired,
  handleShowDialog:PropTypes.func.isRequired,
  handleRequestClose:PropTypes.func.isRequired,
  ChooseList: PropTypes.array.isRequired,    
  handleChooseList:PropTypes.func.isRequired,
};

//声明state和方法
let inputName  =  "";

const mapStateToProps = (state,ownProps) => {
  return {
      inputItems: state.SelfCardReduce.inputItems,
      IdNumber: state.SelfCardReduce.IdNumber,
      showDialog: state.SelfCardReduce.showDialog,
      ChooseList: state.SelfCardReduce.ChooseList,  
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleAddItem:()=>{
      dispatch({
         type: 'handleAddItem',
         payload: { inputValue:inputName },
			})
    },
    
    handleChooseList:()=>{
        dispatch({
          type: 'handleChooseList',
				})
			},
    
    handleShowDialog:()=>{
      dispatch({
         type: 'handleShowDialog',
			})
    },
    
    handleRequestClose:()=>{
      dispatch({
         type: 'handleRequestClose',
			})
		},
	} 
}  		

export default connect(mapStateToProps, mapDispatchToProps)(SelfCard);

//Reducer
const SelfCardReduce =(
  state={
    inputItems: [],
    IdNumber: '',
    showDialog: false,
    ChooseList: [],
  },action)=>{
    if(action.type==="handleAddItem"){
      const newState = JSON.parse(JSON.stringify(state))
      const uuidv4 = require('uuid/v4');
      let IdNumber = uuidv4();
      
      newState.IdNumber = IdNumber;
      newState.showDialog = !state.showDialog;
      newState.inputItems.push({text:action.payload,key:IdNumber})
      return { ...state, ...newState };
    }

    if(action.type==="handleChooseList"){
      const newState = JSON.parse(JSON.stringify(state))
      let IdNumber = state.IdNumber
      newState.IdNumber = IdNumber;
      newState.ChooseList.splice(-1,0,IdNumber)
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
      
    else
      return state
}
  
RootReducer.merge(SelfCardReduce);
