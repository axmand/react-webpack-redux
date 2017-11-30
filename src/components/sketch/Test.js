import React, { Component } from "react";
import { connect } from "react-redux";
import RootReducer from "./../../redux/RootReducer";
import PropTypes from "prop-types";
import * as maptalks from "maptalks";
//import UI
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import Button from "material-ui/Button";
import Snackbar from "material-ui/Snackbar";
/* eslint-disable flowtype/require-valid-file-annotation */

import green from "material-ui/colors/green";
import { CircularProgress } from "material-ui/Progress";
import CheckIcon from "material-ui-icons/Check";
import SaveIcon from "material-ui-icons/Save"; //保存
import Typography from "material-ui/Typography";
import Dialog, {DialogContent} from "material-ui/Dialog";

import appConfig from "../../redux/Config"

import html2canvas from "html2canvas";


import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

const styles = theme => ({
  root: {
    width: "100%",
    height: `${window.innerHeight - 48}px`,
    background: "white",
    display: "flex",
    justifyContent: "center"
  },
  thematicMap: {
    position: "absolute",
    top: "7.8125%",
    width: `${window.innerHeight * 0.61875}px`,
    height: `${window.innerHeight * 0.875}px`
  },
  title: {
    padding: "2% 0 0 0",
    fontSize: "1.5em",
    fontFamily: "宋体",
    fontWeight: "800",
    height: "5%"
  },
  table:{    
    position:'absolute',
    left:'10%',
    width:`${window.innerHeight * 0.61875*0.8}px`,
    height: `${window.innerHeight * 0.875*0.8}px`,
  },
  head:{    
    height: "5%",
  },
  headcell:{
    padding:0,
    //border: "solid 0.5px #000",
    borderRight:"solid 5px #000"
  },
  headtext:{
    fontSize: "1em",
    fontFamily: "宋体",
    fontWeight: "400",
    padding:0
  },
  mapPic:{
    height:'95%',
  },
  pic:{
    height:'100%',
    width:'100%'

  },
  wrapper: {
    // position: "relative",
    position: "absolute",
    top: "90%",
    left: "75%",
    height: "6%",
    width: "6%"
  },
  button: {
    position: "absolute",
    top: "90%",
    left: "75%",
    height: "6%",
    width: "6%",
    padding: 0,
    border: 0,
    background: "#455A64",
    borderRadius: "8%",
    boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.2)"
  },
  icon: {
    height: "35%",
    width: "35%",
    color: "#fff"
  },
});

/**
 * @type {maptalks.Map}
 * 全局的专题图地图对象和方法
 */
let test, isOpen;

/**
 * 专题图组件
 * @class
 */
class Test extends Component {
  componentDidMount() {
    test=document.body;

  }

  render() {
    const classes = this.props.classes;
    const {
      alertSave,
      saveIsChecked,
      onSaveAlertClose,
      onSaveThematicMapClick,
      thematicMapSaveSuccess,
      thematicMapSaveLoading
    } = this.props;

    let saveButtonClass = "";
    if (thematicMapSaveSuccess) {
      saveButtonClass = classes.successSaveButtonClass;
    }

    return (
      <div className={classes.root}>
        <Paper className={classes.thematicMap}>
          <Typography type="headline" className={classes.title}>
            不动产单元草图
          </Typography>
          <Table ref="tabletest" className={classes.table}>
              <TableRow className={classes.head}>
                <TableCell className={classes.headcell}>            
                  <Typography className={classes.headtext} >土地权利人</Typography>      
                </TableCell>
                <TableCell className={classes.headcell}>
                <Typography className={classes.headtext} >张xx</Typography>  
                </TableCell>
                <TableCell className={classes.headcell}>
                  <Typography className={classes.headtext} >坐落</Typography>  
                </TableCell>
                <TableCell className={classes.headcell}>
                  <Typography className={classes.headtext} >balanala</Typography>  
                </TableCell>
              </TableRow>
              <TableRow className={classes.mapPic}>
                <TableCell  colSpan="4" className={classes.pic}></TableCell>
              </TableRow>
            </Table>
        </Paper>
        <div className={classes.wrapper}>
          <Button
            fab
            color="primary"
            className={saveButtonClass}
            onClick={onSaveThematicMapClick}
          >
          <SaveIcon className={classes.icon} />
          </Button>
        </div>
      </div>
    );
  }
}

Test.PropTypes = {
  classes: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  const sketchState = state.sketchReduce;
  const canvasSeduce = state.CanvasReduce1;
  return {
    alertSave: sketchState.alertSave,
    saveIsChecked: sketchState.saveIsChecked,
    thematicMapSaveSuccess: canvasSeduce.thematicMapSaveSuccess,
    thematicMapSaveLoading: canvasSeduce.thematicMapSaveLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSaveAlertClose: () => {
      dispatch({
        type: "saveAlertClose"
      });
    },

    onSaveThematicMapClick: () => {
      dispatch({
        type: "SAVE_THEMATICMAP_CLICK"
      });
        console.log(test)
        html2canvas(test).then(function(canvas) {
          console.log(canvas.toDataURL())
        })

    //    const ThematicMapDataURL = test.toDataURL();
    // //   const ThematicMapDataLoad = ThematicMapDataURL.slice(
    // //     ThematicMapDataURL.indexOf(",") + 1
    // //   );
    // console.log(ThematicMapDataURL);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles, { name: "Test" })(Test)
);

//reducer
const CanvasReduce1 = (
  state = {
    thematicMapImg: ImageData,
    thematicMapSaveSuccess: false,
    thematicMapSaveLoading: false
  },
  action
) => {
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "SAVE_THEMATICMAP_CLICK":
      if (!state.thematicMapSaveLoading) {
        newState.thematicMapSaveLoading = true;
      }
      return { ...state, ...newState };
    case "SUCCESS_SAVE_THEMATICMAP_CLICK":
      newState.thematicMapSaveLoading = false;
      newState.thematicMapSaveSuccess = true;
      return { ...state, ...newState };
    case "RESTARE_SUCCESS_SAVE_THEMATICMAP_CLICK":
      newState.thematicMapSaveSuccess = false;
      return { ...state, ...newState };
    default:
      return { ...state };
  }
};
RootReducer.merge(CanvasReduce1);
