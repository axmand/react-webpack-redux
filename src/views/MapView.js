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
    } = this.props
		// console.log(sketchDisplayState)	
    return (
      <div className={classes.root}>
        {sketchDisplayState && <Sketch /> }
        <Map />
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

const mapViewReduce = (state = {sketchDisplayState: true}, action) => {
  switch(action.type) {
    case 'MAP_SKETCH_VIEW_SWITCH':
      const newState = {
        sketchDisplayState: !state.sketchDisplayState
      }
      return { ...state, ...newState}
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

  const mapViewState = state.mapViewReduce

  return {
    sketchDisplayState: mapViewState.sketchDisplayState
  }
}

export default withStyles(styles)(connect(mapStateToProps)(MapView));