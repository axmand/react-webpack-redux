/**
 * Map组件
 * @author yellow date 2017/7/24
 * -由于此组件包含input,button。可以根据需要拆分组件
 * 
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import RootReducer from "./../../redux/RootReducer";
import PropTypes from "prop-types";
import * as maptalks from "maptalks";
import { SnapTool } from "maptalks.snapto";
import projectData from "./../../redux/RootData";
import appConfig from "../../redux/Config";

//引入地图组件
import MapToolBar from "./MapToolBar";
/**
 * @type {maptalks.Map}
 * 全局的地图对象和方法
 */
let map;
//定义测距工具
let distanceTool = new maptalks.DistanceTool({
  symbol: {
    lineColor: "#34495e",
    lineWidth: 2
  },
  vertexSymbol: {
    markerType: "ellipse",
    markerFill: "#1bbc9b",
    markerLineColor: "#000",
    markerLineWidth: 3,
    markerWidth: 10,
    markerHeight: 10
  },

  labelOptions: {
    textSymbol: {
      textFaceName: "monospace",
      textFill: "#fff",
      textLineSpacing: 1,
      textHorizontalAlignment: "right",
      textDx: 15,
      markerLineColor: "#b4b3b3",
      markerFill: "#000"
    },
    boxStyle: {
      padding: [6, 2],
      symbol: {
        markerType: "square",
        markerFill: "#000",
        markerFillOpacity: 0.9,
        markerLineColor: "#b4b3b3"
      }
    }
  },
  clearButtonSymbol: [
    {
      markerType: "square",
      markerFill: "#000",
      markerLineColor: "#b4b3b3",
      markerLineWidth: 2,
      markerWidth: 15,
      markerHeight: 15,
      markerDx: 20
    },
    {
      markerType: "x",
      markerWidth: 10,
      markerHeight: 10,
      markerLineColor: "#fff",
      markerDx: 20
    }
  ],
  language: "en-US"
});
//定义测面积工具
let areaTool = new maptalks.AreaTool({
  symbol: {
    lineColor: "#1bbc9b",
    lineWidth: 2,
    polygonFill: "#fff",
    polygonOpacity: 0.3
  },
  vertexSymbol: {
    markerType: "ellipse",
    markerFill: "#34495e",
    markerLineColor: "#1bbc9b",
    markerLineWidth: 3,
    markerWidth: 10,
    markerHeight: 10
  },
  labelOptions: {
    textSymbol: {
      textFaceName: "monospace",
      textFill: "#fff",
      textLineSpacing: 1,
      textHorizontalAlignment: "right",
      textDx: 15
    },
    boxStyle: {
      padding: [6, 2],
      symbol: {
        markerType: "square",
        markerFill: "#000",
        markerFillOpacity: 0.9,
        markerLineColor: "#b4b3b3"
      }
    }
  },
  clearButtonSymbol: [
    {
      markerType: "square",
      markerFill: "#000",
      markerLineColor: "#b4b3b3",
      markerLineWidth: 2,
      markerWidth: 15,
      markerHeight: 15,
      markerDx: 22
    },
    {
      markerType: "x",
      markerWidth: 10,
      markerHeight: 10,
      markerLineColor: "#fff",
      markerDx: 22
    }
  ],
  language: ""
});
//添加画图工具
let drawTool = new maptalks.DrawTool({
  mode: "Polygon",
  symbol: {
    lineColor: "#000",
    lineWidth: 3
  }
});
 //为界址点图层添加snapto工具
let snap = new SnapTool({
  tolerance: 20,
  mode: "point"
});
let target,
  clickedObj = [],
  linePoiArr = [];
let clickObj, deleteObj, recoverObj, addLabel;
//用于获取点线面对象
clickObj =
  clickObj ||
  function(e) {
    target = e.target;
    console.log(target);
    target.config('isClicked',!target.options.isClicked)
    //判断是首次点击高亮还是第二次点击取消选中
    if (target.getJSONType() === "Circle") {
      //首次点击高亮显示选中对象，并添加至存储选中对象的数组
      if (target.options.isClicked) {
        target.updateSymbol({ polygonFill: "#00FFFF", lineColor: "#00FFFF" });
        linePoiArr.push(target.getId());
        clickedObj.push(target);
      }else {//第二次点击取消高亮效果，并从存储选中对象的数组中移除
        for(let i=0;i<clickedObj.length;i++){
          if(clickedObj[i].getId() === target.getId()){
            clickedObj.splice(i, 1);
            break;
          }
        }
        target.updateSymbol({ lineColor: "#000000", polygonFill: "#FFFFFF" });
      }   
    }
    if (target.getJSONType() === "LineString") {
      if (target.options.isClicked) {
        target.updateSymbol({ lineColor: "#00FFFF" });
        clickedObj.push(target);
      }else {
        for(let i=0;i<clickedObj.length;i++){
          if(clickedObj[i].getId() === target.getId()){
            clickedObj.splice(i, 1);
            break;
          }
        }
      target.updateSymbol({ lineColor: "#000000" });
    }
  }
    if (target.getJSONType() === "Polygon") {
      if (target.options.isClicked) {
        target.updateSymbol({ lineColor: "#00FFFF" });
        clickedObj.push(target);
      }else {
        for(let i=0;i<clickedObj.length;i++){
          if(clickedObj[i].getId() === target.getId()){
            clickedObj.splice(i, 1);
            break;
            }
          }
        target.updateSymbol({ lineColor: "#000000" });           
        }
    }

    if (target.getJSONType() === "Label") {
      if (target.options.isClicked) {
        target.startEditText();
        clickedObj.push(target);
      }else {
       for(let i=0;i<clickedObj.length;i++){
         if(clickedObj[i].getId() === target.getId()){
           clickedObj.splice(i, 1);
           break;
          }
        }
      }
    }

    if (target.getJSONType() === "QuadBezierCurve") {
      if (target.options.isClicked) {
        target.updateSymbol({ lineColor: "#00FFFF" });
        clickedObj.push(target);
      }else {
        for(let i=0;i<clickedObj.length;i++){
          if(clickedObj[i].getId() === target.getId()){
            clickedObj.splice(i, 1);
            break;
          }
        }
        target.updateSymbol({ lineColor: "#000000" });
      }
    }
    console.log(clickedObj)
  };
//用于清除对象被选中的高亮效果
recoverObj =
  recoverObj ||
  function() {
    let num = clickedObj.length;
    target = null;
    for (let i = 0; i < num; i++) {
      if (clickedObj[i].getJSONType() === "Circle") {
        clickedObj[i].config('isClicked',false);
        clickedObj[i].updateSymbol({
          lineColor: "#000000",
          polygonFill: "#FFFFFF"
        });
      }
      if (clickedObj[i].getJSONType()  === "LineString") {
        clickedObj[i].config('isClicked',false);
        clickedObj[i].updateSymbol({ lineColor: "#000000" });
      }
      if (clickedObj[i].getJSONType() === "Polygon") {
        clickedObj[i].config('isClicked',false);
        clickedObj[i].updateSymbol({ lineColor: "#000000" });
      }
      if (clickedObj[i].getJSONType() === "QuadBezierCurve") {
        clickedObj[i].config('isClicked',false);
        clickedObj[i].updateSymbol({ lineColor: "#000000" });
      }
      if (clickedObj[i].getJSONType() === "Label") {
        clickedObj[i].config('isClicked',false);
        clickedObj[i].endEditText();
        clickedObj[i].updateSymbol({ lineColor: "#000000" });
      }
    }
    console.log(clickedObj)
    clickedObj=[];
  };
//添加自定义标注
addLabel =
  addLabel ||
  function(e) {
    recoverObj();
    let labelId=Number(Math.random().toString().substr(3,3) + Date.now()).toString(36);
    let label = new maptalks.Label("label", e.coordinate, {
      id:labelId, 
      isClicked:false,     
      draggable: true,
      box: false,
      type: "Label",
      symbol: {
        textWeight: "200",
        textFaceName: "宋体",
        textFill: "#000000",
        textSize: 12,
        textHorizontalAlignment: "middle",
        textVerticalAlignment: "middle",
        textAlign: "center"
      }
    });
    map.getLayer("label").addGeometry(label);
    label.on("click", clickObj);
  };

// //用于删除对象
deleteObj =
  deleteObj ||
  function() {
    //批量删除存储在选中数组中的所有地图对象
    let num = clickedObj.length;
    for(let i=0;i<num;i++){
      let target=clickedObj[i];
      if (target.getJSONType() === "Circle") {
        target.remove();
        let point_labels =  map.getLayer("label").getGeometryById(target.options.labels);
        if(point_labels){
          point_labels.remove();
        }
      }
      if (target.getJSONType() === "LineString") {
            target.remove();
            let line_labels = target.options.labels;
            for (let i = 0; i < line_labels.length; i++) {
             if( map.getLayer("label").getGeometryById(line_labels[i])){
              map.getLayer("label")
              .getGeometryById(line_labels[i])
              .remove();
              }
            }
          }
      if (target.getJSONType() === "QuadBezierCurve") {
        target.remove();
      }
      if (target.getJSONType() === "Polygon") {
        target.remove();
        let polygon_labels = target.options.labels;
        for (let i = 0; i < polygon_labels.length; i++) {
          if(map.getLayer("label").getGeometryById(polygon_labels[i])){
            map.getLayer("label")
            .getGeometryById(polygon_labels[i])
            .remove();
          }
        }
      }
      if (target.options.type === "Label") {
        target.endEditText();
        target.remove();
      }
    }
  };

/**
 * 地图组件
 * @class
 */
class Map extends Component {
  componentDidMount() {
    const mapDiv = this.refs.map;
    let center;
    console.log(projectData.ProjectItem.L.jzdJSONData);
    if(projectData.ProjectItem.L.jzdJSONData){
      let poi_data= maptalks.Layer.fromJSON(JSON.parse(projectData.ProjectItem.L.jzdJSONData));
      console.log(poi_data.getGeometries())
      let poi_arr=poi_data.getGeometries();
      if(poi_arr){
        center=poi_arr[poi_arr.length-1].getCoordinates();
      }
    }else{
      center= [108.37, 22.82];
    }
    map = new maptalks.Map(mapDiv, {
      center:center,
      zoom: 16,
      baseLayer: new maptalks.TileLayer("base", {
        crossOrigin: "anonymous",
        // urlTemplate:
        //   "http://webrd{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        // subdomains: ["01", "02", "03", "04"],
        // attribution: '&copy; <a href="http://www.gaode.com/">Gaode.com</a>'
        urlTemplate : 'http://t{s}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}',
        subdomains  : ['1','2','3','4','5'],
        attribution : '&copy; <a href="http://www.tianditu.cn/">天地图</a>'
      })
    });
    map.setZoom(18);
    //将项目草图数据导入至地图
    let jzd,sz,jzx,zd,zj;
    //判断地图数据是否为空，若为空则新建地图图层
    console.log(projectData.ProjectItem.L)
    if(projectData.ProjectItem.L.jzdJSONData){

      jzd = maptalks.Layer.fromJSON(JSON.parse(projectData.ProjectItem.L.jzdJSONData));
      //为地图对象添加点击绑定事件
      if(jzd.getGeometries()){
        for (let i = 0; i < jzd.getGeometries().length; i++) {
          jzd.getGeometries()[i].on("click", clickObj);
          jzd.getGeometries()[i].setRadius(4);
        }
      }
    }else{
      jzd = new maptalks.VectorLayer('point');
    }    
    console.log(jzd)
    if(projectData.ProjectItem.L.szJSONData){
       sz = maptalks.Layer.fromJSON(JSON.parse(projectData.ProjectItem.L.szJSONData));
      //为地图对象添加点击绑定事件
      if(sz.getGeometries()){
        for (let i = 0; i < sz.getGeometries().length; i++) {
          sz.getGeometries()[i].on("click", clickObj);
        }
      }
    }else{
       sz = new maptalks.VectorLayer('SZ');
    }
    console.log(sz)
    if(projectData.ProjectItem.L.jzxJSONData){
       jzx = maptalks.Layer.fromJSON(JSON.parse(projectData.ProjectItem.L.jzxJSONData));
      //为地图对象添加点击绑定事件
      if(jzx.getGeometries()){
        for (let i = 0; i < jzx.getGeometries().length; i++) {
          jzx.getGeometries()[i].on("click", clickObj);
        }
      }
    }else{
       jzx = new maptalks.VectorLayer('JZX');
    }
    console.log(jzx)
    if(projectData.ProjectItem.L.zdJSONData){
       zd = maptalks.Layer.fromJSON(JSON.parse(projectData.ProjectItem.L.zdJSONData));
        //为地图对象添加点击绑定事件
        if( zd.getGeometries()){
          for (let i = 0; i < zd.getGeometries().length; i++) {
            zd.getGeometries()[i].on("click", clickObj);
          }
        }
      }else{
       zd = new maptalks.VectorLayer('polygon');
    }
    console.log(zd)
    if(projectData.ProjectItem.L.zjJSONData){
       zj = maptalks.Layer.fromJSON(JSON.parse(projectData.ProjectItem.L.zjJSONData));
        //为地图对象添加点击绑定事件
        if(zj.getGeometries()){
          for (let i = 0; i < zj.getGeometries().length; i++) {
            zj.getGeometries()[i].on("click", clickObj);
          }
        }  
      }else{
       zj = new maptalks.VectorLayer('label');
    }
    console.log(zj)
    let location=new maptalks.VectorLayer("location");

  
    sz.addTo(map);
    jzx.addTo(map);
    zd.addTo(map);
    zj.addTo(map).bringToFront();  
    jzd.addTo(map).bringToFront();
    location.addTo(map);
    console.log(map)
    map.on('dblclick',recoverObj);

    //将测距测面积工具添加至地图
    distanceTool.addTo(map).disable();
    areaTool.addTo(map).disable();
    //将画图工具添加至地图
    drawTool.addTo(map).disable();
    maptalks.DrawTool.registerMode("QuadBezierCurve", {
      action: "clickDblclick",
      create: path => new maptalks.QuadBezierCurve(path),
      update: (path, geometry) => {
        geometry.setCoordinates(path);
      },
      generate: geometry => geometry
    });


    snap.addTo(map);
    snap.setLayer(map.getLayer("point"));
    snap.setGeometries(map.getLayer("point").getGeometries());
    snap.bindDrawTool(drawTool);
    snap.disable();
  }

  render() {
    const { onMenuItemClick } = this.props;

    return (
      <div>
        <div
          ref="map"
          style={{
            color: "#000",
            width: "100%",
            height: `${window.innerHeight}px`
          }}
        />
        <MapToolBar onClick={onMenuItemClick} text="zoom_in" />
      </div>
    );
  }
}

/**
 * 限定组件的一些属性
 */
Map.propTypes = {
  onMenuItemClick: PropTypes.func.isRequired
};

//加入reducer(mapReduce)
const mapReduce = (state = 0, action) => {
  //通过HTML获取当前定位
  if (
    action.type === "menuClick" &&
    action.payload.command === "get_location_html"
  ) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {
        enableHighAccuracy: true,
        timeout: 3000
      });
    } else {
      alert("浏览器不支持定位！");
    }
    function locationError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("定位失败,用户拒绝请求地理定位");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("定位失败,位置信息是不可用");
          break;
        case error.TIMEOUT:
          alert("定位失败,请求获取用户位置超时");
          break;
        case error.UNKNOWN_ERROR:
          alert("定位失败,定位系统失效");
          break;
        default:
          break;
      }
    }
    function locationSuccess(position) {
      let coords = position.coords;
      console.log(coords);
      const center = new maptalks.Coordinate(coords.longitude, coords.latitude);
      map.setCenter(center);
      const circle = new maptalks.Circle(center, 1, {
        symbol: {
          lineColor: "#000000",
          lineWidth: 1.5,
          polygonFill: "#1bbc9b",
          polygonOpacity: 0.4
        }
      });
      const label = new maptalks.Label("当前定位", center, {
        isClicked:false,
        box: false,
        type: "Label",
        symbol: {
          textWeight: "200",
          textFaceName: "宋体",
          textSize: 12,
          textFill: "#000000",
          textDy: -10,
          textAlign: "auto"
        }
      });
      //将对象添加至图层
      map.getLayer("location").addGeometry(circle);
      map.getLayer("location").addGeometry(label);
    }
  }
  //通过rtk获取当前定位
  if (
    action.type === "menuClick" &&
    action.payload.command === "get_location_rtk"
  ) {
    console.log("fetching...");
    let coords = JSON.parse(action.payload.data);
    console.log(coords);
    const center = new maptalks.Coordinate([coords[1], coords[0]]);
    map.setCenter(center);
    const circle = new maptalks.Circle(center, 1, {
      labels:"locationlabel",
      id:'locationcircle',
      symbol: {
        lineColor: "#000000",
        lineWidth: 1.5,
        polygonFill: "#1bbc9b",
        polygonOpacity: 0.4
      }
    });
    const label = new maptalks.Label("当前定位", center, {
      id:'locationlabel',
      box: false,
      type: "Label",
      symbol: {
        textWeight: "200",
        textFaceName: "宋体",
        textSize: 12,
        textFill: "#000000",
        textDy: -10,
        textAlign: "auto"
      }
    });
    //将对象添加至图层
    map.getLayer("location").addGeometry(circle);
    map.getLayer("location").addGeometry(label);
  }

  //地图放大
  if (action.type === "menuClick" && action.payload.command === "zoom_in") {
    map.zoomIn();
  }
  //地图缩小
  if (action.type === "menuClick" && action.payload.command === "zoom_out") {
    map.zoomOut();
  }
  return state;
};

RootReducer.merge(mapReduce);

//加入reducer(layerControlReduce)
const layerControlReduce = (
  state = {
    pointIsChecked: true,
    lineIsChecked: true,
    jzxIsChecked: true,
    polygonIsChecked: true,
    labelIsChecked: true
  },
  action
) => {
  //点选point图层控制其显示
  if (action.type === "handlePointIsChecked") {
    const pointIsChecked = {
      pointIsChecked: !state.pointIsChecked
    };
    if (pointIsChecked.pointIsChecked) {
      map.getLayer("point").show();
    } else {
      map.getLayer("point").hide();
    }
    console.log(pointIsChecked);
    return Object.assign({}, state, { ...pointIsChecked });
  }
  //点选line图层控制其显示
  if (action.type === "handleLineIsChecked") {
    const lineIsChecked = {
      lineIsChecked: !state.lineIsChecked
    };
    if (lineIsChecked.lineIsChecked) {
      map.getLayer("SZ").show();
    } else {
      map.getLayer("SZ").hide();
    }
    console.log(lineIsChecked);
    return Object.assign({}, state, { ...lineIsChecked });
  }
  //点选jzx图层控制其显示
  if (action.type === "handleJZXIsChecked") {
    const jzxIsChecked = {
      jzxIsChecked: !state.jzxIsChecked
    };
    if (jzxIsChecked.jzxIsChecked) {
      map.getLayer("JZX").show();
    } else {
      map.getLayer("JZX").hide();
    }
    console.log(jzxIsChecked);
    return Object.assign({}, state, { ...jzxIsChecked });
  }
  //点选polygon图层控制其显示
  if (action.type === "handlePolygonIsChecked") {
    const polygonIsChecked = {
      polygonIsChecked: !state.polygonIsChecked
    };
    if (polygonIsChecked.polygonIsChecked) {
      map.getLayer("polygon").show();
    } else {
      map.getLayer("polygon").hide();
    }
    console.log(polygonIsChecked);
    return Object.assign({}, state, { ...polygonIsChecked });
  }
  //点选注记图层控制其显示
  if (action.type === "handleLabelIsChecked") {
    const labelIsChecked = {
      labelIsChecked: !state.labelIsChecked
    };
    if (labelIsChecked.labelIsChecked) {
      map.getLayer("label").show();
    } else {
      map.getLayer("label").hide();
    }
    console.log(labelIsChecked);
    return Object.assign({}, state, { ...labelIsChecked });
  }
  return { ...state };
};

RootReducer.merge(layerControlReduce);

//加入Reducer(sketchReduce)
//初始化相关量
let labels = [],
  length,
  addObjLabel,
  computeAngle;
let plot,
  drawPoint,
  drawToolOn,
  drawLineEnd,
  drawLine,
  drawJZXEnd,
  drawJZX,
  drawCurve,
  drawCurveEnd,
  drawPolygonEnd,
  drawPolygon,
  drawBalconyEnd,
  drawBalcony,
  drawUndo,
  drawRedo;

let modifyPointId;

const sketchReduce = (
  state = {
    isRealtimeOn: false,
    drawAlert:false,
    plotIsChecked: false,
    drawPointIsChecked: false,
    drawLineIsChecked: false,
    drawJZXIsChecked: false,
    drawArcIsChecked: false,
    drawPolygonIsChecked: false,
    balconyIsChecked: false,
    addLabelIsChecked: false,
    measureDistanceIsChecked: false,
    measureAreaIsChecked: false,
    deleteIsChecked: false,
    chooseObjIsChecked: false,
    undoIsChecked: false,
    redoIsChecked: false,
    saveIsChecked: false,
    alertSave: true,
    alertPlotFail: false,
    errorMessage: "",
    alertSignature: false,
    showDelDialog: false,
    haveObjToDel: false,
    signatureIsChecked: false,
    jzdJSONData: JSON,
    szJSONData: JSON,
    zdJSONData: JSON,
    zjJSONData: JSON,
    poiTableData: [],
    mapCenter: [],
    plotListData: []
  },
  action
) => {
  let newState = JSON.parse(JSON.stringify(state))
  //用于计算标签的角度
  computeAngle =
    computeAngle ||
    function(a, b) {
      const mapProjection = map.getProjection();
      // console.log(mapProjection)

      const aProject = mapProjection.project(a);
      const bProject = mapProjection.project(b);
      // console.log(aProject)
      // console.log(bProject)

      // let angle = Math.atan((aProject.y-bProject.y)/(aProject.x-bProject.x)) * 180 / Math.PI;
      const angle =
        Math.atan2(bProject.y - aProject.y, bProject.x - aProject.x) *
        180 /
        Math.PI;

      return -angle;
    };
  //用于添加四至和宗地的线段标注
  addObjLabel =
    addObjLabel ||
    function(content, startPoi, endPoi) {
      let rotation = computeAngle(startPoi, endPoi);
      let coord = new maptalks.Coordinate({
        x: (startPoi.x + endPoi.x) / 2,
        y: (startPoi.y + endPoi.y) / 2
      });

      const rotation_rad = rotation / 180 * Math.PI;
      const dx = 10 * Math.sin(rotation_rad);
      const dy = -10 * Math.cos(rotation_rad);

      if (
        (rotation > 90 && rotation < 180) ||
        (rotation > -180 && rotation < -90)
      ) {
        rotation += 180;
      }
      let labelId=Number(Math.random().toString().substr(3,3) + Date.now()).toString(36);
      let objLabel = new maptalks.Label(content, coord, {
        id:labelId,
        isClicked:false,
        draggable: true,
        box: false,
        type: "Label",
        symbol: {
          textWeight: "200",
          textRotation: rotation,
          textFaceName: "宋体",
          textFill: "#000000",
          textSize: 12,
          textDx: dx,
          textDy: dy,
          textHorizontalAlignment: "middle",
          textVerticalAlignment: "middle",
          textAlign: "center"
        }
      });
      map.getLayer("label").addGeometry(objLabel);
      objLabel.on("click", clickObj);
      labels.push(objLabel.getId());
    };

  //打开画图工具
  drawToolOn =
    drawToolOn ||
    function() {
      drawTool.enable();
      console.log("on");
    };
  //用于展点
  plot =
    plot ||
    function(poi) {
      recoverObj();
      let jzdnum=Number(Math.random().toString().substr(3,3) + Date.now()).toString(36);
      let content = jzdnum;
      //为界址点添加点号注记
      let label = new maptalks.Label(content, poi, {
        id: jzdnum,
        isClicked:false,
        draggable: true,
        box: false,
        type: "Label",
        symbol: {
          color: "white",
          textWeight: "200",
          textFaceName: "宋体",
          textSize: 12,
          textFill: "#000000",
          textDy: -10,
          textAlign: "auto"
        }
      });
      label.on("click", clickObj);
      let point = new maptalks.Circle(poi, 1, {
        id: jzdnum,
        labels: label.getId(),
        picture: "",
        isClicked: false,
        symbol: {
          lineColor: "#000000",
          lineWidth: 1.5,
          polygonFill: "#FFFFFF"
        }
      });
      map.getLayer("label").addGeometry(label);
      map.getLayer("point").addGeometry(point);
      map.setCenter(poi);
      point.on("click", clickObj);
      console.log(point);
    };

  //画线时drawTool的绑定事件
  drawLineEnd =
    drawLineEnd ||
    function(param) {
      //由于手指双击平板识别率低，通过drawtool拾取点坐标后新建对象添加至地图
      recoverObj();
      let coorArr = param.geometry.getCoordinates();
      console.log(coorArr)
      coorArr.pop();//删除由于缓慢双击产生的最后一个坐标
      console.log(coorArr)
      //随机数加当前时间构成id
      let sznum=Number(Math.random().toString().substr(3,3) + Date.now()).toString(36);
      let  sz_line = new maptalks.LineString(coorArr, {
        id:sznum,
        isClicked:false,
        arrowStyle : null, 
        arrowPlacement : 'vertex-last',
        visible : true,
        editable : true,
        cursor : null,
        draggable : false,
        dragShadow : false, 
        drawOnAxis : null,
        symbol: {
          'lineColor' : '#000000',
          'lineWidth' : 1.5
        }
      });
      //为折线的每条线段添加长度标注
      for (let i = 0; i < coorArr.length - 1; i++) {
        //每条线段的起点和终点坐标
        let startPoi = coorArr[i],
          endPoi = coorArr[i+1];
        //计算每条线段的长度
        length = map.computeLength(startPoi, endPoi);
        sz_line.config("length", length);
        let content = sz_line.options.length.toFixed(2);
        addObjLabel(content, startPoi, endPoi);
      }
      sz_line.config("labels", labels);
      labels = [];
      //清除点选高亮的点样式
      for(let i=0;i<linePoiArr.length;i++){
        console.log(linePoiArr)
        map.getLayer('point').getGeometryById(linePoiArr[i]).updateSymbol({
          lineColor: "#000000",
          polygonFill: "#FFFFFF"
        });
      }
      map.getLayer("SZ").addGeometry(sz_line);
      sz_line.on("click", clickObj);
      recoverObj();
    };
  //用于画线
  drawLine =
    drawLine ||
    function() {
      drawTool.setMode("LineString").enable();
      drawTool.setSymbol({ lineColor: "#000000", lineWidth: 1.5 });
      drawTool.on("drawend", drawLineEnd);
    };
  //构面时drawTool的绑定事件
  drawPolygonEnd =
    drawPolygonEnd ||
    function(param) {
      let coorArr = param.geometry.getCoordinates()[0];
      //删除由于缓慢双击产生的最后一个坐标
     coorArr.pop();
      console.log(coorArr);
      //随机数加当前时间构成id
      let zdnum=Number(Math.random().toString().substr(3,3) + Date.now()).toString(36);
      let zd_obj=new maptalks.Polygon(coorArr, {
        id:zdnum,
        isClicked:false,
        polygonType:"ZD",
        visible : true,
        editable : true,
        cursor : 'pointer',
        draggable : false,
        drawOnAxis : null, 
        symbol: {
          lineColor: "#000000",
          lineWidth: 2,
          polygonFill: "#FFFFFF",
          polygonOpacity: 0.4
        }
      });
      let startPoi = [],
        endPoi = [];
      //为地块添加每段边长的注记
      for (let i = 0; i < coorArr.length; i++) {
        //每条线段的起点和终点坐标
        if (i < coorArr.length - 1) {
          startPoi = coorArr[i];
          endPoi = coorArr[i + 1];
        } else {
          startPoi = coorArr[i];
          endPoi = coorArr[0];
        }
        length = map.computeLength(startPoi, endPoi);
        let content = length.toFixed(2);
        addObjLabel(content, startPoi, endPoi);
      }
      zd_obj.config("labels", labels);
      labels = [];
      //清除点选高亮的点样式
      for(let i=0;i<linePoiArr.length;i++){
        console.log(linePoiArr)
        map.getLayer('point').getGeometryById(linePoiArr[i]).updateSymbol({
          lineColor: "#000000",
          polygonFill: "#FFFFFF"
        });
      }
      map.getLayer("polygon").addGeometry(zd_obj);
      zd_obj.on("click", clickObj);
      recoverObj();
      console.log(zd_obj)
      console.log(map)
    };
  //用于构面
  drawPolygon =
    drawPolygon ||
    function() {
      
      drawTool.setMode("Polygon").enable();
      drawTool.setSymbol({
        lineColor: "#000000",
        lineWidth: 2,
        polygonFill: "#FFFFFF",
        polygonOpacity: 0.4
      });
      drawTool.on("drawend", drawPolygonEnd);
    };
  //画阳台时绑定的事件
  drawBalconyEnd =
    drawBalconyEnd ||
    function(param) {
      let coorArr = param.geometry.getCoordinates()[0];
      coorArr.pop();//删除由于缓慢双击产生的最后一个坐标
      //随机数加当前时间构成id
      let zdnum=Number(Math.random().toString().substr(3,3) + Date.now()).toString(36);
      let zd_obj=new maptalks.Polygon(coorArr, {
        id:zdnum,
        isClicked:false,
        polygonType:"YT",
        visible : true,
        editable : true,
        cursor : 'pointer',
        draggable : false,
        drawOnAxis : null, 
        symbol: {
          lineColor: "#000000",
          lineWidth: 2,
          lineDasharray: [10, 5, 10, 5],
          polygonFill: "#FFFFFF",
          polygonOpacity: 0.6
        }
      });
      let startPoi = [],
      endPoi = [];
      //为地块添加每段边长的注记
      for (let i = 0; i < coorArr.length; i++) {
        //每条线段的起点和终点坐标
        if (i < coorArr.length - 1) {
          startPoi = coorArr[i];
          endPoi = coorArr[i + 1];
        } else {
          startPoi = coorArr[i];
          endPoi = coorArr[0];
        }
        length = map.computeLength(startPoi, endPoi);
        let content = length.toFixed(2);
        addObjLabel(content, startPoi, endPoi);
      }
      zd_obj.config("labels", labels);
      labels = [];
      //清除点选高亮的点样式
      for(let i=0;i<linePoiArr.length;i++){
        console.log(linePoiArr)
        map.getLayer('point').getGeometryById(linePoiArr[i]).updateSymbol({
          lineColor: "#000000",
          polygonFill: "#FFFFFF"
        });
      }
      map.getLayer("polygon").addGeometry(zd_obj);
      zd_obj.on("click", clickObj);
      recoverObj();
    };
  drawBalcony =
    drawBalcony ||
    function() {
      drawTool.setMode("Polygon").enable();
      drawTool.setSymbol({
        lineColor: "#000000",
        lineWidth: 2,
        lineDasharray: [10, 5, 10, 5],
        polygonFill: "#FFFFFF",
        polygonOpacity: 0.6
      });
      drawTool.on("drawend", drawBalconyEnd);
    };

  //撤销
  drawUndo =
    drawUndo ||
    function() {
      drawTool.undo();
    };
  //重做
  drawRedo =
    drawRedo ||
    function() {
      drawTool.redo();
    };

  //////
  switch (action.type) {
    //实时定位
    case "handleRealtimeMapping":
      const isRealtimeOn = { isRealtimeOn: !state.isRealtimeOn };
      if (isRealtimeOn.isRealtimeOn) {
        console.log("打开了");
      } else {
        console.log("没打开");
      }
      return Object.assign({}, state, { ...isRealtimeOn });
    //修正点坐标
    case "jzdPlotClick":
      map.off("click", drawPoint);
      modifyPointId = action.payload.command;
      if (!drawPoint) {
        drawPoint = function(e) {
          console.log("纠正点位")
          let num = modifyPointId;          
          let oldPoi = map.getLayer("point").getGeometryById(num);
          let oldLabel = map.getLayer("label").getGeometryById(num);
          let labelContent= num;
          console.log(labelContent)
          //为界址点添加点号注记
          let label = new maptalks.Label(labelContent, e.coordinate, {
            id: num,
            isClicked:false,
            draggable: true,
            box: false,
            type: "Label",
            symbol: {
              textWeight: "200",
              textFaceName: "宋体",
              textSize: 12,
              textFill: "#000000",
              textDy: -10,
              textAlign: "auto"
            }
          });
          label.on("click", clickObj);
          let point = new maptalks.Circle(e.coordinate, 4, {
            id: num,
            labels: label.getId(),
            picture: oldPoi.options.picture,
            isClicked: false,
            symbol: {
              lineColor: "#000000",
              lineWidth: 1.5,
              polygonFill: "#FFFFFF"
            }
          });
          
          oldPoi.remove();
          oldLabel.remove();
          map.getLayer("label").addGeometry(label);
          map.getLayer("point").addGeometry(point);
          point.on("click", clickObj);
        };
      }
      map.on("click", drawPoint);
      const new_jzdData = map.getLayer("point").toJSON()
      let new_jzdpoi = new_jzdData.geometries;
      let new_tableRow;
      let new_tableData = [];
      for (let i = 0; i < new_jzdpoi.length; i++) {
        new_tableRow = {
          id: new_jzdpoi[i].feature.id,
          coordinates: new_jzdpoi[i].coordinates,
        };
        new_tableData.push(new_tableRow);
      }
      const updateTableData={
        plotListData: new_tableData
      }
      return Object.assign({}, state, { ...updateTableData });

    //展点
    case "plotRTK":
      console.log("展点");
      recoverObj();
      map.off("click", drawPoint);
      drawTool.disable();
      distanceTool.disable();
      areaTool.disable();
      snap.disable();
      let plotData = [];
      plotData = JSON.parse(action.payload.data);
      console.log(plotData);
      let poi = new maptalks.Coordinate([plotData[1], plotData[0]]);
      plot(poi);
      const plotSuccessState = {
        plotIsChecked: true,
        drawPointIsChecked: false,
        drawLineIsChecked: false,
        drawJZXIsChecked: false,
        drawArcIsChecked: false,
        drawPolygonIsChecked: false,
        balconyIsChecked: false,
        measureDistanceIsChecked: false,
        measureAreaIsChecked: false,
        addLabelIsChecked: false,
        deleteIsChecked: false,
        chooseObjIsChecked: false,
        undoIsChecked: false,
        redoIsChecked: false,
        saveIsChecked: false,
        alertSave: true,
        signatureIsChecked: false
      };
      return { ...state, ...plotSuccessState };
    case "plotFail":
      let error = action.payload;
      console.log(error);

      const plotFailState = {
        plotIsChecked: true,
        alertPlotFail: true,
        errorMessage: error,
        drawPointIsChecked: false,
        drawLineIsChecked: false,
        drawJZXIsChecked: false,
        drawArcIsChecked: false,
        drawPolygonIsChecked: false,
        balconyIsChecked: false,
        measureDistanceIsChecked: false,
        measureAreaIsChecked: false,
        addLabelIsChecked: false,
        deleteIsChecked: false,
        chooseObjIsChecked: false,
        undoIsChecked: false,
        redoIsChecked: false,
        saveIsChecked: false,
        alertSave: true,
        signatureIsChecked: false
      };
      return { ...state, ...plotFailState };
    //通过文件展点
    case "plotFile":
      return { ...state };

    //关闭错误提示
    case "plotAlerClose":
      if (state.isRealtimeOn) {
        const closePlotAlert1 = { alertPlotFail: false };
        return Object.assign({}, state, { ...closePlotAlert1 });
      } else {
        const closePlotAlert2 = { alertPlot2: false };
        return Object.assign({}, state, { ...closePlotAlert2 });
      }

    case "handleChooseItem":
      return {...state};
   
    //取界址点号
    case "fetchPoi_NumClick":
        map.off("click", drawPoint);
        let i = action.payload2.id - 1;
        let old_id=action.payload2.id;//旧id
        let new_id=action.payload1.d;

        map.getLayer("point").getGeometryById(old_id).setId(new_id); 

        let oldLabel = map.getLayer("label").getGeometryById(old_id);
        let labelContent=new_id;
        console.log(labelContent)
        //为界址点添加点号注记
        let label = new maptalks.Label(labelContent, oldLabel.getCoordinates(), {
            id: new_id,
            isClicked:false,
            draggable: true,
            box: false,
            type: "Label",
            symbol: {
              textWeight: "200",
              textFaceName: "宋体",
              textSize: 12,
              textFill: "#000000",
              textDy: -10,
              textAlign: "auto"
            }
        });
        label.on("click", clickObj);
        oldLabel.remove();
        map.getLayer("label").addGeometry(label);
        map.getLayer("point").getGeometryById(new_id).config('labels',new_id)
        //更新实时成图点列表数据
        const new_jzdData2 = map.getLayer("point").toJSON()
        let new_jzdpoi2 = new_jzdData2.geometries;
        let new_tableRow2;
        let new_tableData2 = [];
        for (let i = 0; i < new_jzdpoi2.length; i++) {
          new_tableRow2 = {
            id: new_jzdpoi2[i].feature.id,
            coordinates: new_jzdpoi2[i].coordinates,
          };
          new_tableData2.push(new_tableRow2);
        }
        const updateTableData2={
          plotListData: new_tableData2
        }
        return Object.assign({}, state, { ...updateTableData2 });   
   
    //画点
    case "drawPointClick":
      console.log(state.plotListData)
      const jzdData = map.getLayer("point").toJSON()
      let jzdpoi = jzdData.geometries;
      let tableRow;
      let tableData = [];
      for (let i = 0; i < jzdpoi.length; i++) {
        tableRow = {
          id: jzdpoi[i].feature.id,
          coordinates: jzdpoi[i].coordinates
        };
        tableData.push(tableRow);
      }
      recoverObj();
      drawTool.disable();
      distanceTool.disable();
      areaTool.disable();
      snap.disable();
      map.off("dblclick", drawToolOn);
      map.off("click", drawPoint);
      if (!state.drawPointIsChecked) {
        drawTool.off("drawend", drawPolygonEnd);
        drawTool.off("drawend", drawLineEnd);
        drawTool.off("drawend", drawJZXEnd);
        drawTool.off("drawend", drawBalconyEnd);
        drawTool.off("drawend", drawCurveEnd);
        map.off("click", addLabel);
      } else {
        map.off("click", drawPoint);
      }
      const newState1 = {
        plotIsChecked: false,
        plotListData: tableData,
        drawPointIsChecked: !state.drawPointIsChecked,
        drawLineIsChecked: false,
        drawJZXIsChecked: false,
        drawArcIsChecked: false,
        drawPolygonIsChecked: false,
        balconyIsChecked: false,
        measureDistanceIsChecked: false,
        measureAreaIsChecked: false,
        addLabelIsChecked: false,
        chooseObjIsChecked: false,
        deleteIsChecked: false,
        undoIsChecked: false,
        redoIsChecked: false,
        saveIsChecked: false,
        alertSave: true,
        signatureIsChecked: false
      };
      return { ...state, ...newState1 };

    //画四至线
    case "drawLineClick":
      recoverObj();
      map.off("click", drawPoint);
      if (!state.drawLineIsChecked) {
        map.off("click", drawPoint);
        distanceTool.disable();
        areaTool.disable();
        drawTool.off("drawend", drawJZXEnd);
        drawTool.off("drawend", drawCurveEnd);
        drawTool.off("drawend", drawPolygonEnd);
        drawTool.off("drawend", drawBalconyEnd);
        map.off("click", addLabel);
        snap.enable();
        //开始画线
        drawLine();
        map.on("dblclick", drawToolOn);
      } else {
        drawTool.disable();
        snap.disable();
        map.off("dblclick", drawToolOn);
      }
      const newState2 = {
        plotIsChecked: false,
        drawPointIsChecked: false,
        drawLineIsChecked: !state.drawLineIsChecked,
        drawJZXIsChecked: false,
        drawArcIsChecked: false,
        drawPolygonIsChecked: false,
        balconyIsChecked: false,
        measureDistanceIsChecked: false,
        measureAreaIsChecked: false,
        addLabelIsChecked: false,
        chooseObjIsChecked: false,
        deleteIsChecked: false,
        undoIsChecked: false,
        redoIsChecked: false,
        saveIsChecked: false,
        alertSave: true,
        signatureIsChecked: false
      };
      return { ...state, ...newState2 };
    //画界址线
    case "drawJZXClick":
      recoverObj();
      map.off("click", drawPoint);
      //画线时drawTool的绑定事件
      drawJZXEnd =
        drawJZXEnd ||
        function(param) {
          recoverObj();
          let coorArr = param.geometry.getCoordinates();
          coorArr.pop();//删除由于缓慢双击产生的最后一个坐标
          //随机数加当前时间构成id
          let jzxnum=Number(Math.random().toString().substr(3,3) + Date.now()).toString(36);
          let  jzx_line = new maptalks.LineString(coorArr, {
            id:jzxnum,
            isClicked:false,
            arrowStyle : null, 
            arrowPlacement : 'vertex-last',
            visible : true,
            editable : true,
            cursor : null,
            draggable : false,
            dragShadow : false, 
            drawOnAxis : null,
            symbol: {
              'lineColor' : '#000000',
              'lineWidth' : 1.5
            }
          });
          //为折线的每条线段添加长度标注
          for (let i = 0; i < coorArr.length - 1; i++) {
            //每条线段的起点和终点坐标
            let startPoi = coorArr[i],
              endPoi = coorArr[i + 1];
            //计算每条线段的长度
            length = map.computeLength(startPoi, endPoi);
            jzx_line.config("length", length);
            let content = jzx_line.options.length.toFixed(2);
            addObjLabel(content, startPoi, endPoi);
          }
          jzx_line.config("labels", labels);
          labels = [];
          jzx_line.config("poiArr", linePoiArr);
          //清除点选高亮的点样式
          for(let i=0;i<linePoiArr.length;i++){
            console.log(linePoiArr)
            map.getLayer('point').getGeometryById(linePoiArr[i]).updateSymbol({
              lineColor: "#000000",
              polygonFill: "#FFFFFF"
            });
          }
          map.getLayer("JZX").addGeometry(jzx_line);
          jzx_line.on("click", clickObj);
          linePoiArr = [];
        };
      //用于画线
      drawJZX =
        drawJZX ||
        function() {
          linePoiArr = [];
          drawTool.setMode("LineString").enable();
          drawTool.setSymbol({ lineColor: "#000000", lineWidth: 1.5 });
          drawTool.on("drawend", drawJZXEnd);
        };

      if (!state.drawJZXIsChecked) {
        map.off("click", drawPoint);
        distanceTool.disable();
        areaTool.disable();
        drawTool.off("drawend", drawLineEnd);
        drawTool.off("drawend", drawCurveEnd);
        drawTool.off("drawend", drawPolygonEnd);
        drawTool.off("drawend", drawBalconyEnd);
        map.off("click", addLabel);
        snap.enable();
        //开始画线
        drawJZX();
        map.on("dblclick", drawToolOn);
      } else {
        drawTool.disable();
        snap.disable();
        map.off("dblclick", drawToolOn);
      }
      const JZXState = {
        plotIsChecked: false,
        drawPointIsChecked: false,
        drawLineIsChecked: false,
        drawArcIsChecked: false,
        drawJZXIsChecked: !state.drawJZXIsChecked,
        drawPolygonIsChecked: false,
        balconyIsChecked: false,
        measureDistanceIsChecked: false,
        measureAreaIsChecked: false,
        addLabelIsChecked: false,
        chooseObjIsChecked: false,
        deleteIsChecked: false,
        undoIsChecked: false,
        redoIsChecked: false,
        saveIsChecked: false,
        alertSave: true,
        signatureIsChecked: false
      };
      return { ...state, ...JZXState };
    //画弧线
    case "drawArcClick":
      //画线时drawTool的绑定事件
      drawCurveEnd =
        drawCurveEnd ||
        function(param) {
          let coorArr = param.geometry.getCoordinates();
          coorArr.pop();//删除由于缓慢双击产生的最后一个坐标
          //随机数加当前时间构成id
          let jzxnum=Number(Math.random().toString().substr(3,3) + Date.now()).toString(36);
          let jzx_arc = new maptalks.QuadBezierCurve(coorArr, {
            id:jzxnum,
            isClicked:false,
            symbol :{
              lineColor: "#000000",
               lineWidth: 1.5 
            }
          });
          jzx_arc.config("poiArr", linePoiArr);
          //清除点选高亮的点样式
          for(let i=0;i<linePoiArr.length;i++){
            console.log(linePoiArr)
            map.getLayer('point').getGeometryById(linePoiArr[i]).updateSymbol({
              lineColor: "#000000",
              polygonFill: "#FFFFFF"
            });
          }
          map.getLayer("JZX").addGeometry(jzx_arc);
          jzx_arc.on("click", clickObj);
          recoverObj();
          linePoiArr = [];
        };
      //用于画线
      drawCurve =
        drawCurve ||
        function() {
          recoverObj();
          linePoiArr = [];
          drawTool.setMode("QuadBezierCurve").enable();
          drawTool.setSymbol({ lineColor: "#000000", lineWidth: 1.5 });
          drawTool.on("drawend", drawCurveEnd);
        };

      if (!state.drawArcIsChecked) {
        map.off("click", drawPoint);
        distanceTool.disable();
        areaTool.disable();
        drawTool.off("drawend", drawLineEnd);
        drawTool.off("drawend", drawJZXEnd);
        drawTool.off("drawend", drawPolygonEnd);
        drawTool.off("drawend", drawBalconyEnd);
        map.off("click", addLabel);
        map.off("click", drawPoint);
        snap.enable();
        //开始画线
        drawCurve();
        map.on("dblclick", drawToolOn);
      } else {
        drawTool.disable();
        snap.disable();
        map.off("dblclick", drawToolOn);
      }
      const CurveState = {
        plotIsChecked: false,
        drawPointIsChecked: false,
        drawLineIsChecked: false,
        drawJZXIsChecked: false,
        drawArcIsChecked: !state.drawArcIsChecked,
        drawPolygonIsChecked: false,
        balconyIsChecked: false,
        measureDistanceIsChecked: false,
        measureAreaIsChecked: false,
        addLabelIsChecked: false,
        chooseObjIsChecked: false,
        deleteIsChecked: false,
        undoIsChecked: false,
        redoIsChecked: false,
        saveIsChecked: false,
        alertSave: true,
        signatureIsChecked: false
      };
      console.log(state);
      return { ...state, ...CurveState };
    //构面
    case "drawPolygonClick":
    
      console.log(map.getLayer("polygon"))
      if (!state.drawPolygonIsChecked) {
        map.off("click", drawPoint);
        distanceTool.disable();
        areaTool.disable();
        drawTool.off("drawend", drawLineEnd);
        drawTool.off("drawend", drawJZXEnd);
        drawTool.off("drawend", drawCurveEnd);
        drawTool.off("drawend", drawBalconyEnd);
        map.off("click", addLabel);
        snap.enable();
        //开始构面
        drawPolygon();
        map.on("dblclick", drawToolOn);
        map.off("click", drawPoint);
      } else {
        drawTool.disable();
        snap.disable();
        map.off("dblclick", drawToolOn);
      }
      const newState3 = {
        plotIsChecked: false,
        drawPointIsChecked: false,
        drawLineIsChecked: false,
        drawJZXIsChecked: false,
        drawPolygonIsChecked: !state.drawPolygonIsChecked,
        drawArcIsChecked: false,
        balconyIsChecked: false,
        measureDistanceIsChecked: false,
        measureAreaIsChecked: false,
        addLabelIsChecked: false,
        chooseObjIsChecked: false,
        deleteIsChecked: false,
        undoIsChecked: false,
        redoIsChecked: false,
        saveIsChecked: false,
        alertSave: true,
        signatureIsChecked: false
      };
      return { ...state, ...newState3 };
    //阳台
    case "balconyClick":
      if (!state.balconyIsChecked) {
        map.off("click", drawPoint);
        distanceTool.disable();
        areaTool.disable();
        drawTool.off("drawend", drawLineEnd);
        drawTool.off("drawend", drawJZXEnd);
        drawTool.off("drawend", drawCurveEnd);
        drawTool.off("drawend", drawPolygonEnd);
        map.off("click", addLabel);
        snap.enable();
        //开始构面
        drawBalcony();
        map.on("dblclick", drawToolOn);
      } else {
        drawTool.disable();
        snap.disable();
        map.off("dblclick", drawToolOn);
      }
      const newState4 = {
        plotIsChecked: false,
        drawPointIsChecked: false,
        drawLineIsChecked: false,
        drawJZXIsChecked: false,
        drawArcIsChecked: false,
        drawPolygonIsChecked: false,
        balconyIsChecked: !state.balconyIsChecked,
        measureDistanceIsChecked: false,
        measureAreaIsChecked: false,
        addLabelIsChecked: false,
        chooseObjIsChecked: false,
        deleteIsChecked: false,
        undoIsChecked: false,
        redoIsChecked: false,
        saveIsChecked: false,
        alertSave: true,
        signatureIsChecked: false
      };
      return { ...state, ...newState4 };
    //添加自定义注记
    case "addLabelClick":
      drawTool.disable();
      distanceTool.disable();
      areaTool.disable();
      map.off("click", drawToolOn);
      map.off("click", drawPoint);
      map.off("dblclick", drawToolOn);
      drawTool.off("drawend", drawLineEnd);
      drawTool.off("drawend", drawJZXEnd);
      drawTool.off("drawend", drawCurveEnd);
      drawTool.off("drawend", drawPolygonEnd);
      drawTool.off("drawend", drawBalconyEnd);
      map.off("dblclick", drawToolOn);
      if (!state.addLabelIsChecked) {
        map.on("click", addLabel);
      } else {
        map.off("click", addLabel);
      }

      const newState5 = {
        plotIsChecked: false,
        drawPointIsChecked: false,
        drawLineIsChecked: false,
        drawJZXIsChecked: false,
        drawArcIsChecked: false,
        drawPolygonIsChecked: false,
        balconyIsChecked: false,
        addLabelIsChecked: !state.addLabelIsChecked,
        measureDistanceIsChecked: false,
        measureAreaIsChecked: false,
        chooseObjIsChecked: false,
        deleteIsChecked: false,
        undoIsChecked: false,
        redoIsChecked: false,
        saveIsChecked: false,
        alertSave: true,
        signatureIsChecked: false
      };
      return { ...state, ...newState5 };
    //测距
    case "measureDistanceClick":
      if (!state.measureDistanceIsChecked) {
        drawTool.off("drawend", drawPolygonEnd);
        drawTool.off("drawend", drawLineEnd);
        drawTool.off("drawend", drawJZXEnd);
        drawTool.off("drawend", drawBalconyEnd);
        drawTool.off("drawend", drawCurveEnd);
        map.off("click", addLabel);
        map.off("click", drawPoint);
        map.off("dblclick", drawToolOn);
        drawTool.disable();
        areaTool.disable();
        distanceTool.enable();
        console.log(state.measureDistanceIsChecked);
      } else {
        distanceTool.disable();
        console.log(state.measureDistanceIsChecked);
      }
      const measureDis = {
        plotIsChecked: false,
        drawPointIsChecked: false,
        drawLineIsChecked: false,
        drawJZXIsChecked: false,
        drawArcIsChecked: false,
        drawPolygonIsChecked: false,
        balconyIsChecked: false,
        addLabelIsChecked: false,
        measureDistanceIsChecked: !state.measureDistanceIsChecked,
        measureAreaIsChecked: false,
        chooseObjIsChecked: false,
        deleteIsChecked: false,
        undoIsChecked: false,
        redoIsChecked: false,
        saveIsChecked: false,
        alertSave: true,
        signatureIsChecked: false
      };
      return { ...state, ...measureDis };
    //测面积
    case "measureAreaClick":
      if (!state.measureAreaIsChecked) {
        drawTool.off("drawend", drawPolygonEnd);
        drawTool.off("drawend", drawLineEnd);
        drawTool.off("drawend", drawJZXEnd);
        drawTool.off("drawend", drawBalconyEnd);
        drawTool.off("drawend", drawCurveEnd);
        map.off("click", addLabel);
        map.off("click", drawPoint);
        map.off("dblclick", drawToolOn);
        drawTool.disable();
        distanceTool.disable();
        areaTool.enable();
        console.log(state.measureAreaIsChecked);
      } else {
        areaTool.disable();
        console.log(state.measureAreaIsChecked);
      }
      const measureArea = {
        plotIsChecked: false,
        drawPointIsChecked: false,
        drawLineIsChecked: false,
        drawJZXIsChecked: false,
        drawArcIsChecked: false,
        drawPolygonIsChecked: false,
        balconyIsChecked: false,
        addLabelIsChecked: false,
        measureAreaIsChecked: !state.measureAreaIsChecked,
        measureDistanceIsChecked: false,
        chooseObjIsChecked: false,
        deleteIsChecked: false,
        undoIsChecked: false,
        redoIsChecked: false,
        saveIsChecked: false,
        alertSave: true,
        signatureIsChecked: false
      };
      return { ...state, ...measureArea };
    //删除
    case "deleteClick":
      console.log(target);
      drawTool.disable();
      distanceTool.disable();
      areaTool.disable();
      map.off("click", drawToolOn);
      map.off("click", drawPoint);
      map.off("click", addLabel);
      map.off("dblclick", drawToolOn);
      console.log(clickedObj.length)
      if (clickedObj.length>0) {
        const newState6 = {
          deleteIsChecked: !state.deleteIsChecked,
          showDelDialog: true,
          haveObjToDel: false,
          undoIsChecked: false,
          redoIsChecked: false,
          saveIsChecked: false,
          signatureIsChecked: false,
          alertSave: true
        };
        return Object.assign({}, state, { ...newState6 });
      } else {
        const stateDelFail = {
          deleteIsChecked: !state.deleteIsChecked,
          showDelDialog: false,
          haveObjToDel: true,
          undoIsChecked: false,
          redoIsChecked: false,
          saveIsChecked: false,
          signatureIsChecked: false,
          alertSave: true
        };
        return Object.assign({}, state, { ...stateDelFail });
      }

    case "handleCloseDelDialog":
      const showDelDialog1 = { showDelDialog: false };
      return Object.assign({}, state, { ...showDelDialog1 });

    case "handleDelete":
      deleteObj();
      clickedObj=[];
      const showDelDialog2 = { showDelDialog: false };
      return Object.assign({}, state, { ...showDelDialog2 });
    case "delAlerClose":
      const closeAlert = { haveObjToDel: false };
      return Object.assign({}, state, { ...closeAlert });
    //选中
    case "chooseObjClick":
      console.log("choose");
      drawTool.disable();
      distanceTool.disable();
      areaTool.disable();
      snap.enable();
      map.off("click", drawToolOn);
      map.off("click", drawPoint);
      map.off("click", addLabel);
      map.off("dblclick", drawToolOn);
      const newState7 = {
        plotIsChecked: false,
        drawPointIsChecked: false,
        drawLineIsChecked: false,
        drawJZXIsChecked: false,
        drawArcIsChecked: false,
        drawPolygonIsChecked: false,
        balconyIsChecked: false,
        addLabelIsChecked: false,
        measureAreaIsChecked: false,
        measureDistanceIsChecked: false,
        chooseObjIsChecked: !state.chooseObjIsChecked,
        deleteIsChecked: false,
        undoIsChecked: false,
        redoIsChecked: false,
        saveIsChecked: false,
        signatureIsChecked: false,
        alertSave: true
      };
      return Object.assign({}, state, { ...newState7 });
    //撤销
    case "undoClick":
    map.off("click", drawPoint);
    if(drawTool.getCurrentGeometry()){
      drawUndo();
      const new_drawAlert={ drawAlert:false}
      return Object.assign({}, state, { ...new_drawAlert });
    }else{
      const new_drawAlert={ drawAlert:true}
      return Object.assign({}, state, { ...new_drawAlert });
    }
    //重做
    case "redoClick":
      console.log("重做");
      map.off("click", drawPoint);
      if(drawTool.getCurrentGeometry()){
        drawRedo();
        const new_drawAlert={ drawAlert:false}
        return Object.assign({}, state, { ...new_drawAlert });
      }else{
        const new_drawAlert={ drawAlert:true}
        return Object.assign({}, state, { ...new_drawAlert });
      }
    //关闭错误使用撤销重做提示
    case "drawAlerClose":
    const drawAlerClose = { drawAlert: false };
    return Object.assign({}, state, { ...drawAlerClose });
    //保存
    case "saveClick":
      if (map === undefined){
        return { ...state };
      } else{
        let mapCenter = map.getCenter();
        drawTool.disable();
        distanceTool.disable();
        areaTool.disable();
        map.off("click", drawToolOn);
        map.off("click", drawPoint);
        map.off("click", addLabel);
        map.off("dblclick", drawToolOn);
        
        const saveData = {
          plotIsChecked: false,
          drawPointIsChecked: false,
          drawLineIsChecked: false,
          drawJZXIsChecked: false,
          drawArcIsChecked: false,
          drawPolygonIsChecked: false,
          balconyIsChecked: false,
          addLabelIsChecked: false,
          measureAreaIsChecked: false,
          measureDistanceIsChecked: false,
          chooseObjIsChecked: false,
          deleteIsChecked: false,
          undoIsChecked: false,
          redoIsChecked: false,
          saveIsChecked: true,
          signatureIsChecked: false,
          alertSave: false,
          mapCenter: mapCenter,
          jzdJSONData: map.getLayer("point").toJSON(),
          szJSONData: map.getLayer("SZ").toJSON(),
          jzxJSONData: map.getLayer("JZX").toJSON(),
          zdJSONData: map.getLayer("polygon").toJSON(),
          zjJSONData: map.getLayer("label").toJSON()
        };
        //将图层数据存储至项目变量中
        projectData.ProjectItem.L.jzdJSONData = JSON.stringify(
          saveData.jzdJSONData
        );
        projectData.ProjectItem.L.szJSONData = JSON.stringify(
          saveData.szJSONData
        );
        projectData.ProjectItem.L.jzxJSONData = JSON.stringify(
          saveData.jzxJSONData
        );
        projectData.ProjectItem.L.zdJSONData = JSON.stringify(
          saveData.zdJSONData
        );
        projectData.ProjectItem.L.zjJSONData = JSON.stringify(
          saveData.zjJSONData
        );
  
        console.log(saveData.jzxJSONData)
        console.log(projectData.ProjectItem.L.jzxJSONData)
  
        return Object.assign({}, state, { ...saveData });
      }
     
    case "saveAlertClose":
      const saveAlertClose = { alertSave: false };
      return Object.assign({}, state, { ...saveAlertClose });
    //签章
    case "signatureClick":
      if (state.saveIsChecked) {
        const signature = { signatureIsChecked: true };
        return Object.assign({}, state, { ...signature });
      } else {
        const signatureState2 = {
          alertSignature: true,
          signatureIsChecked: false
        };
        return Object.assign({}, state, { ...signatureState2 });
      }

    case "signatureAlerClose":
      const signatureAlertClose = { alertSignature: false };
      return Object.assign({}, state, { ...signatureAlertClose });
    case "signatureClose":
      const signatureClose = { signatureIsChecked: false };
      return Object.assign({}, state, { ...signatureClose });

    //草图专题图切换时初始化数据
    case "resetSketchState":
      console.log("reset");
      const resetSketchState = {
        plotIsChecked: false,
        drawPointIsChecked: false,
        drawLineIsChecked: false,
        drawJZXIsChecked: false,
        drawArcIsChecked: false,
        drawPolygonIsChecked: false,
        balconyIsChecked: false,
        addLabelIsChecked: false,
        measureAreaIsChecked: false,
        measureDistanceIsChecked: false,
        deleteIsChecked: false,
        chooseObjIsChecked: false,
        undoIsChecked: false,
        redoIsChecked: false,
        saveIsChecked: false,
        alertSave: true,
        showDelDialog: false,
        haveObjToDel: false
      };
      return Object.assign({}, state, { ...resetSketchState });
    //界址点签章表点击后高亮
    case "jzxTableClick":
      let line_num = action.payload.command;
      console.log(line_num);
      let jzxPoi = map.getLayer("JZX").getGeometryById(line_num);
      console.log(jzxPoi);
      jzxPoi.updateSymbol({ lineColor: "#00FFFF" });
      const jzxTable = {
        signatureIsChecked: false
      };
      return Object.assign({}, state, { ...jzxTable });
    //点击拍照按钮后读取所选的界址点点号并打开摄像头进行拍照
    case 'jzdXCZJClick':
      projectData.PoiId =  action.payload.command;
      return {...state}

    default:
      return { ...state };
  }
};
RootReducer.merge(sketchReduce);
/**
* 
* @param {*} state 
* @param {*} ownProps 
*/
const mapStateToProps = (state, ownProps) => {
  return {
    text: ownProps.ownProps
  };
};
/**
 * 只对顶层view可见
 * @param {*} dispatch 
 * @param {*} ownProps 
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMenuItemClick: text => {
      if (text === "get_location") {
        console.log(ownProps);
        if (ownProps.isRealtimeOn) {
          fetch(
            appConfig.fileServiceRootPath + "/bluetooth/connect/RTK/printnmea"
          )
            .then(response => response.json())
            .then(json => {
              dispatch({
                type: "menuClick",
                payload: {
                  command: "get_location_rtk",
                  data: json
                }
              });
            })
            .catch(e => {
              console.log(e);
            });
        } else {
          dispatch({
            type: "menuClick",
            payload: {
              command: "get_location_html"
            }
          });
        }
      } else {
        dispatch({
          type: "menuClick",
          payload: {
            command: text
          }
        });
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
