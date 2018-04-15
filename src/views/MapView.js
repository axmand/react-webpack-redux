import React, {Component} from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles'

import RootReducer from '../redux/RootReducer';
import Map from '../components/map/Map'
import Sketch from '../components/sketch/Sketch'

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
      projectData
    } = this.props
		// console.log(sketchDisplayState)	
    return (
      <div className={classes.root}>
        {sketchDisplayState && <Sketch MapData={projectData}/> }
        {projectDataLoadState && <Map isRealtimeOn={isRealtimeOn} MapData={projectData} />}
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
    console.log(action.payload.Loaded)
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

  const mapViewState = state.mapViewReduce;
  const sketchState = state.sketchReduce;

  return {
    sketchDisplayState: mapViewState.sketchDisplayState,
    isRealtimeOn: sketchState.isRealtimeOn,
    projectDataLoadState:state.ProjectReduce.projectData.Loaded,
    projectData: state.ProjectReduce.projectData
  }
}

export default withStyles(styles)(connect(mapStateToProps)(MapView));