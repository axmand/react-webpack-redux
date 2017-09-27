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
import AddPhoto from './AddCard';
import CameraWrapper from './CameraWrapper.js'
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

class PhotoContent extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleClick = event => {
    this.setState({ open: true })
  }
 
  handleRequestClose = event => {
    this.setState({ open: false })
  }
  
  render(){
    const {
            classes
		} = this.props

    return (
    <div>
      <div className = {classes.box}>
        {inputItems.map( todo => 
          <AddPhoto
          {...todo} 
          entries = { todo }
          handleChooseList={ () => handleChooseList(todo.key) }
          handleContentClose2={ () => handleContentClose2() } 
          />
        )}
       
        <IconButton onClick = { this.handleClick } 
          style = {{  width: '150px',
                      height: '200px',
                      padding: '14px 16px 15px',
                      margin: '0px',}}>
          <AddIcon/>
        </IconButton>
      </div>  
      
      <Dialog
          fullScreen
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          transition={<Slide direction="up" />}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography type="title" color="inherit" className={classes.flex}>
                现场指界
              </Typography>
              <IconButton color="contrast" onClick={this.handleRequestClose} aria-label="Delete">
                <ClearIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
         
          <CameraWrapper/>
       
        </Dialog>       
    </div>
  );
  }
}

PhotoContent.propTypes = {

};

//声明state和方法

const mapStateToProps = (state,ownProps) => {
  return {
      PhotoCard: state.BoundaryReduce.PhotoCard,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // handleAddItem:()=>{
    //   dispatch({
    //      type: 'handleAddItem',
		// 	})
    // },

    // handleChooseList:(id)=>{
    //     dispatch({
    //       type: 'handleChooseList',
    //       id
		// 		})
    //   },

    // handleShowDialog:()=>{
    //   dispatch({
    //      type: 'handleShowDialog',
		// 	})
    // },
    
    // handleRequestClose:()=>{
    //   dispatch({
    //      type: 'handleRequestClose',
		// 	})
    // },
    
    // handleContentClose2:()=>{
    //   dispatch({
    //     type:'handleContentClose2',
    //   })
    // },
	} 
}  		

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles,{name:'PhotoContent'})(PhotoContent));