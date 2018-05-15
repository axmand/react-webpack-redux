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
import FindInPage from "material-ui-icons/FindInPage"//打印预览
import SaveIcon from "material-ui-icons/Save"; //保存
import Close from "material-ui-icons/Close"; //保存
import Typography from "material-ui/Typography";
// import Divider from "material-ui/Divider";
import Dialog, {DialogContent} from "material-ui/Dialog";

import appConfig from "../../redux/Config";
import html2canvas from "html2canvas";
import { read } from "fs";

const styles = theme => ({
  root: {
    width: "100%",
    height: `${window.innerHeight - 48}px`,
    background: "white",
    display: "flex",
  },
  thematicMap: {
    position: "absolute",
    width: `${window.innerHeight * 0.61875*2.5}px`,
    height: `${window.innerHeight * 0.875*2.5}px`,
  },
  title: {
    padding: "2% 0 2% 0",
    fontSize: "4em",
    fontFamily: "宋体",
    fontWeight: "800",
    height: "3%"
  },
  table:{    
    position:'absolute',
    left:'7.5%',
    width:`${window.innerHeight * 0.61875*0.85*2.5}px`,
    height: `${window.innerHeight * 0.875*0.85*2.5}px`,
    borderCollapse:'collapse',
    border:'solid 2px #000'
  },
  head:{    
    height: "5%",
  },
  tablecell:{
    padding:0,
    border:'solid 1px #000',
  },
  headtext:{
    background:'#fff',
    width:'95%',
    fontSize: "2em",
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
    top: "92%",
    left:'48%',
    width: `${window.innerHeight * 0.28*2.5}px`,
    height:`${window.innerHeight * 0.875* 0.06*2.5}px`,
    padding:0,
    border:0,
  },
  btmtr:{
    height: `${window.innerHeight * 0.875* 0.03*2.5}px`,
    width:'100%',
    padding:0,
    border:0,
  },
  btmtd:{
    border:0,
    padding:0,
  },
  bottomtext:{
    width:'95%',
    fontSize: "2em",
    fontFamily: "宋体",
    fontWeight: "400",
    textAlign:'center',
    padding:0,
    border:0,
  },
  right: {
    position: "absolute",
    top: "74%",
    left:"92.5%",
    fontSize: "2em",
    fontFamily: "宋体",
    letterSpacing: "20px",
    width: "2%",
    height: "17%",
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
  wrapper_save: {
    // position: "relative",
    position: "absolute",
    top: "10%",
    left: "5%",
    height: "6%",
    width: "6%",
  },
  wrapper_preview: {
    position: "absolute",
    top: "10%",
    left: "13%",
    height: "6%",
    width: "6%",
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
    height: "64%",
    width: "64%",
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
      haveSaved,
      mapZoom
    } = this.props;
    const ThematicMapData=this.props.ThematicMapData;
    console.log(this.props);
    //获取地图数据
    let DT_Point=ThematicMapData.Project_DT_Point;
    let DT_Line=ThematicMapData.Project_DT_Line;
    let DT_Polygon=ThematicMapData.Project_DT_Polygon;
    let LayerData=ThematicMapData.ProjectItem.L;
    console.log(LayerData);

    if (haveSaved) {   
      let jzd,sz,jzx,zd,zj,mapCenter;      
      const ThematicMapDiv = this.refs.ThematicMap;
      thematicMap = new maptalks.Map(ThematicMapDiv, {
        center:[108.37, 22.82] ,
        dragPitch : false,
        dragRotate : false,
        zoom:mapZoom,
      });  

      if(LayerData.jzdJSONData){
        jzd=maptalks.Layer.fromJSON(JSON.parse(LayerData.jzdJSONData));
        //设置界址点半径成图美观
        if(jzd.getGeometries()){
          for (let i = 0; i <jzd.getGeometries().length; i++) {
            jzd.getGeometries()[i].setRadius(1);
          }
        }
      }
      if(LayerData.szJSONData){
        sz= maptalks.Layer.fromJSON(JSON.parse(LayerData.szJSONData));
      }
      if(LayerData.jzxJSONData){
        jzx= maptalks.Layer.fromJSON(JSON.parse(LayerData.jzxJSONData));
      }
      if(LayerData.zdJSONData){
        zd= maptalks.Layer.fromJSON(JSON.parse(LayerData.zdJSONData));
      }
      if(LayerData.zjJSONData){
        zj=maptalks.Layer.fromJSON(JSON.parse(LayerData.zjJSONData));
      }
      zd.addTo(thematicMap);      
      sz.addTo(thematicMap);
      jzx.addTo(thematicMap);
      jzd.addTo(thematicMap);
      zj.addTo(thematicMap);
      //读取并剔除不合格的底图数据
      let DT=new maptalks.VectorLayer("DT",{geometryEvents:false}).setStyle({
        symbol:{
            markerType:'ellipse',
            markerFill: '#ccc',
            markerLineColor:'#444',
            markerWidth : 4,
            markerHeight : 4,
            lineColor:'#000',
            lineWidth:1,
            polygonFill: "#FFF",
            polygonOpacity: 0.4
        }
      }).addTo(thematicMap);
      let poiGeometries,lineGeometries,polygonGeometries;
      if(DT_Point!==null){
        poiGeometries=maptalks.GeoJSON.toGeometry(DT_Point).filter(geometry=>geometry!==null);
      }
      if(DT_Line!==null){
        lineGeometries=maptalks.GeoJSON.toGeometry(DT_Line).filter(geometry=>geometry!==null);
      }
      if(DT_Polygon!==null){
        polygonGeometries=maptalks.GeoJSON.toGeometry(DT_Polygon).filter(geometry=>geometry!==null);  
      }
      //设置地图中心点坐标
      if(LayerData.mapCenter){
        mapCenter=JSON.parse(LayerData.mapCenter);
        thematicMap.setCenter(mapCenter);
      }else{
        if(poiGeometries.length>0){
          mapCenter = poiGeometries[0].getCoordinates();
          thematicMap.setCenter(mapCenter);
        }
      } 
      poiGeometries = polygonGeometries.concat(lineGeometries).concat(poiGeometries);
      if(poiGeometries!==null){
        DT.addGeometry(poiGeometries);
        DT.bringToBack();
      }
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
      haveSaved,
      onSaveAlertClose,
      onSaveThematicMapClick,
      thematicMapSaveSuccess,
      thematicMapSaveLoading,
      onPreviewPrintClick,
      previewPrintIsChecked,
      unclosePreviewAlert,
      previewAlerClose
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
          style={{
            transform:previewPrintIsChecked
            ?"scale(0.4,0.4)"
            :"",
            top:previewPrintIsChecked
            ?"-56%"
            :"",
            left:previewPrintIsChecked
            ?"-4%"
            :""
          }}
        >
          <Dialog 
            open={alertSave} 
            onRequestClose={onSaveAlertClose}
            style={{ zIndex: "999999"}}>
              <DialogContent className={classes.alert} onClick={onSaveAlertClose}>
                <Typography className={classes.message}>
                Error_thematicMap_001:无法获取草图绘制成果图！<br />请返回草图编辑界面绘制并点击保存！                
                </Typography>
              </DialogContent>
          </Dialog>
          <Dialog 
            open={unclosePreviewAlert} 
            onRequestClose={previewAlerClose}>
              <DialogContent className={classes.alert} onClick={previewAlerClose}>
                <Typography className={classes.message}>
                Error_thematicMap_002：保存失败！请关闭预览后再保存！                
                </Typography>
              </DialogContent>
          </Dialog>

          <Typography type="headline" className={classes.title}>
            不动产单元草图
          </Typography>

          <table ref="tabletest" className={classes.table}>
            <thead className={classes.head}> 
              <tr style={{height:'100%'}}>
                <td className={classes.tablecell} style={{width:'20%'}}>            
                  <Typography className={classes.headtext} >土地权利人</Typography>      
                </td>
                <td className={classes.tablecell} style={{width:'30%'}}>
                  <input 
                  className={classes.headtext} 
                  defaultValue={TuDiQuanLiRen}
                  required/>
                </td>
                <td className={classes.tablecell} style={{width:'15%'}}>
                  <Typography className={classes.headtext} >坐落</Typography>  
                </td>
                <td className={classes.tablecell} style={{width:'35%'}}>
                  <textarea 
                  className={classes.headtext} 
                  defaultValue={ZuoLuo}
                  required/>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr className={classes.mapPic}>
                <td  className={classes.tablecell} colSpan="4">
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
                <td className={classes.btmtd} style={{width:'21%'}}>
                <Typography className={classes.bottomtext} >调查者：</Typography>
                </td>
                <td className={classes.btmtd} style={{width:'20%'}}>
                <input className={classes.bottomtext} required id="investigator"/>
                </td> 
                <td className={classes.btmtd} style={{width:'27%'}}>
                <Typography className={classes.bottomtext} >调查日期：</Typography>
                </td>   
                <td className={classes.btmtd} style={{width:'32%'}}>
                <input className={classes.bottomtext} required defaultValue={date} id="invest_time"/>
                </td>                  
              </tr>
              <tr className={classes.btmtr}>
                <td className={classes.btmtd} style={{width:'21%'}}>
                <Typography className={classes.bottomtext} >审核者：</Typography>
                </td>
                <td className={classes.btmtd} style={{width:'20%'}}>
                <input className={classes.bottomtext} required id="auditor"/>
                </td> 
                <td className={classes.btmtd} style={{width:'27%'}}>
                <Typography className={classes.bottomtext} >审核日期：</Typography>
                </td>   
                <td className={classes.btmtd} style={{width:'32%'}}>
                <input className={classes.bottomtext} required defaultValue={date} id="audit_time"/>
                </td>                  
              </tr>
            </tbody>
          </table>
          <div className={classes.right}>南宁市不动产权籍调查机构绘制</div>
        </Paper>
        <div className={classes.wrapper_preview}>
          <Button
            fab
            color="primary"
            onClick={onPreviewPrintClick}
          >
          {previewPrintIsChecked ? (
            <Close className={classes.icon} />
          ) : (
            <FindInPage className={classes.icon} />
          )}
            
          </Button>
        </div>
        <div className={classes.wrapper_save}>
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

const mapStateToProps = (state, ownProps) => {
  const sketchState = state.sketchReduce;
  const canvasSeduce = state.CanvasReduce;
  const ThematicMapData=ownProps.ThematicMapData;

  return {
    TuDiQuanLiRen: ThematicMapData.ProjectItem.F1.PrincipalName,
    ZuoLuo: ThematicMapData.ProjectItem.F1.Location,
    alertSave: sketchState.alertSave,
    haveSaved: sketchState.haveSaved,
    thematicMapSaveSuccess: canvasSeduce.thematicMapSaveSuccess,
    thematicMapSaveLoading: canvasSeduce.thematicMapSaveLoading,
    previewPrintIsChecked:canvasSeduce.previewPrintIsChecked,
    unclosePreviewAlert:canvasSeduce.unclosePreviewAlert,
    mapZoom:sketchState.mapZoom,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //未保存时错误提示
    onSaveAlertClose: () => {
      dispatch({
        type: "saveAlertClose"
      });
    },
    //打印预览
    onPreviewPrintClick:() =>{
      dispatch({
        type: "PREVIEW_PRINT_CLICK"
      });
    },
    //关闭打印预览提示
    previewAlerClose:()=>{
      dispatch({
        type:"CLOSE_PREVIEW_ALERT"
      })
    },
    //保存
    onSaveThematicMapClick: () => {
      dispatch({
        type:"UNCLOSE_PREVIEW_ALERT"
      })
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
    thematicMapSaveLoading: false,
    previewPrintIsChecked:false,
    appBarLonger:false,
    unclosePreviewAlert:false
  },
  action
) => {
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    //打印预览
    case "PREVIEW_PRINT_CLICK":
      newState.previewPrintIsChecked =!state.previewPrintIsChecked;
      newState.appBarLonger = state.previewPrintIsChecked;
      return{...state, ...newState }
    
    //关闭打印预览
    case "closePrintPreview":
      newState.previewPrintIsChecked =false;
      newState.appBarLonger = true;
      return{...state, ...newState }
    //打开打印预览还原页面大小
    case "openPrintPreview":
      newState.previewPrintIsChecked =true;
      newState.appBarLonger = false;
      return{...state, ...newState }
    //拉长顶部tab条
    case "Tab_Bar_Longer":
      newState.appBarLonger = true;
      return{...state, ...newState }
    //保存不动产单元草图
    case "SAVE_THEMATICMAP_CLICK":
      if (!state.thematicMapSaveLoading&&!state.previewPrintIsChecked) {
        newState.thematicMapSaveLoading = true;
      }
      return { ...state, ...newState };
    //未关闭打印预览弹出提示框
    case "UNCLOSE_PREVIEW_ALERT":
      if(state.previewPrintIsChecked){
        newState.unclosePreviewAlert = true;
      }
      return { ...state, ...newState };
    case "CLOSE_PREVIEW_ALERT":
      newState.unclosePreviewAlert = false;
      return { ...state, ...newState };
    case "SUCCESS_SAVE_THEMATICMAP_CLICK":
      if(state.thematicMapSaveLoading){
        newState.thematicMapSaveLoading = false;
        newState.thematicMapSaveSuccess = true;
      }
      return { ...state, ...newState };
    case "RESTARE_SUCCESS_SAVE_THEMATICMAP_CLICK":
      newState.thematicMapSaveSuccess = false;
      return { ...state, ...newState };
    default:
      return { ...state };
  }
};
RootReducer.merge(CanvasReduce);
