import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
//UI

import Dialog from 'material-ui/Dialog';
// import Slide from 'material-ui/transitions/Slide';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
//图标
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import ClearIcon from 'material-ui-icons/Clear';
//自定义
import AddPhoto from './AddPhoto';
import CameraWrapper from './CameraWrapper.js'
//Redux
import {connect} from 'react-redux'
// import projectData from './../../redux/RootData';

const styles = {
  box:{
    display: 'flex',
    flexFlow: 'row wrap',
    alignContent: 'spaceAround',
    flexBasis: 'auto',
    padding: '10px',   
  },
  flex: {
    flex: 1,
  },
};

class PhotoContent extends Component {
  
  render(){
    const {
      handleCardClose,
      handleCardShow,
      handleChoosePhoto,
      CardShow,
      classes,
      PhotoItemTest,
      projectData
		} = this.props

    console.log(PhotoItemTest)

    return (
    <div>
      <div className = {classes.box}>
        {PhotoItemTest.map( todo => 
          <AddPhoto
          {...todo} 
          handleChoosePhoto={ () => handleChoosePhoto(todo.key) }
          entries = { 'data:image/jpeg;base64,'+todo.text }
          keys = { todo.key }
          />
        )}
       
        <IconButton onClick = { handleCardShow } 
          style = {{  width: '150px',
                      height: '200px',
                      padding: '14px 16px 15px',
                      margin: '0px',}}>
          <AddIcon/>
        </IconButton>
      </div>  
      
      <Dialog
          fullScreen
          open={CardShow}
          onRequestClose={handleCardClose}
        >
          <AppBar position="static" style ={{backgroundColor:"#455A64"}}>
            <Toolbar>
              <Typography type="title" color="inherit" className={classes.flex}>
                现场指界
              </Typography>
              <IconButton color="contrast" onClick={handleCardClose} aria-label="Delete">
                <ClearIcon />
              </IconButton>
            </Toolbar>
          </AppBar>   
          <CameraWrapper projectData ={projectData} PhotoItemTest ={PhotoItemTest}/>
      </Dialog>       
    </div>
  );
  }
}

PhotoContent.propTypes = {
  handleCardClose:PropTypes.func.isRequired,
  handleCardShow:PropTypes.func.isRequired,
  handleChoosePhoto:PropTypes.func.isRequired,
  CardShow:PropTypes.bool.isRequired,
  PhotoItemTest:PropTypes.array.isRequired,
};

//声明state和方法

const mapStateToProps = (state,ownProps) => {
  return {
   CardShow: state.BoundaryReduce.CardShow,
   PhotoItemTest: state.BoundaryReduce.PhotoItemTest,
   projectData: state.ProjectReduce.projectData
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleCardClose:()=>{
      //关闭对话框
      dispatch({
         type: 'handleCardClose',
			})
    },

    handleCardShow:()=>{
      //显示对话框
      dispatch({
         type: 'handleCardShow',
			})
    },
    
    handleChoosePhoto:(id)=>{
      //选中照片
        dispatch({
          type: 'handleChoosePhoto',
          id
        }),
        //将选中照片的属性存储在项目state中
        dispatch({
          type: 'ChoosePhoto2projectData',
          payload:{ownProps:ownProps}
        })
    },
	} 
}  		

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles,{name:'PhotoContent'})(PhotoContent));