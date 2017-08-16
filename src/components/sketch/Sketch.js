import React, {Component} from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles} from 'material-ui/styles'
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs'
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';
//import component
// import Map from '../map/Map';
import SketchToolBar from './SketchToolBar';

const styles ={
  root: {
    position: 'absolute',
    zIndex: '999990',
    width: '91.6%',
  },
  tab: {    
    padding: '0px',
    height:'30px'    
  },
  label: {
    fontSize: '20px',
  },
  button: {
    position: 'absolute',
    zIndex: '999999',
    right: '0px',
  },
};

class Sketch extends Component {

  state = {
    index: 0,
  }

  handleChange = (event, index) => {
    this.setState({ index })
  }

  render() {  
    const {
      classes,
      onClick,
    } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="static" color='default'>
          <Tabs          
            index={this.state.index}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab 
              classes={{label: this.props.classes.label }}                      
              label="草图编辑" 
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
            <SketchToolBar />}
        {this.state.index === 1 &&
          <div>
            {'Item Two'}
          </div>}
      </div>            
    )
  }
}

Sketch.propTypes = {
  onClick: PropTypes.func.isRequired,
};
/**
 * 
 * @param {*} state 
 *
 */
const mapStateToProps = ( state ) => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {
    return {
      onClick: () => {
          dispatch({
              type: 'MAP_SKETCH_VIEW_SWITCH',
          })
      },
    }
}

export default withStyles(styles,{name:'Sketch'})(connect(mapStateToProps, mapDispatchToProps)(Sketch))