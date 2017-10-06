import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import IconButton from "material-ui/IconButton";
import ClearIcon from "material-ui-icons/Clear";
//import component
import SketchToolBar from "./SketchToolBar";
import ThematicMap from "./ThematicMap";

const styles = {
  root: {
    position: "absolute",
    zIndex: "999990",
    width: "91.6%"
  },
  tabs: {
    padding: "0px",
    height: "7.5%",
    background:'#455A64'
  },
  label: {
    fontSize: "1.5em",
    fontFamily:'微软雅黑',
    //fontWeight:'bold',
    color:'#fff'
  },
  button: {
    position: "absolute",
    zIndex: "999990",
    right: "0px",
  }
};
class Sketch extends Component {
  state = {
    index: 0
  };

  handleChange = (event, index) => {
    this.setState({ index });
  };

  render() {
    const { classes, onClick, onResetSketchState, isRealtimeOn } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            className={classes.tabs}
            value={this.state.index}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
            className={classes.tab}
              classes={{ label: this.props.classes.label }}
              label="草图编辑"
              onClick={onResetSketchState}
            />
            <Tab 
            classes={{ label: this.props.classes.label }} 
            label="专题图编辑" />
          </Tabs>
          <IconButton
            className={classes.button}
            aria-label="Delete"
            onClick={onClick}
          >
            <ClearIcon style={{color:'#fff'}}/>
          </IconButton>
        </AppBar>
        {this.state.index === 0 && (
          <SketchToolBar isRealtimeOn={isRealtimeOn} />
        )}
        {this.state.index === 1 && <ThematicMap />}
      </div>
    );
  }
}

Sketch.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onResetSketchState: PropTypes.func.isRequired
};

/**
 * 
 * @param {*} state 
 *
 */
const mapStateToProps = state => {
  const sketchState = state.sketchReduce;
  return {
    saveIsChecked: sketchState.saveIsChecked,
    isRealtimeOn: sketchState.isRealtimeOn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch({
        type: "MAP_SKETCH_VIEW_SWITCH"
      });
    },
    onResetSketchState: () => {
      dispatch({
        type: "resetSketchState"
      });
    }
  };
};

export default withStyles(styles, { name: "Sketch" })(
  connect(mapStateToProps, mapDispatchToProps)(Sketch)
);
