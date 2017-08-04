import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
//UI
import Button from 'material-ui/Button';
import Dialog,{ DialogActions, DialogContent, DialogContentText,DialogTitle } from 'material-ui/Dialog';
import Card, { CardActions, CardMedia } from 'material-ui/Card';
//图标
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
//img
import reptileImage from './test.jpg';
//自定义
import AddCard from './AddCard';
//Redux
import RootReducer from './../../redux/RootReducer';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

class SelfCard0 extends Component {

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

  render(){
    const { inputElement,
            inputItems,
            handleAddItem
		} = this.props

    return (
    <div>
      <IconButton onClick = {this.handleClick} 
                  style = {{  width: '300px',
                              height: '300px',
                              padding: '14px 16px 15px',
                              margin: '0px',}}>
        <AddIcon button/>
      </IconButton>
      
      <AddCard entries={inputItems}/>
     
      <Dialog
          open={this.handleOpen}
          onRequestClose={this.handleRequestClose}
      >
        <DialogTitle>
            请输入项目名称
        </DialogTitle>
        <DialogContent>
          <input type="text" ref={(a) => this.inputElement = a} placeholder="权利人+宗地代码等"/>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="default">
              取消
          </Button>
          <Button  type="submit" onClick={handleAddItem} color="primary">
              确认
          </Button>
        </DialogActions>
      </Dialog>      
    </div>
  );
  }
}

SelfCard0.propTypes = {
  inputElement: PropTypes.string.isRequired,
  inputItems: PropTypes.array.isRequired,
	handleAddItem:PropTypes.func.isRequired,
};

//声明state和方法
const mapStateToProps = (state,ownProps) => {
  const SelfCardReducestate = state.SelfCardReduce;
  return {
      inputElement: state.inputElement,
      inputItems: state.inputItems,
      SelfCardReducestate: SelfCardReducestate
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleAddItem:()=>{
      dispatch({
         type:'handleAddItem'
			})
		},
	} 
}  		

export default connect(mapStateToProps, mapDispatchToProps)(SelfCard0);

//Reducer
const SelfCardReduce =(
  state={
    inputElement:'',
    inputItems: [],
  },action)=>{
    const nextstate = JSON.parse(JSON.stringify(state))
      if(action.type==="handleAddItem"){
  
        nextstate.inputItems.push(
        {
          text: state.inputElement,
          key: Date.now()
        }
        )
        nextstate.inputElement = "";
        console.log(state)
        console.log(nextstate)
        return nextstate;
      }
      // console.log(nextstate)
      return nextstate
}

  
RootReducer.merge(SelfCardReduce);
