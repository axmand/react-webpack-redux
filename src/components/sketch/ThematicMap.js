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
    width: "46%",
    height: `${window.innerHeight * 0.875}px`
  },
  title: {
    padding: "2% 0 0 0",
    fontSize: "1.5em",
    fontFamily: "宋体",
    fontWeight: "800",
    height: "43.75%"
  },
  table: {
    width: "100%",
    position: "absolute",
    top: "7%"
  },
  tabletext12: {
    width: "100%"
  },
  tabletext1: {
    border: "solid 0.5px #000",
    fontSize: "0.5em",
    fontFamily: "宋体",
    textAlign: "center"
  },
  tabletext2: {
    border: "solid 0.5px #000",
    fontSize: "1em",
    fontFamily: "宋体",
    textAlign: "center"
  },
  mapdiv: {
    border: "solid 0.5px #000",
    width: "100%"
  },
  bottom1: {
    width: "100%",
    height: `${window.innerHeight * 0.05}px`,
    position: "absolute",
    top: "90%"
  },
  bottom2: {
    width: "100%",
    height: `${window.innerHeight * 0.05}px`,
    position: "absolute",
    top: "94%"
  },
  bottom11: {
    fontSize: "1em",
    fontFamily: "宋体",
    padding: 0
  },

  right: {
    position: "absolute",
    fontSize: "1em",
    fontFamily: "宋体",
    letterSpacing: "20px",
    width: "2%",
    height: "40%",
    top: "61%",
    padding: "0 1% 0 1%"
  },
  alert: { 
    display: "flex",
    padding:0,
    height:`${window.innerHeight * 0.12}px`,
    padding:'0 10px 0 10px',
  },
  message: {
    fontSize: "1.5em",
    color:"#455A64",
    textAlign: "center",
    lineHeight: "150%",
  },
  wrapper: {
    // position: "relative",
    position: "absolute",
    top: "90%",
    left: "75%",
    height: "6%",
    width: "6%"
  },
  successSaveButtonClass: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
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
  bt_text: {
    fontSize: "1em",
    color: "#fff"
  },
  progress: {
    color: green[500],
    position: "absolute",
    top: -2,
    left: -2
  }
});

/**
 * @type {maptalks.Map}
 * 全局的专题图地图对象和方法
 */
let thematicMap, isOpen;

/**
 * 专题图组件
 * @class
 */
class ThematicMap extends Component {
  componentDidMount() {
    const {
      saveIsChecked,
      mapCenter,
      jzdJSONData,
      szJSONData,
      jzxJSONData,
      zdJSONData,
      zjJSONData
    } = this.props;
    if (saveIsChecked) {
      const ThematicMapDiv = this.refs.ThematicMap;
      thematicMap = new maptalks.Map(ThematicMapDiv, {
        center: mapCenter,
        zoom: 16,
        baseLayer: new maptalks.TileLayer("base", {
          crossOrigin: "anonymous",
          // 'http://webst{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
          urlTemplate:
            "http://webrd{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
          subdomains: ["01", "02", "03", "04"],
          attribution: '&copy; <a href="http://www.gaode.com/">Gaode.com</a>'
        })
      });
      maptalks.Layer.fromJSON(jzdJSONData).addTo(thematicMap);
      maptalks.Layer.fromJSON(szJSONData).addTo(thematicMap);
      maptalks.Layer.fromJSON(jzxJSONData).addTo(thematicMap);
      maptalks.Layer.fromJSON(zdJSONData).addTo(thematicMap);
      maptalks.Layer.fromJSON(zjJSONData).addTo(thematicMap);
    }
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
        <Dialog 
            open={alertSave} 
            onRequestClose={onSaveAlertClose}
            style={{ zIndex: "999999"}}>
              <DialogContent className={classes.alert} onClick={onSaveAlertClose}>
                <Typography className={classes.message}>
                  无法获取草图绘制成果图！<br />请返回草图编辑界面绘制并点击保存！                
                </Typography>
              </DialogContent>
          </Dialog>
          
          <Grid container direction="column" spacing={0}>
            <Grid item xs>
              <Typography type="headline" className={classes.title}>
                不动产单元草图
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.table}>
              <Grid container spacing={0}>
                <Grid item xs />
                <Grid item xs={10}>
                  <Grid
                    container
                    direction="column"
                    spacing={0}
                    style={{
                      border: "solid 0.5px #606060"
                    }}
                  >
                    <Grid item className={classes.tabletext12}>
                      <Grid container spacing={0}>
                        <Grid item xs={3}>
                          <Typography
                            type="subheading"
                            className={classes.tabletext1}
                          >
                            土地权利人
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            type="subheading"
                            className={classes.tabletext2}
                          >
                            张XX、王xx
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Typography
                            type="subheading"
                            className={classes.tabletext1}
                          >
                            坐落
                          </Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <Typography
                            type="subheading"
                            className={classes.tabletext2}
                          >
                            南宁市blablabla
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item className={classes.mapdiv}>
                      <div
                        ref="ThematicMap"
                        style={{
                          color: "#000",
                          width: "100%",
                          height: `${window.innerHeight * 0.69}px`
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs>
                  <div className={classes.right}>X X不动产权籍调查机构绘制</div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item item xs={12} className={classes.bottom1}>
              <Grid container spacing={0}>
                <Grid item xs={5} />
                <Grid item xs={2}>
                  <Typography type="headline" className={classes.bottom11}>
                    调查者：
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography type="headline" className={classes.bottom11}>
                    调查日期：
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item item xs={12} className={classes.bottom2}>
              <Grid container spacing={0}>
                <Grid item xs={5} />
                <Grid item xs={2}>
                  <Typography type="headline" className={classes.bottom11}>
                    审核者：
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography type="headline" className={classes.bottom11}>
                    调查日期：
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <div className={classes.wrapper}>
          <Button
            fab
            color="primary"
            className={saveButtonClass}
            onClick={onSaveThematicMapClick}
          >
            {thematicMapSaveSuccess ? (
              <CheckIcon className={classes.icon} />
            ) : (
              <SaveIcon className={classes.icon} />
            )}

            {/* <Typography className={classes.bt_text}>保存</Typography> */}
          </Button>
          {thematicMapSaveLoading && (
            <CircularProgress size={60} className={classes.progress} />
          )}
        </div>
      </div>
    );
  }
}

ThematicMap.PropTypes = {
  classes: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  const sketchState = state.sketchReduce;
  const canvasSeduce = state.CanvasReduce;
  return {
    alertSave: sketchState.alertSave,
    saveIsChecked: sketchState.saveIsChecked,
    thematicMapSaveSuccess: canvasSeduce.thematicMapSaveSuccess,
    thematicMapSaveLoading: canvasSeduce.thematicMapSaveLoading,
    mapCenter: sketchState.mapCenter,
    jzdJSONData: sketchState.jzdJSONData,
    szJSONData: sketchState.szJSONData,
    jzxJSONData:sketchState.jzxJSONData,
    zdJSONData: sketchState.zdJSONData,
    zjJSONData: sketchState.zjJSONData
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

      const ThematicMapDataURL = thematicMap.toDataURL();
      const ThematicMapDataLoad = ThematicMapDataURL.slice(
        ThematicMapDataURL.indexOf(",") + 1
      );
      console.log(ThematicMapDataLoad);

      fetch(appConfig.fileServiceRootPath + "/project/savepicture", {
        method: "POST",
        body: ThematicMapDataLoad
      })
        .then(response => response.json())
        .then(json => {
          dispatch({
            type: "SUCCESS_SAVE_THEMATICMAP_CLICK"
          });
          setTimeout(() => {
            dispatch({
              type: "RESTARE_SUCCESS_SAVE_THEMATICMAP_CLICK"
            });
          }, 1000);
          console.log(json);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles, { name: "ThematicMap" })(ThematicMap)
);

//reducer
const CanvasReduce = (
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
RootReducer.merge(CanvasReduce);
