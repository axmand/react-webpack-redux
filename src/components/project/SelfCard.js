import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
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
import {connect} from 'react-redux'

const styles = {
  box:{
    display: 'flex',
    flexFlow: 'row wrap',
    alignContent: 'spaceAround',
    flexBasis: 'auto',
    padding: '10px',   
  }
};

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
            handleChooseList,
            classes
		} = this.props

    return (
    <div>
      <div className = {classes.box}>
        {inputItems.map( todo => 
          <AddCard
          {...todo} 
          entries = { todo }
          handleChooseList={ ()=> handleChooseList(todo.key) } 
          />
        )}
       
        <IconButton onClick = { handleShowDialog } 
          style = {{  width: '300px',
                      height: '300px',
                      padding: '14px 16px 15px',
                      margin: '0px',}}>
          <AddIcon/>
        </IconButton>
      </div>
     
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
  handleChooseList:PropTypes.func.isRequired,
};

//声明state和方法
let inputName  =  "";

const mapStateToProps = (state,ownProps) => {
  return {
      inputItems: state.ProjectReduce.inputItems,
      IdNumber: state.ProjectReduce.IdNumber,
      showDialog: state.ProjectReduce.showDialog,
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

    handleChooseList:(id)=>{
        dispatch({
          type: 'handleChooseList',
          id
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles,{name:'SelfCard'})(SelfCard));
