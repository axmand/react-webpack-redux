import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import UI
import { withStyles } from 'material-ui/styles'
import {ListItem} from 'material-ui/List';
import Switch from 'material-ui/Switch';

const styles ={
  listItem: {
    flexDirection: 'column',
    padding: '0px',
    width: '40px',
    height: '90px',
    border: 0,
    background: 'rgba(255, 255, 255, .75)',
    borderRadius: 5,
  },
}

class RealtimeMapping extends Component {

  render() {
    const { classes, realtimeMappingIsChecked, handleRealtimeMapping}=this.props;

    return (
      <ListItem className={classes.listItem}>
        <Switch
          checked={realtimeMappingIsChecked}
          onChange={handleRealtimeMapping}          
          aria-label="RealtimeMappingCheckBox"
          styles={{
            width: '30px',
          }}
        />
        <span>实时<br/>成图</span>
      </ListItem>
    );
  }
}

RealtimeMapping.propTypes = {
  realtimeMappingIsChecked: PropTypes.bool.isRequired,
  handleRealtimeMapping: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const realtimeMappingState = state.realtimeMappingReduce
    return {
        realtimeMappingIsChecked: realtimeMappingState.realtimeMappingIsChecked
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleRealtimeMapping:()=>{
      dispatch({
        type:'handleRealtimeMapping'
      })
    }
  }
}  	

export default withStyles(styles,{name:'RealtimeMapping'})(connect(mapStateToProps, mapDispatchToProps)(RealtimeMapping))