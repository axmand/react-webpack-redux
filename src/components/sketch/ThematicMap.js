import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { connect } from "react-redux";
import RootReducer from "./../../redux/RootReducer";
import PropTypes from "prop-types";
import * as maptalks from "maptalks";
//import UI
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Button from "material-ui/Button";
// import TextField from 'material-ui/TextField';
// import Toolbar from 'material-ui/Toolbar';
/* eslint-disable flowtype/require-valid-file-annotation */

import green from "material-ui/colors/green";
import { CircularProgress } from "material-ui/Progress";
import CheckIcon from "material-ui-icons/Check";
import SaveIcon from "material-ui-icons/Save"; //保存
import Typography from "material-ui/Typography";
// import Divider from "material-ui/Divider";
import Dialog, {DialogContent} from "material-ui/Dialog";

import appConfig from "../../redux/Config";
import html2canvas from "html2canvas";
import projectData from "./../../redux/RootData";

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
    left:'7.5%',
    width:`${window.innerHeight * 0.61875*0.85}px`,
    height: `${window.innerHeight * 0.875*0.85}px`,
    borderCollapse:'collapse',
    border:'solid 2px #000'
  },
  head:{    
    height: "5%",
  },
  headcell:{
    padding:0,
    border:'solid 1px #000'
  },
  headtext:{
    background:'#fff',
    width:'95%',
    fontSize: "1em",
    fontFamily: "宋体",
    fontWeight: "400",
    textAlign:'center',
    padding:0,
    border:0,
  },
  mapPic:{
    padding:0,
    border:'solid 1px #000'
  },
  pic:{
    color: "#000",
    width: "100%",
    height: "100%"
  },

  bottomtable:{
    position:'absolute',
    top: "91%",
    left:'40%',
    width: `${window.innerHeight * 0.35}px`,
    padding:0,
    border:0,
    fontSize: "1em",
    fontFamily: "宋体",
    fontWeight: "400",
  },
  btmtr:{
    height: `${window.innerHeight * 0.03}px`,
    width:'100%',
    padding:0,
    border:0,
  },
  btmtd:{
    padding:0,
    border:0,
    fontSize: "1em",
    fontFamily: "宋体",
    fontWeight: "400",
  },
  btminput:{
    padding:0,
    border:0,
    width:'100%',
    fontSize: "1em",
    fontFamily: "宋体",
    fontWeight: "400",
  },
  right: {
    position: "absolute",
    top: "62%",
    left:"92.5%",
    fontSize: "1em",
    fontFamily: "宋体",
    letterSpacing: "20px",
    width: "2%",
    height: "40%",
    padding: "0 1% 0 1%"
  },
  alert: { 
    display: "flex",
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
let thematicMap,thematicMapDOM;

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
    const d= new Date();
    const date=d.getFullYear()+"年"+(d.getMonth()+1)+"月"+d.getDate()+"日";
    const {
      TuDiQuanLiRen,
      ZuoLuo,
      alertSave,
      // saveIsChecked,
      onSaveAlertClose,
      onSaveThematicMapClick,
      thematicMapSaveSuccess,
      thematicMapSaveLoading,
    } = this.props;

    let saveButtonClass = "";
    if (thematicMapSaveSuccess) {
      saveButtonClass = classes.successSaveButtonClass;
    }

    return (
      <div className={classes.root}>
        <Paper
          ref={div => {
            thematicMapDOM = div
          }}
          className={classes.thematicMap}
        >
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

          <Typography type="headline" className={classes.title}>
            不动产单元草图
          </Typography>

          <table ref="tabletest" className={classes.table}>
            <tbody>
              <tr className={classes.head}>
                <td className={classes.headcell} style={{width:'20%'}}>            
                  <Typography className={classes.headtext} >土地权利人</Typography>      
                </td>
                <td className={classes.headcell} style={{width:'30%'}}>
                  <input 
                  className={classes.headtext} 
                  defaultValue={TuDiQuanLiRen}
                  required/>
                </td>
                <td className={classes.headcell} style={{width:'15%'}}>
                  <Typography className={classes.headtext} >坐落</Typography>  
                </td>
                <td className={classes.headcell} style={{width:'35%'}}>
                  <input 
                  className={classes.headtext} 
                  defaultValue={ZuoLuo}
                  required/>
                </td>
              </tr>
              <tr className={classes.mapPic}>
                <td colSpan="4">
                  <div
                    className={classes.pic}
                    ref="ThematicMap"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table className={classes.bottomtable}>
            <tbody>
              <tr className={classes.btmtr}>
                <td className={classes.btmtd} style={{width:'18%'}}>调查者：</td>
                <td className={classes.btmtd} style={{width:'18%'}}>
                <input className={classes.btminput} required id="investigator"/>
                </td> 
                <td className={classes.btmtd} style={{width:'24%'}}>调查日期：</td>   
                <td className={classes.btmtd} style={{width:'40%'}}>
                <input className={classes.btminput} required defaultValue={date} id="invest_time"/>
                </td>                  
              </tr>
              <tr className={classes.btmtr}>
                <td className={classes.btmtd} style={{width:'18%'}}>审核者：</td>
                <td className={classes.btmtd} style={{width:'18%'}}>
                <input className={classes.btminput} required id="auditor"/>
                </td> 
                <td className={classes.btmtd} style={{width:'24%'}}>审核日期：</td>   
                <td className={classes.btmtd} style={{width:'40%'}}>
                <input className={classes.btminput} required defaultValue={date} id="audit_time"/>
                </td>                  
              </tr>
            </tbody>
          </table>
          <div className={classes.right}>南宁市不动产权籍调查机构绘制</div>
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
  console.log(projectData.ProjectItem.F1.PrincipalName)


  return {
    TuDiQuanLiRen: projectData.ProjectItem.F1.PrincipalName,
    ZuoLuo: projectData.ProjectItem.F1.Location,
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

      console.log(findDOMNode(thematicMapDOM))
      html2canvas(findDOMNode(thematicMapDOM)).then(function(canvas) {
        console.log(canvas.toDataURL())
        const ThematicMapDataURL = canvas.toDataURL();
        const ThematicMapDataLoad = ThematicMapDataURL.slice(
          ThematicMapDataURL.indexOf(",") + 1
        );
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
      })

      // const ThematicMapDataURL = thematicMap.toDataURL();
      // const ThematicMapDataLoad = ThematicMapDataURL.slice(
      //   ThematicMapDataURL.indexOf(",") + 1
      // );
      // console.log(ThematicMapDataLoad);

      // fetch(appConfig.fileServiceRootPath + "/project/savepicture", {
      //   method: "POST",
      //   body: ThematicMapDataLoad
      // })
      //   .then(response => response.json())
      //   .then(json => {
      //     dispatch({
      //       type: "SUCCESS_SAVE_THEMATICMAP_CLICK"
      //     });
      //     setTimeout(() => {
      //       dispatch({
      //         type: "RESTARE_SUCCESS_SAVE_THEMATICMAP_CLICK"
      //       });
      //     }, 1000);
      //     console.log(json);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
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
