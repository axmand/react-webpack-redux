import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
//UI
//图标
//img
//自定义
import ShowCard from './ShowCard';
import appConfig from "../../redux/Config"
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
            handleChooseItem,
            handleContentClose2,
            classes
		} = this.props
    
    return (
    <div>
      <div className = {classes.box}>
        {inputItems.map( todo => 
          <ShowCard
          {...todo} 
          entries = { todo }
          handleContentClose2 = { () => handleContentClose2() } 
          handleChooseItem = { () => handleChooseItem(appConfig.fileServiceRootPath + '//project/Open/' + todo.text) }
          />
        )}
      </div>
    </div>
  );
  }
}

ProjectCard.propTypes = {
  inputItems: PropTypes.array.isRequired,
  handleChooseItem:PropTypes.func.isRequired,
  handleContentClose2:PropTypes.func.isRequired
};

//声明state和方法
const mapStateToProps = (state,ownProps) => {
  return {
      inputItems: state.ProjectReduce.inputItems,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleChooseItem:( ProjectUrl )=>{
      fetch(ProjectUrl)
      .then(response => response.json())
      .then( json => {
        dispatch({
          type: 'handleChooseItem',
          payload: json,
          itemName: ProjectUrl.slice(40),
          ProjectUrl
        })
        console.log(json)
        setTimeout(() => {
          dispatch({
              type:'handleProjectTrue2'
          }
        )}, 500);
      })
      .catch(e => console.log("Oops, error", e))
    },
    
    handleContentClose2:()=>{
      dispatch({
        type:'handleContentClose2',
      })
    },
	} 
}  		

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles,{name:'ProjectCard'})(ProjectCard));