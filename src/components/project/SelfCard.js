import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  state = {
    anchorEl: undefined,
    open: false,
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  }
  
  handleOpen = () => {
    this.setState({ open: true });
  };
  
  onChanged=(e)=>
  {
    inputName=e.target.value;
 
  }

  render(){
    const { inputItems,
            handleAddItem
		} = this.props

    return (
    <div>
      <AddCard entries={inputItems}/>
     
      <IconButton onClick = {this.handleClick} 
                  style = {{  width: '300px',
                              height: '300px',
                              padding: '14px 16px 15px',
                              margin: '0px',}}>
        <AddIcon button/>
      </IconButton>
     
      <Dialog
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
      >
        <DialogTitle>
            请输入项目名称
        </DialogTitle>
        <DialogContent>
          <Input type="text" ref="NameInput"  onChange={this.onChanged} placeholder="权利人+宗地代码等"/>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="default">
              取消
          </Button>
          <Button onClick={handleAddItem} color="primary">
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
	handleAddItem:PropTypes.func.isRequired,
};

//声明state和方法
let inputName = "";


const mapStateToProps = (state,ownProps) => {

  return {
      inputItems: state.SelfCardReduce.inputItems,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleAddItem:()=>{
      dispatch({
         type:'handleAddItem',
         payload: { inputValue:inputName }
			})
		},
	} 
}  		

export default connect(mapStateToProps, mapDispatchToProps)(SelfCard);

//Reducer
const SelfCardReduce =(
  state={
    inputItems: [],
  },action)=>{
    const newState = JSON.parse(JSON.stringify(state))
      newState.inputItems.splice(-1, 0, action.payload)
      if(action.type==="handleAddItem"){
        return { ...state, ...newState };
      }
      else
        return state
}
  
RootReducer.merge(SelfCardReduce);
