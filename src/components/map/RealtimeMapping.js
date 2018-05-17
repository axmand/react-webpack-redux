import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import UI
import { withStyles } from 'material-ui/styles'
import {ListItem} from 'material-ui/List';
import Switch from 'material-ui/Switch';
import Typograghy from 'material-ui/Typography';


const styles =theme=>({
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
})

class RealtimeMapping extends Component {

  render() {
    const { 
      classes, 
      isRealtimeOn, 
      // plotListData,
      handleRealtimeMapping,
      // onjzdPlotClick
    } = this.props;

    return (
      <div>
        {/* 实时成图按钮 */}
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


      </div>
    );
  }
}

RealtimeMapping.propTypes = {
  classes: PropTypes.object.isRequired,
  isRealtimeOn: PropTypes.bool.isRequired,
  handleRealtimeMapping: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const sketchState = state.sketchReduce;
//获取实时成图开启关闭的状态值，用于控制按钮状态开启关闭
    return {
      isRealtimeOn: sketchState.isRealtimeOn,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //绑定按钮点击函数
    handleRealtimeMapping:()=>{
      dispatch({
        type:'handleRealtimeMapping'
      })
    },
  }
}  	

export default withStyles(styles,{name:'RealtimeMapping'})(connect(mapStateToProps, mapDispatchToProps)(RealtimeMapping))