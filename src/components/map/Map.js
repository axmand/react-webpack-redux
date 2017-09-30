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
import projectData from './../../redux/RootData';

//引入地图组件
import MapToolBar from "./MapToolBar";
/**
 * @type {maptalks.Map}
 * 全局的地图对象和方法
 */
let map;
let drawTool;
let snap;

/**
 * 地图组件
 * @class
 */
class Map extends Component {
  componentDidMount() {
    const mapDiv = this.refs.map;
    map = new maptalks.Map(mapDiv, {
      center: [114.360734,30.541093],
      zoom: 16,
      baseLayer: new maptalks.TileLayer("base", {
        crossOrigin:'anonymous',
        'urlTemplate' : 'http://webrd{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
        'subdomains'  : ['01','02','03','04'],
        'attribution' : '&copy; <a href="http://www.gaode.com/">Gaode.com</a>'
      }),
      layers: [
        new maptalks.VectorLayer("location"),
        new maptalks.VectorLayer("point"),
        new maptalks.VectorLayer("line"),
        new maptalks.VectorLayer("polygon"),
        new maptalks.VectorLayer("label")
      ]
    });
    map.setZoom(18);
    //将画图工具添加至地图
    drawTool = new maptalks.DrawTool({
      mode: "Polygon",
      symbol: {
        lineColor: "#000",
        lineWidth: 3
      }
    })
      .addTo(map)
      .disable();
    //为界址点图层添加snapto工具
    snap = new SnapTool({
      tolerance: 5,
      mode: "point"
    });
    snap.addTo(map);
    snap.setLayer(map.getLayer("point"));
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
        <MapToolBar 
          onClick={onMenuItemClick} 
          text="zoom_in"
          
          />
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
  if (action.type === "menuClick" &&action.payload.command === "get_location_html") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locationSuccess, locationError,{
          enableHighAccuracy: true,
          timeout: 5000,
        });
      }else{
        alert("浏览器不支持定位！");
      }
    function locationError(error){
      switch(error.code) { 
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
        default:break;
      }
    }
    function locationSuccess(position){
      let coords = position.coords;    
      console.log(coords)
      const center = new maptalks.Coordinate(coords.longitude,coords.latitude);
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
  if(action.type === "menuClick" &&action.payload.command === "get_location_rtk"){
    console.log("fetching...")
      let coords=JSON.parse(action.payload.data);
      console.log(coords);
      const center= new maptalks.Coordinate([coords[1],coords[0]]);
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
        map.getLayer("line").show();
      } else {
        map.getLayer("line").hide();
      }
      console.log(lineIsChecked);
      return Object.assign({}, state, { ...lineIsChecked });
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
let target,
  labels = [],
  length,
  clickedObj = [],
  addObjLabel,
  deleteObj,
  clickObj,
  recoverObj,
  computeAngle;
let plot,
  drawPoint,
  drawToolOn,
  drawLineEnd,
  drawLine,
  drawPolygonEnd,
  drawPolygon,
  drawBalconyEnd,
  drawBalcony,
  addLabel,
  labelEditEnd,
  drawUndo,
  drawRedo;

const sketchReduce = (
  state = {
    pointNum: 0,
    tableRowId:0,
    isRealtimeOn: false,
    plotIsChecked: false,
    drawPointIsChecked: false,
    drawLineIsChecked: false,
    drawPolygonIsChecked:false,
    balconyIsChecked:false,
    addLabelIsChecked:false,
    deleteIsChecked:false,
    chooseObjIsChecked:false,
    undoIsChecked:false,
    redoIsChecked:false,
    saveIsChecked:false,
    alertSave:true,
    alertPlotFail:false,
    errorMessage:"",
    alertSignature:false,
    showDelDialog:false,
    haveObjToDel:false,
    signatureIsChecked:false,
    jzdJSONData:JSON,
    szJSONData:JSON,
    zdJSONData:JSON,
    zjJSONData:JSON,
    poiTableData:[],
    mapCenter:[],
}, action) =>{

//用于获取点线面对象
clickObj =clickObj ||function(e) {
  target = e.target;
  clickedObj.push(target);
  console.log(target);
  if (target._jsonType === "Circle") {
    target.options.isClicked = !target.options.isClicked;
    if (target.options.isClicked) {
      target.updateSymbol({ polygonFill: "#00FFFF", lineColor: "#00FFFF" });
    }
    if (!target.options.isClicked) {
      target.updateSymbol({ lineColor: "#000000", polygonFill: "#FFFFFF" });
    }
  }
  if (target._jsonType === "LineString") {
    target.options.isClicked = !target.options.isClicked;
    if (target.options.isClicked) {
      target.updateSymbol({ lineColor: "#00FFFF" });
    }
    if (!target.options.isClicked) {
      target.updateSymbol({ lineColor: "#000000" });
    }
  }
  if (target._jsonType === "Polygon") {
    target.options.isClicked = !target.options.isClicked;
    if (target.options.isClicked) {
      target.updateSymbol({ lineColor: "#00FFFF" });
    }
    if (!target.options.isClicked) {
      target.updateSymbol({ lineColor: "#000000" });
    }
  }
  if (target.options.type === "Label") {
    target.startEditText();
    map.off("click", addLabel);
    map.on("dblclick", labelEditEnd);
  }
};
  //用于清除对象被选中的高亮效果
  recoverObj =recoverObj ||function() {
      let num = clickedObj.length;
      target = null;
      for (let i = 0; i < num; i++) {
        if (clickedObj[i]._jsonType === "Circle") {
          clickedObj[i].options.isClicked = false;
          clickedObj[i].updateSymbol({
            lineColor: "#000000",
            polygonFill: "#FFFFFF"
          });
        }
        if (clickedObj[i]._jsonType === "LineString") {
          clickedObj[i].options.isClicked = false;
          clickedObj[i].updateSymbol({ lineColor: "#000000" });
        }
        if (clickedObj[i]._jsonType === "Polygon") {
          clickedObj[i].options.isClicked = false;
          clickedObj[i].updateSymbol({ lineColor: "#000000" });
        }
      }
    };

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

      let objLabel = new maptalks.Label(content, coord, {
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
      objLabel.on("click", function(e) {
        target = e.target;
        objLabel.startEditText();
        drawTool.disable();
      });
      labels.push(objLabel);
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
      state.pointNum++;
      let content = state.pointNum;
      //为界址点添加点号注记
      let label = new maptalks.Label(content, poi, {
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
      label.on("click", function(e) {
        target = e.target;
        drawTool.disable();
        label.startEditText();
      });
      let point = new maptalks.Circle(poi, 0.5, {
        id: state.pointNum,
        labels: label,
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
  //用于画点
  drawPoint =
    drawPoint ||
    function(e) {
      recoverObj();
      state.pointNum++;
      let content = state.pointNum;
      //为界址点添加点号注记
      let label = new maptalks.Label(content, e.coordinate, {
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
      label.on("click", function(e) {
        target = e.target;
        drawTool.disable();
        label.startEditText();
      });
      let point = new maptalks.Circle(e.coordinate, 0.5, {
        id: state.pointNum,
        labels: label,
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
      point.on("click", clickObj);
    };

  //画线时drawTool的绑定事件
  drawLineEnd =
    drawLineEnd ||
    function(param) {
      let coorArr = param.geometry._coordinates;
      //为折线的每条线段添加长度标注
      for (let i = 0; i < coorArr.length - 1; i++) {
        //每条线段的起点和终点坐标
        let startPoi = coorArr[i],
          endPoi = coorArr[i + 1];
        //计算每条线段的长度
        length = map.computeLength(startPoi, endPoi);
        param.geometry.config("length", length);
        let content = param.geometry.options.length.toFixed(2);
        addObjLabel(content, startPoi, endPoi);
      }
      param.geometry.config("labels", labels);
      labels = [];
      param.geometry.config("isClicked", false);

      map.getLayer("line").addGeometry(param.geometry);
      param.geometry.on("click", clickObj);
      recoverObj();
    };
  //用于画线
  drawLine =
    drawLine ||
    function() {
      recoverObj();
      drawTool.setMode("LineString").enable();
      drawTool.setSymbol({ lineColor: "#000000", lineWidth: 1.5 });
      drawTool.on("drawend", drawLineEnd);
    };

  //构面时drawTool的绑定事件
  drawPolygonEnd =
    drawPolygonEnd ||
    function(param) {
      let coorArr = param.geometry._coordinates;
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
      param.geometry.config("labels", labels);
      labels = [];
      param.geometry.config("isClicked", false);
      param.geometry.config("polygonType", "ZD");
      map.getLayer("polygon").addGeometry(param.geometry);
      param.geometry.on("click", clickObj);
      recoverObj();
    };
  //用于构面
  drawPolygon =
    drawPolygon ||
    function() {
      recoverObj();
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
      param.geometry.config("isClicked", false);
      param.geometry.config("polygonType", "YT");
      map.getLayer("polygon").addGeometry(param.geometry);
      param.geometry.on("click", clickObj);
      recoverObj();
    };
  drawBalcony =
    drawBalcony ||
    function() {
      recoverObj();
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
  //添加自定义标注
  addLabel =
    addLabel ||
    function(e) {
      recoverObj();
      let label = new maptalks.Label("label", e.coordinate, {
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
  labelEditEnd =
    labelEditEnd ||
    function() {
      map.on("click", addLabel);
      console.log("label on");
    };

  //用于删除对象
  deleteObj =
    deleteObj ||
    function() {
      if (target._jsonType === "Circle") {
        target.remove();
        let point_labels = target.options.labels;
        point_labels.remove();
      }
      if (target._jsonType === "LineString") {
        target.remove();
        let line_labels = target.options.labels;
        for (let i = 0; i < line_labels.length; i++) {
          line_labels[i].remove();
        }
      }
      if (target._jsonType === "Polygon") {
        target.remove();
        let polygon_labels = target.options.labels;
        for (let i = 0; i < polygon_labels.length; i++) {
          polygon_labels[i].remove();
        }
      }
      if (target.options.type === "Label") {
        target.endEditText();
        target.remove();
      }
      target = null;
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
            case 'handleRealtimeMapping':
                const isRealtimeOn={isRealtimeOn:!state.isRealtimeOn}
                if (isRealtimeOn.isRealtimeOn) {
                    console.log('打开了');
                } else {
                    console.log('没打开');
                }
                return Object.assign({},state,{... isRealtimeOn}); 
            //展点  
            case 'plotRTK':
                    console.log(state)
                    console.log("展点");
                    let plotData=[];
                    plotData = JSON.parse(action.payload.data);
                    console.log(plotData);
                     let poi= new maptalks.Coordinate([plotData[1],plotData[0]]);
                    plot(poi);  
                    const plotSuccessState={
                        pointNum:state.pointNum,
                        plotIsChecked: true,
                        drawPointIsChecked: false,
                        drawLineIsChecked: false,
                        drawPolygonIsChecked:false,
                        balconyIsChecked:false,
                        addLabelIsChecked:false,
                        deleteIsChecked:false,
                        chooseObjIsChecked:false,
                        undoIsChecked:false,
                        redoIsChecked:false,
                        saveIsChecked:false,
                        alertSave:true,
                        signatureIsChecked:false,
                    };
                    return {...state,...plotSuccessState};
            case 'plotFail':
                    let error=action.payload;
                    console.log(error)

                    const plotFailState={
                        pointNum:state.pointNum,
                        plotIsChecked: true,
                        alertPlotFail:true,
                        errorMessage:error,
                        drawPointIsChecked: false,
                        drawLineIsChecked: false,
                        drawPolygonIsChecked:false,
                        balconyIsChecked:false,
                        addLabelIsChecked:false,
                        deleteIsChecked:false,
                        chooseObjIsChecked:false,
                        undoIsChecked:false,
                        redoIsChecked:false,
                        saveIsChecked:false,
                        alertSave:true,
                        signatureIsChecked:false,
                    };
                return {...state,...plotFailState};
            //通过文件展点
            case 'plotFile':
            return{...state}


            //关闭错误提示
            case 'plotAlerClose':
                if(state.isRealtimeOn){
                    const closePlotAlert1={alertPlotFail:false}
                    return Object.assign({},state,{... closePlotAlert1}); 
                }else{
                    const closePlotAlert2={alertPlot2:false}
                    return Object.assign({},state,{... closePlotAlert2}); 
                }
            
            //画点
            case 'drawPointClick':
                drawTool.disable();
                snap.disable();
                map.off('dblclick',drawToolOn);
                if(!state.drawPointIsChecked){
                    drawTool.off('drawend', drawPolygonEnd);                      
                    drawTool.off('drawend', drawLineEnd);                     
                    drawTool.off('drawend', drawBalconyEnd);
                    map.off('click',addLabel);
                    map.off('dblclick',labelEditEnd);
                    map.on('click',drawPoint);
                }else{
                    map.off('click',drawPoint)
                }
                const newState1={
                    pointNum:state.pointNum,
                    plotIsChecked:false,
                    drawPointIsChecked:!state.drawPointIsChecked,
                    drawLineIsChecked:false,
                    drawPolygonIsChecked:false,
                    balconyIsChecked:false,
                    addLabelIsChecked:false,
                    chooseObjIsChecked:false,
                    deleteIsChecked:false,
                    undoIsChecked:false,
                    redoIsChecked:false,
                    saveIsChecked:false,
                    alertSave:true,
                    signatureIsChecked:false
                }
                console.log(state)
                return {...state,...newState1};

            //画线
            case 'drawLineClick': 
                if(!state.drawLineIsChecked){
                    map.off('click',drawPoint)
                    drawTool.off('drawend', drawPolygonEnd);
                    drawTool.off('drawend', drawBalconyEnd);
                    map.off('click',addLabel);
                    map.off('dblclick',labelEditEnd);
                    snap.enable();
                    //开始画线                  
                    drawLine(); 
                    map.on('dblclick',drawToolOn);
                }else{
                    drawTool.disable();
                    snap.disable();
                    map.off('dblclick',drawToolOn);
                }
                const newState2={
                    pointNum:state.pointNum,
                    plotIsChecked:false,
                    drawPointIsChecked:false,
                    drawLineIsChecked:!state.drawLineIsChecked,
                    drawPolygonIsChecked:false,
                    balconyIsChecked:false,
                    addLabelIsChecked:false,
                    chooseObjIsChecked:false,
                    deleteIsChecked:false,
                    undoIsChecked:false,
                    redoIsChecked:false,
                    saveIsChecked:false,
                    alertSave:true,
                    signatureIsChecked:false
                } 
                return {...state,...newState2};

            //构面
            case  'drawPolygonClick':
                if(!state.drawPolygonIsChecked){
                    map.off('click',drawPoint)
                    drawTool.off('drawend', drawLineEnd);
                    drawTool.off('drawend', drawBalconyEnd);
                    map.off('click',addLabel);
                    map.off('dblclick',labelEditEnd);
                    snap.enable();
                    //开始构面
                    drawPolygon();
                    map.on('dblclick',drawToolOn);
                }else{
                    drawTool.disable();
                    snap.disable();
                    map.off('dblclick',drawToolOn);
                }
                const newState3={
                    pointNum:state.pointNum,
                    plotIsChecked:false,
                    drawPointIsChecked:false,
                    drawLineIsChecked:false,
                    drawPolygonIsChecked:!state.drawPolygonIsChecked,
                    balconyIsChecked:false,
                    addLabelIsChecked:false,
                    chooseObjIsChecked:false,
                    deleteIsChecked:false,
                    undoIsChecked:false,
                    redoIsChecked:false,
                    saveIsChecked:false,
                    alertSave:true,
                    signatureIsChecked:false
                }
                return {...state,...newState3};   
            //阳台
            case  'balconyClick':
                if(!state.balconyIsChecked){
                    map.off('click',drawPoint)
                    drawTool.off('drawend', drawLineEnd);
                    drawTool.off('drawend', drawPolygonEnd);
                    map.off('click',addLabel);
                    map.off('dblclick',labelEditEnd);
                    snap.enable();
                    //开始构面
                    drawBalcony();
                    map.on('dblclick',drawToolOn);
                }else{
                        drawTool.disable();
                        snap.disable();
                        map.off('dblclick',drawToolOn);
                    }
                const newState4={
                    pointNum:state.pointNum,
                    plotIsChecked:false,
                    drawPointIsChecked:false,
                    drawLineIsChecked:false,
                    drawPolygonIsChecked:false,
                    balconyIsChecked:!state.balconyIsChecked,
                    addLabelIsChecked:false,
                    chooseObjIsChecked:false,
                    deleteIsChecked:false,
                    undoIsChecked:false,
                    redoIsChecked:false,
                    saveIsChecked:false,
                    alertSave:true,
                    signatureIsChecked:false
                }
                return {...state,...newState4};   
            //添加自定义注记
            case 'addLabelClick':
                drawTool.disable();
                snap.disable();
                map.off('click',drawToolOn);
                map.off('click',drawPoint);
                map.off('dblclick',drawToolOn);
                drawTool.off('drawend', drawLineEnd);
                drawTool.off('drawend', drawPolygonEnd);
                drawTool.off('drawend', drawBalconyEnd);
                map.off('dblclick',drawToolOn);
                if(!state.addLabelIsChecked){
                    map.on('click',addLabel);
                }else{
                    map.off('click',addLabel);
                    map.off('dblclick',labelEditEnd);
                }          

                const newState5={
                    pointNum:state.pointNum,
                    plotIsChecked:false,
                    drawPointIsChecked:false,
                    drawLineIsChecked:false,
                    drawPolygonIsChecked:false,
                    balconyIsChecked:false,
                    addLabelIsChecked:!state.addLabelIsChecked,
                    chooseObjIsChecked:false,
                    deleteIsChecked:false,
                    undoIsChecked:false,
                    redoIsChecked:false,
                    saveIsChecked:false,
                    alertSave:true,
                    signatureIsChecked:false
                }
                return {...state,...newState5};   

            //删除
            case 'deleteClick':
                console.log(target);
                drawTool.disable();
                map.off('click',drawToolOn);
                map.off('click',drawPoint);
                map.off('click',addLabel);
                map.off('dblclick',labelEditEnd);
                map.off('dblclick',drawToolOn);
                snap.disable();
                if(target){
                    const newState6={
                        deleteIsChecked:!state.deleteIsChecked, 
                        showDelDialog:true,
                        haveObjToDel:false,                   
                        undoIsChecked:false,
                        redoIsChecked:false,
                        saveIsChecked:false,
                        signatureIsChecked:false,
                        alertSave:true,
                    }
                    return Object.assign({},state,{... newState6});                       
                }else{
                    const stateDelFail={
                        deleteIsChecked:!state.deleteIsChecked, 
                        showDelDialog:false,
                        haveObjToDel:true,                   
                        undoIsChecked:false,
                        redoIsChecked:false,
                        saveIsChecked:false,
                        signatureIsChecked:false,
                        alertSave:true,
                    }
                    return Object.assign({},state,{... stateDelFail});         
                }
            

            case 'handleCloseDelDialog':
                const showDelDialog1 ={showDelDialog:false} 
                return Object.assign({},state,{... showDelDialog1});

            case 'handleDelete':
                 deleteObj();
                const  showDelDialog2 ={showDelDialog:false}
                return Object.assign({},state,{... showDelDialog2});
            case 'delAlerClose':
                const closeAlert={haveObjToDel:false}
                return Object.assign({},state,{... closeAlert});
            //选中
            case 'chooseObjClick':
                console.log('choose')
                drawTool.disable();
                map.off('click',drawToolOn);
                map.off('click',drawPoint);
                map.off('click',addLabel);
                map.off('dblclick',labelEditEnd);
                map.off('dblclick',drawToolOn);
                const newState7={
                    pointNum:state.pointNum,
                    plotIsChecked:false,
                    drawPointIsChecked:false,
                    drawLineIsChecked:false,
                    drawPolygonIsChecked:false,
                    balconyIsChecked:false,
                    addLabelIsChecked:false,
                    chooseObjIsChecked:!state.chooseObjIsChecked,
                    deleteIsChecked:false,
                    undoIsChecked:false,
                    redoIsChecked:false,
                    saveIsChecked:false,
                    signatureIsChecked:false,
                    alertSave:true,
                }
                return Object.assign({},state,{... newState7});   
            //撤销
            case 'undoClick':
                drawUndo();
                return { ...state }
            //重做
            case 'redoClick':
                console.log('重做');
                drawRedo();
                return { ...state }
            //保存
            case 'saveClick':
                console.log('保存');
                console.log(projectData);
                let mapCenter=map.getCenter();
                drawTool.disable();
                map.off('click',drawToolOn);
                map.off('click',drawPoint);
                map.off('click',addLabel);
                map.off('dblclick',labelEditEnd);
                map.off('dblclick',drawToolOn);
                const saveData= {
                    pointNum:state.pointNum,
                    plotIsChecked:false,
                    drawPointIsChecked:false,
                    drawLineIsChecked:false,
                    drawPolygonIsChecked:false,
                    balconyIsChecked:false,
                    addLabelIsChecked:false,
                    chooseObjIsChecked:false,
                    deleteIsChecked:false,
                    undoIsChecked:false,
                    redoIsChecked:false,
                    saveIsChecked:true,
                    signatureIsChecked:false,
                    alertSave:false,
                    mapCenter:mapCenter,
                    jzdJSONData:map.getLayer('point').toJSON(),
                    szJSONData:map.getLayer('line').toJSON(),
                    zdJSONData:map.getLayer('polygon').toJSON(),
                    zjJSONData: map.getLayer('label').toJSON(),
                }
                //将图层数据存储至项目变量中
                console.log(projectData)
                projectData.ProjectItem[0].L.jzdJSONData=JSON.stringify(saveData.jzdJSONData);
                projectData.ProjectItem[0].L.szJSONData=JSON.stringify(saveData.szJSONData);
                projectData.ProjectItem[0].L.zdJSONData=JSON.stringify(saveData.zdJSONData);
                projectData.ProjectItem[0].L.zjJSONData=JSON.stringify(saveData.zjJSONData);
                console.log( projectData.ProjectItem.L);

                return Object.assign({},state,{... saveData});
            case 'saveAlertClose':
                const saveAlertClose ={alertSave:false} 
                return Object.assign({},state,{... saveAlertClose});
            //签章
            case 'signatureClick':
                if(state.saveIsChecked){
                  //将界址点图层数据整理为在表格中显示的数据内容
                  let data=state.jzdJSONData.geometries;
                  let tabelRow;
                  let tableData=[];
                  for(let i=0;i<data.length;i++){
                    tabelRow={
                      id:state.tableRowId,
                      num:data[i].feature.id,
                      coor:data[i].coordinates,
                    }
                    state.tableRowId +=1;
                    tableData.push(tabelRow);
                  }
                  
                  console.log(tableData)

                    const signature={
                      poiTableData:tableData,
                      signatureIsChecked:true,}
                    return Object.assign({},state,{... signature});
                }else{
                    const signatureState2={
                        alertSignature:true,
                        signatureIsChecked:false
                    }
                    return Object.assign({},state,{... signatureState2});
                }
            case 'signatureAlerClose':
                const signatureAlertClose ={alertSignature:false} 
                return Object.assign({},state,{... signatureAlertClose});
            case 'signatureClose':
              const signatureClose ={signatureIsChecked:false} 
              return Object.assign({},state,{... signatureClose});

            //草图专题图切换时初始化数据
            case 'resetSketchState':
                console.log('reset')
                const resetSketchState={
                    plotIsChecked:false,
                    drawPointIsChecked: false,
                    drawLineIsChecked: false,
                    drawPolygonIsChecked:false,
                    balconyIsChecked:false,
                    addLabelIsChecked:false,
                    deleteIsChecked:false,
                    chooseObjIsChecked:false,
                    undoIsChecked:false,
                    redoIsChecked:false,
                    saveIsChecked:false,
                    alertSave:true,
                    showDelDialog:false,
                    haveObjToDel:false,
                }
                return Object.assign({},state,{... resetSketchState});   
           //界址点签章表点击后高亮
            case 'jzdTableClick':
                let poi_num=action.payload.command;
                console.log(poi_num);
                let jzdPoi=map.getLayer("point").getGeometryById(poi_num);
                jzdPoi.updateSymbol({ polygonFill: "#00FFFF", lineColor: "#00FFFF" });
                map.setCenter(jzdPoi.coordinates);

                const jzdTable={
                  signatureIsChecked:false
                }
              return Object.assign({},state,{... jzdTable});
            default:
              return { ...state }
            
        }
    
}
RootReducer.merge(sketchReduce);
/**
* 
* @param {*} state 
* @param {*} ownProps 
*/
const mapStateToProps = (state, ownProps) => {
  const props = ownProps;

  return {
    text: ownProps.ownProps,
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
      if(text==="get_location"){
        console.log(ownProps)
        if(ownProps.isRealtimeOn){
          fetch("http://172.16.102.90:1338/bluetooth/connect/RTK/printnmea")
          .then(response => response.json())
          .then(json => {
            dispatch({
              type: "menuClick",
              payload: {
                command: "get_location_rtk",
                data:json
              }
            });
          }).catch(e => {
            console.log(e)
          });  
        }else{
          dispatch({
            type: "menuClick",
            payload: {
              command: "get_location_html"
            }
          });
        }
      }else{
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
