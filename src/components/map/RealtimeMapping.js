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
    flexDirection: "column",
    justifyContent: "center",
    padding: "0px",
    border: 0,
    background: "rgba(69, 90, 100, .6)",
    borderRadius: '6%',
  },
  text:{
    fontSize:'0.75em',
    color:"#fff",
    paddingBottom: '15%',
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
    const { classes, isRealtimeOn, handleRealtimeMapping}=this.props;

    return (
      <ListItem className={classes.listItem}>
        <Switch
          classes={{
            checked:classes.checked,
            bar:classes.bar
          }}
          checked={isRealtimeOn}
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
  isRealtimeOn: PropTypes.bool.isRequired,
  handleRealtimeMapping: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const sketchState = state.sketchReduce
    return {
      isRealtimeOn: sketchState.isRealtimeOn
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