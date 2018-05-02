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

      dispatch({
            type: 'handleProjectProgress',
      })
      
      var promises = [appConfig.fileServiceRootPath + '/project/importpoint/'+ProjectUrl.slice(36),appConfig.fileServiceRootPath + '/project/importline/'+ProjectUrl.slice(36),appConfig.fileServiceRootPath + '/project/importpolygon/'+ProjectUrl.slice(36),ProjectUrl].map(url => fetch(url).then(y => y.json()));
      Promise.all(promises).then(results => {
        dispatch({
          type:'handleChooseItem',
          payload:results,
          itemName: ProjectUrl.slice(36),
          ProjectUrl
        })
        dispatch({
          type: 'handleProjectProgress',
        }) 
        dispatch({
          type:'handleProjectTrue'
        })
      })
      .catch(e => {
        dispatch({
          type: 'handleProjectProgress',
        }) 
        dispatch({
          type: 'handleProjectFalse',
        })
        console.log("Oops, error", e)
    });
      
    //   fetch(appConfig.fileServiceRootPath + '/project/importpoint/'+ProjectUrl.slice(36))
    //   .then(response => response.json())
    //   .then( json => {
    //     dispatch({
    //       type: 'Read_DT_Point',
    //       payload: json.data,
    //     })
    //   })
    //   .catch(e => {
    //     console.log("Oops, error", e)
    //   })
      
    //   fetch(appConfig.fileServiceRootPath + '/project/importline/'+ProjectUrl.slice(36))
    //   .then(response => response.json())
    //   .then( json => {
    //     dispatch({
    //       type: 'Read_DT_Line',
    //       payload: json.data,
    //     })
    //   })
    //   .catch(e => {
    //     console.log("Oops, error", e)
    //   })
      
    //   fetch(appConfig.fileServiceRootPath + '/project/importpolygon/'+ProjectUrl.slice(36))
    //   .then(response => response.json())
    //   .then( json => {
    //     dispatch({
    //       type: 'Read_DT_Polygon',
    //       payload: json.data,
    //     })
    //   })
    //   .catch(e => {
    //     console.log("Oops, error", e)
    //   })

    //   fetch(ProjectUrl)
    //   .then(response => response.json())
    //   .then( json => {
    //     dispatch({
    //       type: 'handleChooseItem',
    //       payload: json,
    //       itemName: ProjectUrl.slice(36),
    //       ProjectUrl
    //     })

    //     dispatch({
    //       type: 'handleProjectProgress',
    //     }) 
        
    //     dispatch({
    //           type:'handleProjectTrue'
    //     })

    //     // setTimeout(() => {
    //     //   dispatch({
    //     //       type:'handleProjectTrue'
    //     //   }
    //     // )}, 500);
    //   })
    //   .catch(e => {
    //     dispatch({
    //       type: 'handleProjectProgress',
    //     }) 
        
    //     dispatch({
    //     type: 'handleProjectFalse',
    //     })
    //     console.log("Oops, error", e)
    // })


    },
    
    handleContentClose2:()=>{
      dispatch({
        type:'handleContentClose2',
      })
    },
	} 
}  		

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles,{name:'ProjectCard'})(ProjectCard));