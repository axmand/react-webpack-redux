import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
//UI
//图标
//img
//自定义
import ShowCard from './ShowCard';
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

class ProjectCard extends Component {
  render(){
    const { inputItems,
          //  IdNumber,
          //  showDialog,
          //  handleAddItem,
          //  handleShowDialog,
          //  handleRequestClose,
          // handleChooseList,
            handleContentClose2,
            classes
		} = this.props
    
    const uuidv4 = require('uuid/v4');
    let Id = uuidv4();
    
    return (
    <div>
      <div className = {classes.box}>
        {inputItems.map( todo => 
          <ShowCard
          {...todo} 
          entries = { todo }
         // Id = {}
          handleContentClose2={ () => handleContentClose2() } 
          />
        )}
      </div>
    </div>
  );
  }
}

ProjectCard.propTypes = {
  inputItems: PropTypes.array.isRequired,
 // IdNumber: PropTypes.string.isRequired,
//  showDialog: PropTypes.bool.isRequired,
 // handleAddItem:PropTypes.func.isRequired,
 // handleShowDialog:PropTypes.func.isRequired,
 // handleRequestClose:PropTypes.func.isRequired,
 // handleChooseList:PropTypes.func.isRequired,
  handleContentClose2:PropTypes.func.isRequired
};

//声明state和方法


const mapStateToProps = (state,ownProps) => {
  return {
      inputItems: state.ProjectReduce.inputItems,
      IdNumber: state.ProjectReduce.IdNumber,
      showDialog: state.ProjectReduce.showDialog,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // handleAddItem:()=>{
    //   dispatch({
    //      type: 'handleAddItem',
    //      payload: { inputValue:inputName },
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
    
    handleContentClose2:()=>{
      dispatch({
        type:'handleContentClose2',
      })
    },
	} 
}  		

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles,{name:'ProjectCard'})(ProjectCard));