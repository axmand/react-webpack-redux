import React, {Component} from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RootReducer from './../../redux/RootReducer';

import { withStyles} from 'material-ui/styles'
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs'
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';
import Snackbar from 'material-ui/Snackbar';
//import component
// import Map from '../map/Map';
import SketchToolBar from './SketchToolBar';
import ThematicMap from './ThematicMap';

const styles ={
  root: {
    position: 'absolute',
    zIndex: '999990',
    width: '91.6%',
  },
  tab: {    
    padding: '0px',
    height:'7.5%'    
  },
  label: {
    fontSize: '20px',
  },
  button: {
    position: 'absolute',
    zIndex: '999990',
    right: '0px',
  },
};
let isOpen;
class Sketch extends Component {

  state = {
    index: 0,
  }

  handleChange = (event, index) => {
    this.setState({ index })
  }

  render() {  
    const {classes,onClick,onResetSketchState} = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static" color='default'>
          <Tabs          
            value={this.state.index}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab 
              classes={{label: this.props.classes.label }}                      
              label="草图编辑" 
              onClick={onResetSketchState}
            />
            <Tab 
              classes={{label: this.props.classes.label}}           
              label="专题图编辑"
            />    
          </Tabs>
          <IconButton className={classes.button} aria-label="Delete" onClick={onClick}>
            <ClearIcon />
          </IconButton>
        </AppBar>
        {this.state.index === 0 &&
          <SketchToolBar />
        }
        {this.state.index === 1 &&
          <ThematicMap />
        }
      </div>            
    )
  }
}

Sketch.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onResetSketchState:PropTypes.func.isRequired,
};

/**
 * 
 * @param {*} state 
 *
 */
const mapStateToProps = ( state ) => {
  const sketchState=state.sketchReduce;
  return {
    saveIsChecked:sketchState.saveIsChecked,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      onClick: () => {
          dispatch({
              type: 'MAP_SKETCH_VIEW_SWITCH',
          })
      },
      onResetSketchState:()=>{
        dispatch({
          type:'resetSketchState'
        })
      },
    }
}

export default withStyles(styles,{name:'Sketch'})(connect(mapStateToProps, mapDispatchToProps)(Sketch))