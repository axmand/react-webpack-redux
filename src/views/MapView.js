import React, {Component} from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles'

import RootReducer from '../redux/RootReducer';
import Map from '../components/map/Map'
import Sketch from '../components/sketch/Sketch'
// import projectData from './../redux/RootData';

const styles = {
  root: {
    width: '100%',
    height: '100%',
  },
}

class MapView extends Component {

  render() {  
		const { 
      sketchDisplayState,
      classes,
      isRealtimeOn,
      projectDataLoadState,
      LayersData,
      DT_Point,
      DT_Line,
      DT_Polygon,
    } = this.props
		// console.log(sketchDisplayState)	
    return (
      <div className={classes.root}>
        {sketchDisplayState && <Sketch/> }
        {projectDataLoadState && <Map 
        isRealtimeOn={isRealtimeOn} 
        LayersData={LayersData}
        DT_Point={DT_Point}
        DT_Line={DT_Line}
        DT_Polygon={DT_Polygon}
         />}
      </div>
    )
  }
  
}

/**
 * 限定组件的一些属性
 */
MapView.PropTypes={
	sketchDisplayState: PropTypes.bool.isRequired,
}

const mapViewReduce = (state = {sketchDisplayState: false}, action) => {
  let newState = JSON.parse(JSON.stringify(state))

  switch(action.type) {
    case 'MAP_SKETCH_VIEW_SWITCH':
      if(action.payload.Loaded === false)
        alert("Error_import_002:请选择项目！");
      else
        { newState.sketchDisplayState =  !state.sketchDisplayState }
    return { ...state, ...newState }; 
    case 'MAP_SKETCH_VIEW_HIDE':
      if(state.sketchDisplayState === true)
        { newState.sketchDisplayState =  false }
      return { ...state, ...newState }; 
    default:
      return state
  }
}

RootReducer.merge(mapViewReduce);

/**
 * 
 * @param {*} state 
 *
 */
const mapStateToProps = ( state ) => {
  return {
    sketchDisplayState:  state.mapViewReduce.sketchDisplayState,
    isRealtimeOn: state.sketchReduce.isRealtimeOn,
    projectDataLoadState: state.ProjectReduce.projectData.Loaded,
    LayersData: state.ProjectReduce.projectData.ProjectItem.L,
    DT_Point:state.ProjectReduce.projectData.Project_DT_Point,
    DT_Line:state.ProjectReduce.projectData.Project_DT_Line,
    DT_Polygon:state.ProjectReduce.projectData.Project_DT_Polygon
  }
}

export default withStyles(styles)(connect(mapStateToProps)(MapView));