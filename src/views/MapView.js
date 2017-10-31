import React, {Component} from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles'

import RootReducer from '../redux/RootReducer';
import Map from '../components/map/Map'
import Sketch from '../components/sketch/Sketch'
import projectData from './../redux/RootData';

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
    } = this.props
		// console.log(sketchDisplayState)	
    return (
      <div className={classes.root}>
        {sketchDisplayState && <Sketch /> }
        {projectDataLoadState && <Map isRealtimeOn={isRealtimeOn} />}
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
      if(projectData.Loaded === false)
        alert("请选择项目！");
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
    projectDataLoadState: projectData.Loaded,
  }
}

export default withStyles(styles)(connect(mapStateToProps)(MapView));