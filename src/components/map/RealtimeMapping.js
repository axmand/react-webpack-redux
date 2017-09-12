import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import UI
import { withStyles } from 'material-ui/styles'
import {ListItem} from 'material-ui/List';
import Switch from 'material-ui/Switch';
import Typograghy from 'material-ui/Typography'

const styles ={
  listItem: {
    flexDirection: 'column',
    padding: '0px',
    width: '58px',
    height: '90px',
    border: 0,
    background: 'rgba(0, 0, 0, .6)',
    borderRadius: 5,
  },
  text:{
    fontSize:'18px',
    color:'#b3b3b3'
},
bar:{},
checked:{
  color:'	#B3D9D9',
  '& + $bar': {
    background: '	#B3D9D9',
  },
}

}

class RealtimeMapping extends Component {

  render() {
    const { classes, realtimeMappingIsChecked, handleRealtimeMapping}=this.props;

    return (
      <ListItem className={classes.listItem}>
        <Switch
          classes={{
            checked:classes.checked,
            bar:classes.bar
          }}
          checked={realtimeMappingIsChecked}
          onChange={handleRealtimeMapping}          
          aria-label="RealtimeMappingCheckBox"
        />
        <Typograghy className={classes.text}>实时<br/>成图</Typograghy>
      </ListItem>
    );
  }
}

RealtimeMapping.propTypes = {
  classes: PropTypes.object.isRequired,
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