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
    width: '60px', 
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
          onChange={handleRealtimeMapping}
          checked={realtimeMappingIsChecked}
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
  const RealtimeMappingState=state.realtimeMappingReduce
  return {
    realtimeMappingIsChecked: RealtimeMappingState.realtimeMappingIsChecked,
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