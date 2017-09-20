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
 
  constructor(props) {
    super(props);
  }
 
  render(){
    const { inputItems,
            handleChooseItem,
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
          handleContentClose2 = { () => handleContentClose2() } 
          handleChooseItem = { () => handleChooseItem('http://172.16.102.90:1338//project/Open/' + todo) }
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