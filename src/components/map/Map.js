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
// import projectData from "./../../redux/RootData";
import appConfig from "../../redux/Config";
import poiData from "./Point";
import lineData from "./Line";
import polygonData from "./Polygon";

//引入地图组件
import MapToolBar from "./MapToolBar";
import { stat } from "fs";
/**
 * @type {maptalks.Map}
 * 全局的地图对象和方法
 */
let map;
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
  tolerance: 40,
  mode: "point"
});
let target,
  clickedObj = [],
  editingLabel,
  linePoiArr = [];
let clickObj, deleteObj, recoverObj, addLabel,editLabel;
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
        target.updateSymbol({
          'textHaloFill' : '#00FFFF',
          'textHaloRadius' : 3
        });
          clickedObj.push(target);  
      }else {
       for(let i=0;i<clickedObj.length;i++){
         if(clickedObj[i].getId() === target.getId()){
           clickedObj.splice(i, 1);
           break;
          }
        }
        target.updateSymbol({
          'textHaloFill' : '#000000',
          'textHaloRadius' : 0});
      }
    }

    if (target.getJSONType() === "ArcCurve") {
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
      if (clickedObj[i].getJSONType() === "ArcCurve") {
        clickedObj[i].config('isClicked',false);
        clickedObj[i].updateSymbol({ lineColor: "#000000" });
      }
      if (clickedObj[i].getJSONType() === "Label") {
        clickedObj[i].config('isClicked',false);
        clickedObj[i].endEditText();
        clickedObj[i].updateSymbol({ 'textHaloFill' : '#000000', 'textHaloRadius' : 0});
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
      'id':labelId, 
      'isClicked':false,     
      'draggable': true,
      'box': false,
      'type': "Label",
      'boxStyle' : {
        'padding' : [12, 8],
        'verticalAlignment' : 'top',
        'horizontalAlignment' : 'right',
        'minWidth' : 48,
        'minHeight' : 24,
        'symbol' : {
          'markerType' : 'square',
          'markerFill' : 'rgb(255,255,255)',
          'markerFillOpacity' : 0,
          'markerLineWidth' : 0,
        }
      },
      'textSymbol': {
        'textFaceName' : '宋体',
        'textFill' : '#000',
        'textSize' : 28,
        'textVerticalAlignment' : 'top'
      }
    });
    map.getLayer("label").addGeometry(label);
    label.on("click", clickObj);
    editingLabel=label;
    label.startEditText();
    recoverObj();
  };

  //编辑标注
  editLabel=
    editLabel||
    function(){
      if(editingLabel){
      console.log(editingLabel)
      editingLabel.endEditText();
      }
   }
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
      if (target.getJSONType() === "ArcCurve") {
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
    const MapData=this.props.MapData;
    //初始化加载地图
    map = new maptalks.Map(mapDiv, {
      center:[108.37, 22.82],
      zoom: 16,
      baseLayer: new maptalks.TileLayer("base", {
        crossOrigin: "anonymous",
        urlTemplate : 'http://t{s}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}',
        subdomains  : ['1','2','3','4','5'],
        attribution : '&copy; <a href="http://www.tianditu.cn/">天地图</a>'
      }),
    });
     //初始化新建所有图层
     let jzd,sz,jzx,zd,zj,DT,location;
     jzd = new maptalks.VectorLayer('point',{geometryEvents:false});
     sz = new maptalks.VectorLayer('SZ',{geometryEvents:false});
     jzx = new maptalks.VectorLayer('JZX',{geometryEvents:false});
     zd = new maptalks.VectorLayer('polygon',{geometryEvents:false});
     zj = new maptalks.VectorLayer('label',{geometryEvents:false});
     location=new maptalks.VectorLayer("location",{geometryEvents:false});
     DT=new maptalks.VectorLayer("DT",{geometryEvents:false}).setStyle({
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
    });
    DT.addTo(map);
    zd.addTo(map);
    sz.addTo(map);
    jzx.addTo(map);
    jzd.addTo(map); 
    zj.addTo(map);  
    location.addTo(map);
    //将画图工具添加至地图
    drawTool.addTo(map).disable();
    maptalks.DrawTool.registerMode("ArcCurve", {
      action: "clickDblclick",
      create: path => new maptalks.ArcCurve(path,{arcDegree:45}),
      update: (path, geometry) => {
        geometry.setCoordinates(path);
      },
      generate: geometry => geometry
    });
    snap.addTo(map);
    snap.setLayer(map.getLayer('DT'));
    //绑定吸附工具到绘图工具
    snap.bindDrawTool(drawTool);
    snap.disable();
  }
  //初始化完成进行项目数据加载
  componentWillReceiveProps(nextProps) {   
    console.log(nextProps) 
    let MapData=nextProps.MapData; 
    let center;
    let jzd,sz,jzx,zd,zj,location,DT;
    //项目切换时清空地图图层数据
    jzd = map.getLayer('point');
    sz = map.getLayer('SZ');
    jzx = map.getLayer('JZX');
    zd = map.getLayer('polygon');
    zj = map.getLayer('label');
    location=map.getLayer('location');
    DT=map.getLayer('DT');
    if(jzd.getGeometries()){
      jzd.clear();
    }
    if(sz.getGeometries()){
      sz.clear();
    }
    if(jzx.getGeometries()){
      jzx.clear();
    }
    if(zd.getGeometries()){
      zd.clear();
    }
    if(zj.getGeometries()){
      zj.clear();
    }
    if(location.getGeometries()){
      location.clear();
    }
    if(DT.getGeometries()){
      DT.clear();
    }
    //添加界址点图层数据
    if(MapData.ProjectItem.L.jzdJSONData){
      console.log(MapData.ProjectItem.L.jzdJSONData);
      let jzd_geos=JSON.parse(MapData.ProjectItem.L.jzdJSONData).geometries;
      //为地图对象添加点击绑定事件
      if(jzd_geos){
        for (let i = 0; i < jzd_geos.length; i++) {
          console.log(jzd_geos[i]);
          let jzd_geo = new maptalks.Circle(jzd_geos[i].coordinates, 3, {
            id: jzd_geos[i].feature.id,
            labels: jzd_geos[i].options.labels,
            picture:  jzd_geos[i].options.picture,
            isClicked: jzd_geos[i].options.isClicked,
            symbol:  jzd_geos[i].symbol
          });
          jzd_geo.on("click", clickObj);
          jzd.addGeometry(jzd_geo);
        }
      }
    }
    //添加四至图层数据
    if(MapData.ProjectItem.L.szJSONData){
          let sz_geos=JSON.parse(MapData.ProjectItem.L.szJSONData).geometries;
          console.log(sz_geos);
          //为地图对象添加点击绑定事件
          if(sz_geos){
            for (let i = 0; i < sz_geos.length; i++) {
              let sz_geo = new maptalks.LineString(sz_geos[i].feature.geometry.coordinates,  {
                id: sz_geos[i].feature.geometry.id,
                isClicked: sz_geos[i].options.isClicked,
                length: sz_geos[i].options.length,
                labels: sz_geos[i].options.labels,
                arrowStyle : null, 
                arrowPlacement : 'vertex-last',
                visible : true,
                editable : true,
                cursor : null,
                draggable : false,
                dragShadow : false, 
                drawOnAxis : null,
                symbol:  sz_geos[i].symbol,
              });
              sz_geo.on("click", clickObj);
              sz.addGeometry(sz_geo);
            }
          }
      }
      //添加界址线图层数据
      if(MapData.ProjectItem.L.jzxJSONData){
        let jzx_geos=JSON.parse(MapData.ProjectItem.L.jzxJSONData).geometries;
        //为地图对象添加点击绑定事件
        if(jzx_geos){
          for (let i = 0; i < jzx_geos.length; i++) {
            let jzx_geo = new maptalks.LineString(jzx_geos[i].feature.geometry.coordinates,  {
              id: jzx_geos[i].feature.geometry.id,
              labels: jzx_geos[i].options.labels,
              length: jzx_geos[i].options.length,
              poiArr: jzx_geos[i].options.linePoiArr,
              isClicked: jzx_geos[i].options.isClicked,
              symbol:  jzx_geos[i].symbol,
              arrowStyle : null, 
              arrowPlacement : 'vertex-last',
              visible : true,
              editable : true,
              cursor : null,
              draggable : false,
              dragShadow : false, 
              drawOnAxis : null,
            });
            jzx_geo.on("click", clickObj);
            jzx.addGeometry(jzx_geo);
          }
        }
    }
    //添加宗地图层数据
    if(MapData.ProjectItem.L.zdJSONData){
      let zd_geos=JSON.parse(MapData.ProjectItem.L.zdJSONData).geometries;
      console.log(zd_geos)
      //为地图对象添加点击绑定事件
      if(zd_geos){
        for (let i = 0; i < zd_geos.length; i++) {
          let zd_geo = new maptalks.Polygon(zd_geos[i].feature.geometr.coordinates,  {
            id: zd_geos[i].feature.geometry.id,
            labels: zd_geos[i].options.labels,
            isClicked: zd_geos[i].options.isClicked,
            polygonType:zd_geos[i].options.polygonType,
            symbol:  zd_geos[i].symbol,
            visible : true,
            editable : true,
            cursor : 'pointer',
            draggable : false,
            drawOnAxis : null, 
          });
          zd_geo.on("click", clickObj);
          zd.addGeometry(zd_geo);
        }
      }
    }
    //添加注记图层数据
    if(MapData.ProjectItem.L.zjJSONData){
      let zj_geos=JSON.parse(MapData.ProjectItem.L.zjJSONData).geometries;
      console.log(zj_geos)
      //为地图对象添加点击绑定事件
      if(zj_geos){
        for (let i = 0; i < zj_geos.length; i++) {
          let zj_geo = new maptalks.Label(zj_geos[i].content,zj_geos[i].feature.geometry.coordinates,  {
            'id': zj_geos[i].feature.geometry.id,
            'draggable': true,
            'type': "Label",
            'isClicked': zj_geos[i].options.isClicked,
            'boxStyle' : {
              'padding' : [12, 8],
              'verticalAlignment' : 'top',
              'horizontalAlignment' : 'right',
              'minWidth' : 48,
              'minHeight' : 24,
              'symbol' : {
                'markerType' : 'square',
                'markerFill' : 'rgb(255,255,255)',
                'markerFillOpacity' : 0,
                'markerLineWidth' : 0
              }
            },
            'textSymbol': {
              'textFaceName' : '宋体',
              'textFill' : '#000',
              'textSize' : 15,
              'textVerticalAlignment' : 'top'
            }
          });
          zj_geo.on("click", clickObj);
          zj.addGeometry(zj_geo);
        }
      }
    }
    //读取并剔除不合格的底图数据
    let poiGeometries,lineGeometries,polygonGeometries
    if(MapData.Project_DT_Point!==null){
      poiGeometries=maptalks.GeoJSON.toGeometry(MapData.Project_DT_Point).filter(geometry=>geometry!==null);
    }
    if(MapData.Project_DT_Line!==null){
      lineGeometries=maptalks.GeoJSON.toGeometry(MapData.Project_DT_Line).filter(geometry=>geometry!==null);
    }
    if(MapData.Project_DT_Polygon!==null){
      polygonGeometries=maptalks.GeoJSON.toGeometry(MapData.Project_DT_Polygon).filter(geometry=>geometry!==null);  
    }
    //设置地图中心点坐标
    if(poiGeometries.length!==0){
      center = poiGeometries[0].getCoordinates();
      map.setCenter(center);
    }
    poiGeometries = polygonGeometries.concat(lineGeometries).concat(poiGeometries);
    if(poiGeometries!==null){
      DT.addGeometry(poiGeometries);
      DT.bringToBack();
    }
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
      let center = new maptalks.Coordinate(coords.longitude, coords.latitude);
      map.setCenter(center);
      let circle = new maptalks.Circle(center, 1, {
        symbol: {
          lineColor: "#000000",
          lineWidth: 1.5,
          polygonFill: "#1bbc9b",
          polygonOpacity: 0.4
        }
      });
      let labelId=Number(Math.random().toString().substr(3,3) + Date.now()).toString(36);
      let label = new maptalks.Label("当前定位", center, {
        'id':labelId,
        'isClicked':false,
        'box': false,
        'type': "Label",
        'boxStyle' : {
          'padding' : [12, 8],
          'verticalAlignment' : 'top',
          'horizontalAlignment' : 'right',
          'minWidth' : 48,
          'minHeight' : 24,
          'symbol' : {
            'textDy':-24,
            'markerType' : 'square',
            'markerFill' : 'rgb(255,255,255)',
            'markerFillOpacity' : 0,
            'markerLineWidth' : 0
          }
        },
        'textSymbol': {
          'textFaceName' : '宋体',
          'textFill' : '#000',
          'textSize' : 15,
          'textVerticalAlignment' : 'top'
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
      'id':'locationlabel',
      'box': false,
      'type': "Label",
      'boxStyle' : {
        'padding' : [12, 8],
        'verticalAlignment' : 'top',
        'horizontalAlignment' : 'right',
        'minWidth' : 48,
        'minHeight' : 24,
        'symbol' : {
          'textDy':-24,
          'markerType' : 'square',
          'markerFill' : 'rgb(255,255,255)',
          'markerFillOpacity' : 0,
          'markerLineWidth' : 0
        }
      },
      'textSymbol': {
        'textFaceName' : '宋体',
        'textFill' : '#000',
        'textSize' : 15,
        'textVerticalAlignment' : 'top'
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
    topographicMapIsChecked:true,
    pointIsChecked: true,
    lineIsChecked: true,
    jzxIsChecked: true,
    polygonIsChecked: true,
    labelIsChecked: true
  },
  action
) => {
  //点选地形图层控制其显示
  if (action.type === "handleTopographicMapIsChecked") {
    const checkedtopographicMap = {
      topographicMapIsChecked: !state.topographicMapIsChecked
    };
    if (state.topographicMapIsChecked) {
      map.getLayer("DT").hide();
    } else {
      map.getLayer("DT").show();
    }
    return Object.assign({}, state, { ...checkedtopographicMap });
  }

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
  rectifyPointEnd,
  rectifyPoint,
  drawToolOn,
  drawPointEnd,
  drawPoint,
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
  drawRedo,
  BindOnDisTool,
  UseDisTool,
  BindOnAreaTool,
  UseAreaTool;


let modifyPointId;

const sketchReduce = (
  state = {
    isRealtimeOn: false,
    drawAlert:false,
    plotIsChecked: false,
    plotRTKIsChecked:false,
    plotFromFile:false,
    drawPointIsChecked: false,
    rectifyPoiIsChecked:false,
    drawLineIsChecked: false,
    drawJZXIsChecked: false,
    drawArcIsChecked: false,
    drawPolygonIsChecked: false,
    balconyIsChecked: false,
    labelIsChecked:false,
    addLabelIsChecked: false,
    editLabelIsChecked:false,
    measureDistanceIsChecked: false,
    measureAreaIsChecked: false,
    deleteIsChecked: false,
    chooseObjIsChecked: false,
    snapIsChecked:false,
    snapJzdIsChecked:false,
    snapDxIsChecked:false,
    undoIsChecked: false,
    redoIsChecked: false,
    saveIsChecked: false,
    alertSave: true,
    alertPlotFail: false,
    errorMessage: "",
    alertSignature: false,
    showDelDialog: false,
    haveObjToDel: false,
    fetchPoiNumIsChecked:false,
    layerData: {
      jzdJSONData: JSON,
      szJSONData: JSON,
      zdJSONData: JSON,
      zjJSONData: JSON,
    },
    poiTableData: [],
    mapCenter: [],
    mapZoom:16,
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
        'id':labelId,
        'isClicked':false,
        'draggable': true,
        'type': "Label",
        'boxStyle' : {
          'padding' : [12, 8],
          'verticalAlignment' : 'top',
          'horizontalAlignment' : 'right',
          'minWidth' : 48,
          'minHeight' : 24,
          'symbol' : {
            'textDy':-10,
            'markerType' : 'square',
            'markerFill' : 'rgb(255,255,255)',
            'markerFillOpacity' : 0,
            'markerLineWidth' : 0
          }
        },
        'textSymbol': {
          'textFaceName' : '宋体',
          'textFill' : '#000',
          'textSize' : 15,
          'textVerticalAlignment' : 'top'
        }
      });
      map.getLayer("label").addGeometry(objLabel);
      objLabel.on("click", clickObj);
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
        'id': jzdnum,
        'isClicked':false,
        'draggable': true,
        'type': "Label",
        'boxStyle' : {
          'padding' : [12, 8],
          'verticalAlignment' : 'top',
          'horizontalAlignment' : 'right',
          'minWidth' : 48,
          'minHeight' : 24,
          'symbol' : {
            'textDy':-24,
            'markerType' : 'square',
            'markerFill' : 'rgb(255,255,255)',
            'markerFillOpacity' : 0,
            'markerLineWidth' : 0
          }
        },
        'textSymbol': {
          'textFaceName' : '宋体',
          'textFill' : '#000',
          'textSize' : 15,
          'textVerticalAlignment' : 'top'
        }
      });
      label.on("click", clickObj);
      let point = new maptalks.Circle(poi, 3, {
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
      point.on("click", clickObj);
      map.getLayer("label").addGeometry(label);
      map.getLayer("point").addGeometry(point);
      map.setCenter(poi);
      console.log(point);
    };

//画点时DrawTool的绑定事件
  drawPointEnd=
    drawPointEnd ||
    function(param){
      recoverObj();
      let coorArr = param.geometry.getCoordinates();
      console.log(coorArr);
      let jzdnum=Number(Math.random().toString().substr(3,3) + Date.now()).toString(36);
      let content = jzdnum;
      //为界址点添加点号注记
      let label = new maptalks.Label(content, coorArr, {
        'id': jzdnum,
        'isClicked':false,
        'draggable': true,
        'type': "Label",
        'boxStyle' : {
          'padding' : [12, 8],
          'verticalAlignment' : 'top',
          'horizontalAlignment' : 'right',
          'minWidth' : 48,
          'minHeight' : 24,
          'symbol' : {
            'textDy':-24,
            'markerType' : 'square',
            'markerFill' : 'rgb(255,255,255)',
            'markerFillOpacity' : 0,
            'markerLineWidth' : 0
          }
        },
        'textSymbol': {
          'textFaceName' : '宋体',
          'textFill' : '#000',
          'textSize' : 15,
          'textVerticalAlignment' : 'top'
        }
      });
      label.on("click", clickObj);
      let point = new maptalks.Circle(coorArr, 3, {
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
      point.on("click", clickObj);
      console.log(point);
      recoverObj();
    }
    drawPoint=
      drawPoint || 
      function(){
        drawTool.setMode("Point").enable();
        drawTool.setSymbol({           
          lineColor: "#000000",
          lineWidth: 1.5,
          polygonFill: "#FFFFFF" });
        drawTool.on("drawend", drawPointEnd);
      }

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
      if(coorArr.length<2){
       // drawTool.disable();
      }else{
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
        //addObjLabel(content, startPoi, endPoi);
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
      }
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
     if(coorArr.length<3){
      //drawTool.disable();
    }else{      
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
       // addObjLabel(content, startPoi, endPoi);
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
      console.log(zd_obj)
    }
    recoverObj();
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
      if(coorArr.length<3){
       // drawTool.disable();
      }else{
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
          //addObjLabel(content, startPoi, endPoi);
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
      }
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
 //测量距离
  BindOnDisTool=
    BindOnDisTool || 
      function(param){
        recoverObj();
        let coorArr = param.geometry.getCoordinates();
        coorArr.pop();//删除由于缓慢双击产生的最后一个坐标
        if(coorArr.length<2){
          //drawTool.disable();
        }else{
          //计算两点间的距离
          for (let i = 0; i < coorArr.length - 1; i++) {
            //每条线段的起点和终点坐标
            let startPoi = coorArr[i],
              endPoi = coorArr[i + 1];
            //计算每条线段的长度
            length = map.computeLength(startPoi, endPoi).toFixed(3);
            addObjLabel(length,startPoi,endPoi);
        }
        //清除点选高亮的点样式
        for(let i=0;i<linePoiArr.length;i++){
          console.log(linePoiArr)
          map.getLayer('point').getGeometryById(linePoiArr[i]).updateSymbol({
            lineColor: "#000000",
            polygonFill: "#FFFFFF"
          });
        }
       linePoiArr = [];
    }
  }
  UseDisTool=
      UseDisTool ||
      function(){
        drawTool.setMode("LineString").enable();
        drawTool.setSymbol({ lineColor: "#000000", lineWidth: 1.5 });
        drawTool.on("drawend",BindOnDisTool);
      }
//测量面积
  BindOnAreaTool=
    BindOnAreaTool || 
    function(param){
      let coorArr = param.geometry.getCoordinates()[0];
      //删除由于缓慢双击产生的最后一个坐标
      coorArr.pop();
      if(coorArr.length<3){
       // drawTool.disable();
      }else{       
        let zd_obj=new maptalks.Polygon(coorArr, {
          visible : true,
          editable : true,
          cursor : 'pointer',
          draggable : false,
          drawOnAxis : null, 
        });
        let Area=map.computeGeometryArea(zd_obj).toFixed(3);
        let x_sum=0,y_sum=0;
        for(let i=0;i<coorArr.length;i++){
          x_sum+=coorArr[i].x;
          y_sum+=coorArr[i].y;
        }
        let avg_x=x_sum/coorArr.length;
        let avg_y=y_sum/coorArr.length;
        let labelId=Number(Math.random().toString().substr(3,3) + Date.now()).toString(36);
        let objLabel = new maptalks.Label(Area, [avg_x,avg_y], {
          'id':labelId,
          'isClicked':false,
          'draggable': true,
          'type': "Label",
          'boxStyle' : {
            'padding' : [12, 8],
            'verticalAlignment' : 'top',
            'horizontalAlignment' : 'right',
            'minWidth' : 48,
            'minHeight' : 24,
            'symbol' : {
              'markerType' : 'square',
              'markerFill' : 'rgb(255,255,255)',
              'markerFillOpacity' : 0,
              'markerLineWidth' : 0
            }
          },
          'textSymbol': {
            'textFaceName' : '宋体',
            'textFill' : '#000',
            'textSize' : 15,
            'textVerticalAlignment' : 'top'
          }
        });
        map.getLayer("label").addGeometry(objLabel);
        objLabel.on("click", clickObj);
    }
    //清除点选高亮的点样式
    for(let i=0;i<linePoiArr.length;i++){
      console.log(linePoiArr)
      map.getLayer('point').getGeometryById(linePoiArr[i]).updateSymbol({
        lineColor: "#000000",
        polygonFill: "#FFFFFF"
      });
    }
    recoverObj();
  }
  UseAreaTool=
    UseAreaTool ||
      function(){
        drawTool.setMode("Polygon").enable();
        drawTool.setSymbol({
          lineColor: "#000000",
          lineWidth: 2,
          polygonFill: "#FFFFFF",
          polygonOpacity: 0.4
        });
      drawTool.on("drawend",BindOnAreaTool);
    }

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
      case "rectifyJzdClick":
        recoverObj();
        console.log(clickedObj);
        drawTool.off("drawend", drawPointEnd);
        drawTool.off("drawend", drawLineEnd);
        drawTool.off("drawend", drawJZXEnd);
        drawTool.off("drawend", drawCurveEnd);
        drawTool.off("drawend", drawPolygonEnd);
        drawTool.off("drawend", drawBalconyEnd);
        drawTool.off("drawend",BindOnDisTool);
        drawTool.off("drawend",BindOnAreaTool);
        map.off("click", addLabel);
        map.off("click", editLabel);

        modifyPointId = action.payload.command;
        //高亮显示选择纠正位置的点
        map.getLayer('point').getGeometryById(modifyPointId).updateSymbol({polygonFill: "#00FFFF", lineColor: "#00FFFF"});
        clickedObj.push(map.getLayer('point').getGeometryById(modifyPointId));
        rectifyPointEnd=function(param){
        console.log("纠正点位");
        recoverObj();
        let coorArr = param.geometry.getCoordinates();
        let num = modifyPointId;          
        let oldPoi = map.getLayer("point").getGeometryById(num);
        let oldLabel = map.getLayer("label").getGeometryById(num);
        let labelContent= num;
        console.log(labelContent);
        //为界址点添加点号注记
        let label = new maptalks.Label(labelContent, coorArr, {
          'id': num,
          'isClicked':false,
          'draggable': true,
          'type': "Label",
          'boxStyle' : {
            'padding' : [12, 8],
            'verticalAlignment' : 'top',
            'horizontalAlignment' : 'right',
            'minWidth' : 48,
            'minHeight' : 24,
            'symbol' : {
              'textDy':-24,
              'markerType' : 'square',
              'markerFill' : 'rgb(255,255,255)',
              'markerFillOpacity' : 0,
              'markerLineWidth' : 0
            }
          },
          'textSymbol': {
            'textFaceName' : '宋体',
            'textFill' : '#000',
            'textSize' : 15,
            'textVerticalAlignment' : 'top'
          }
        });
        label.on("click", clickObj);
        let point = new maptalks.Circle(coorArr, 3, {
          id: num,
          labels: label.getId(),
          picture: oldPoi.options.picture,
          isClicked: true,
          symbol: {
            lineColor: "#00FFFF",
            lineWidth: 1.5,
            polygonFill: "#00FFFF"
          }
        });
        
        oldPoi.remove();
        oldLabel.remove();
        map.getLayer("label").addGeometry(label);
        map.getLayer("point").addGeometry(point);
        point.on("click", clickObj);
        clickedObj.push(map.getLayer('point').getGeometryById(modifyPointId));
      }
      rectifyPoint=
        rectifyPoint || 
        function(){
          drawTool.setMode("Point").enable();
          drawTool.setSymbol({           
            lineColor: "#000000",
            lineWidth: 1.5,
            polygonFill: "#FFFFFF" });
          drawTool.on("drawend", rectifyPointEnd);
        }
        rectifyPoint();
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
      //选择展点方式
      case"choosePlotType":
        const PlotChooseOpen={
          plotIsChecked:!state.plotIsChecked,
          plotRTKIsChecked: false,
          plotFromFile:false,
          drawPointIsChecked: false,
          rectifyPoiIsChecked:false,
          drawLineIsChecked: false,
          drawJZXIsChecked: false,
          drawArcIsChecked: false,
          drawPolygonIsChecked: false,
          balconyIsChecked: false,
          addLabelIsChecked: false,
          measureDistanceIsChecked: false,
          measureAreaIsChecked: false,
          chooseObjIsChecked: false,
          deleteIsChecked: false,
          undoIsChecked: false,
          redoIsChecked: false,
          saveIsChecked: false,
          alertSave: true,
        }
        return Object.assign({}, state, { ...PlotChooseOpen });
      //关闭展点选择列表
      case"plotListClose":
        const PlotListClose={plotIsChecked:false}
        return Object.assign({}, state, { ...PlotListClose });
      //RTK展点
      case "plotRTK":
        console.log("RTK展点");
        recoverObj();      
        map.off("click", editLabel);
        drawTool.disable();
        let plotData = [];
        plotData = JSON.parse(action.payload.data);
        console.log(plotData);
        let poi = new maptalks.Coordinate([plotData[1], plotData[0]]);
        plot(poi);
        const RTKplotSuccessState = {
          plotRTKIsChecked: true,
          plotFromFile:false,
          drawPointIsChecked: false,
          rectifyPoiIsChecked:false,
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
        };
        return { ...state, ...RTKplotSuccessState };
      case "RTKplotFail":
        let error = action.payload;
        console.log(error);
        const plotFailState = {
          plotRTKIsChecked: true,
          alertPlotFail: true,
          errorMessage: error,
          drawPointIsChecked: false,
          rectifyPoiIsChecked:false,
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
        };
        return { ...state, ...plotFailState };
      //通过文件展点
      case"getFileContent":
        let fileDatastr =eval("("+action.payload.content+")");
        let fileDataJson=JSON.parse(fileDatastr); 
        let filedata_mapCenter;
        for(let i=0;i<fileDataJson.length;i++){
          let poi_coor=new maptalks.Coordinate([fileDataJson[i].L,fileDataJson[i].B])
          let poi_name= fileDataJson[i].PointName;
          console.log(poi_name);
          filedata_mapCenter=poi_coor;
        
         //为界址点添加点号注记
         let label = new maptalks.Label(poi_name, poi_coor, {
          'id': poi_name,
          'isClicked':false,
          'draggable': true,
          'type': "Label",
          'boxStyle' : {
            'padding' : [12, 8],
            'verticalAlignment' : 'top',
            'horizontalAlignment' : 'right',
            'minWidth' : 48,
            'minHeight' : 24,
            'symbol' : {
              'textDy':-24,
              'markerType' : 'square',
              'markerFill' : 'rgb(255,255,255)',
              'markerFillOpacity' : 0,
              'markerLineWidth' : 0
            }
          },
          'textSymbol': {
            'textFaceName' : '宋体',
            'textFill' : '#000',
            'textSize' : 15,
            'textVerticalAlignment' : 'top'
          }
        });
        label.on("click", clickObj);
        let point = new maptalks.Circle(poi_coor, 3, {
          id: poi_name,
          labels: label.getId(),
          picture: "",
          isClicked: false,
          symbol: {
            lineColor: "#000000",
            lineWidth: 1.5,
            polygonFill: "#FFFFFF"
          }
        });        
        point.on("click", clickObj);
        map.getLayer("label").addGeometry(label);
        map.getLayer("point").addGeometry(point);
        console.log(point);
        }
        map.setCenter(filedata_mapCenter);

        const FileplotSuccessState = {
          plotRTKIsChecked: false,
          plotFromFile:true,
          drawPointIsChecked: false,
          rectifyPoiIsChecked:false,
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
        };
        return { ...state, ...FileplotSuccessState };
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
      //弹出取号确认框
      case "openFetchPoiNum":
        const FetchPoiNum_Y={fetchPoiNumIsChecked:true}
        return Object.assign({}, state, { ...FetchPoiNum_Y });
      //关闭取号确认框
      case "closeFetchPoiNum":
        const FetchPoiNum_N={fetchPoiNumIsChecked:false}
        return Object.assign({}, state, { ...FetchPoiNum_N });
      //取界址点号
      case "fetchPoi_NumClick":
        let i = action.payload2.id - 1;
        let old_id=action.payload2.id;//旧id
        let new_id=action.payload1.d;
        map.getLayer("point").getGeometryById(old_id).setId(new_id); 
        let oldLabel = map.getLayer("label").getGeometryById(old_id);
        let labelContent=new_id;
        console.log(labelContent)
        //为界址点添加点号注记
        let label = new maptalks.Label(labelContent, oldLabel.getCoordinates(), {
            'id': new_id,
            'isClicked':false,
            'draggable': true,
            'type': "Label",
            'boxStyle' : {
              'padding' : [12, 8],
              'verticalAlignment' : 'top',
              'horizontalAlignment' : 'right',
              'minWidth' : 48,
              'minHeight' : 24,
              'symbol' : {
                'textDy':-24,
                'markerType' : 'square',
                'markerFill' : 'rgb(255,255,255)',
                'markerFillOpacity' : 0,
                'markerLineWidth' : 0
              }
            },
            'textSymbol': {
              'textFaceName' : '宋体',
              'textFill' : '#000',
              'textSize' : 15,
              'textVerticalAlignment' : 'top'
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
        recoverObj();
        drawTool.off("drawend", rectifyPointEnd);
        drawTool.off("drawend", drawLineEnd);
        drawTool.off("drawend", drawJZXEnd);
        drawTool.off("drawend", drawCurveEnd);
        drawTool.off("drawend", drawPolygonEnd);
        drawTool.off("drawend", drawBalconyEnd);
        drawTool.off("drawend",BindOnDisTool);
        drawTool.off("drawend",BindOnAreaTool);
        map.off("click", addLabel);
        map.off("click", editLabel);
        if (!state.drawPointIsChecked) {
          //开始画点
          drawPoint();
        } else {
          drawTool.disable();
        }
        const drawPointState = {
          plotIsChecked: false,
          drawPointIsChecked: !state.drawPointIsChecked,
          rectifyPoiIsChecked:false,
          drawLineIsChecked: false,
          drawJZXIsChecked: false,
          drawArcIsChecked: false,
          drawPolygonIsChecked: false,
          balconyIsChecked: false,
          addLabelIsChecked: false,
          measureDistanceIsChecked: false,
          measureAreaIsChecked: false,
          chooseObjIsChecked: false,
          deleteIsChecked: false,
          undoIsChecked: false,
          redoIsChecked: false,
          saveIsChecked: false,
          alertSave: true,
        };
        return { ...state, ...drawPointState };
      //纠点拍照
      case "rectifyPoiClick":
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
        map.off("dblclick", drawToolOn);
        map.off("click", editLabel);
        map.off("click", addLabel);
        
        const rectifyPoiState = {
          plotIsChecked: false,
          drawPointIsChecked:false,
          plotListData: tableData,
          rectifyPoiIsChecked: !state.rectifyPoiIsChecked,
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
        };
        return { ...state, ...rectifyPoiState };

      //画四至线
      case "drawLineClick":
        recoverObj();
        drawTool.off("drawend", drawPointEnd);
        drawTool.off("drawend", rectifyPointEnd);
        drawTool.off("drawend", drawJZXEnd);
        drawTool.off("drawend", drawCurveEnd);
        drawTool.off("drawend", drawPolygonEnd);
        drawTool.off("drawend", drawBalconyEnd);
        drawTool.off("drawend",BindOnDisTool);
        drawTool.off("drawend",BindOnAreaTool);
        map.off("click", addLabel);
        map.off("click", editLabel);
        if (!state.drawLineIsChecked) {
          //开始画线
          drawLine();
          map.on("dblclick", drawToolOn);
        } else {
          drawTool.disable();
          map.off("dblclick", drawToolOn);
        }
        const newState2 = {
          plotIsChecked: false,
          drawPointIsChecked: false,
          rectifyPoiIsChecked:false,
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
        };
        return { ...state, ...newState2 };
      //画界址线
      case "drawJZXClick":
        recoverObj();
        drawTool.off("drawend", drawPointEnd);
        drawTool.off("drawend", rectifyPointEnd);
        drawTool.off("drawend", drawLineEnd);
        drawTool.off("drawend", drawCurveEnd);
        drawTool.off("drawend", drawPolygonEnd);
        drawTool.off("drawend", drawBalconyEnd);
        drawTool.off("drawend",BindOnDisTool);
        drawTool.off("drawend",BindOnAreaTool);
        map.off("click", addLabel);
        map.off("click", editLabel);
        //画线时drawTool的绑定事件
        drawJZXEnd =
          drawJZXEnd ||
          function(param) {
            recoverObj();
            let coorArr = param.geometry.getCoordinates();
            coorArr.pop();//删除由于缓慢双击产生的最后一个坐标
            if(coorArr.length<2){
             // drawTool.disable();
            }else{
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
                //addObjLabel(content, startPoi, endPoi);
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
            }
          
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
          //开始画线
          drawJZX();
          map.on("dblclick", drawToolOn);
        } else {
          drawTool.disable();
          map.off("dblclick", drawToolOn);
        }
        const JZXState = {
          plotIsChecked: false,
          drawPointIsChecked: false,
          rectifyPoiIsChecked:false,
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
        };
        return { ...state, ...JZXState };
      //画弧线
      case "drawArcClick":
        drawTool.off("drawend", drawPointEnd);
        drawTool.off("drawend", rectifyPointEnd);
        drawTool.off("drawend", drawLineEnd);
        drawTool.off("drawend", drawJZXEnd);
        drawTool.off("drawend", drawPolygonEnd);
        drawTool.off("drawend", drawBalconyEnd);
        drawTool.off("drawend",BindOnDisTool);
        drawTool.off("drawend",BindOnAreaTool);
        map.off("click", addLabel);
        map.off("click", editLabel);
        //画线时drawTool的绑定事件
        drawCurveEnd =
          drawCurveEnd ||
          function(param) {
            let coorArr = param.geometry.getCoordinates();
            coorArr.pop();//删除由于缓慢双击产生的最后一个坐标
            if(coorArr.length<2){
              //drawTool.disable();
            }else{
              //随机数加当前时间构成id
              let jzxnum=Number(Math.random().toString().substr(3,3) + Date.now()).toString(36);
              let jzx_arc = new maptalks.ArcCurve(coorArr, {
                id:jzxnum,
                isClicked:false,
                arcDegree:45,
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
            }     
          };
        //用于画线
        drawCurve =
          drawCurve ||
          function() {
            recoverObj();
            linePoiArr = [];
            drawTool.setMode("ArcCurve").enable();
            drawTool.setSymbol({ lineColor: "#000000", lineWidth: 1.5 });
            drawTool.on("drawend", drawCurveEnd);
          };
        if (!state.drawArcIsChecked) {
          //开始画线
          drawCurve();
          map.on("dblclick", drawToolOn);
        } else {
          drawTool.disable();
          map.off("dblclick", drawToolOn);
        }
        const CurveState = {
          plotIsChecked: false,
          drawPointIsChecked: false,
          rectifyPoiIsChecked:false,
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
        };
        console.log(state);
        return { ...state, ...CurveState };
      //构面
      case "drawPolygonClick":
        drawTool.off("drawend", drawPointEnd);
        drawTool.off("drawend", rectifyPointEnd);    
        drawTool.off("drawend", drawLineEnd);
        drawTool.off("drawend", drawJZXEnd);
        drawTool.off("drawend", drawCurveEnd);
        drawTool.off("drawend", drawBalconyEnd);
        drawTool.off("drawend",BindOnDisTool);
        drawTool.off("drawend",BindOnAreaTool);
        map.off("click", addLabel);
        map.off("click", editLabel);
        if (!state.drawPolygonIsChecked) {
          //开始构面
          drawPolygon();
          map.on("dblclick", drawToolOn);
        } else {
          drawTool.disable();
          map.off("dblclick", drawToolOn);
        }
        const newState3 = {
          plotIsChecked: false,
          drawPointIsChecked: false,
          rectifyPoiIsChecked:false,
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
        };
        return { ...state, ...newState3 };
      //阳台
      case "balconyClick":        
          drawTool.off("drawend", drawPointEnd);
          drawTool.off("drawend", rectifyPointEnd);
          drawTool.off("drawend", drawLineEnd);
          drawTool.off("drawend", drawJZXEnd);
          drawTool.off("drawend", drawCurveEnd);
          drawTool.off("drawend", drawPolygonEnd);
          drawTool.off("drawend",BindOnDisTool);
          drawTool.off("drawend",BindOnAreaTool);
          map.off("click", addLabel);
          map.off("click", editLabel);
        if (!state.balconyIsChecked) {
          //开始构面
          drawBalcony();
          map.on("dblclick", drawToolOn);
        } else {
          drawTool.disable();
          map.off("dblclick", drawToolOn);
        }
        const newState4 = {
          plotIsChecked: false,
          drawPointIsChecked: false,
          rectifyPoiIsChecked:false,
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
        };
        return { ...state, ...newState4 };
      //打开捕捉选择列表
      case "labelClick":
        console.log("kai")
        drawTool.disable();
        map.off("dblclick", drawToolOn);
        const labelOpen={
          labelIsChecked:!state.labelIsChecked,
          plotIsChecked: false,
          drawPointIsChecked: false,
          rectifyPoiIsChecked:false,
          drawLineIsChecked: false,
          drawJZXIsChecked: false,
          drawArcIsChecked: false,
          drawPolygonIsChecked: false,
          balconyIsChecked: false,
          measureDistanceIsChecked: false,
          measureAreaIsChecked: false,
          chooseObjIsChecked: false,
          deleteIsChecked: false,
          undoIsChecked: false,
          redoIsChecked: false,
          saveIsChecked: false,
          alertSave: true,
        }
      return Object.assign({}, state, { ...labelOpen });
      //关闭label下拉列表
      case "labelListClose":
        const labelClose={labelIsChecked:false}
        return Object.assign({}, state, { ...labelClose});
      //添加注记
      case "addLabelClick":
        recoverObj();
        map.off("click", editLabel);
        if (!state.addLabelIsChecked) {
          map.on("click", addLabel);
        } else {
          map.off("click", addLabel);
        }
        const addLabelState = {
          editLabelIsChecked:false,
          addLabelIsChecked: true,
        };
        return { ...state, ...addLabelState };
      //编辑标注
      case "editLabel":
        map.off("click", addLabel);
        editLabel();
        // if (!state.editLabelIsChecked) {
        //   map.on("click", editLabel);
        // } else {
        //   if(editingLabel){
        //     editingLabel.endEditText();
        //   }
        //   map.off("click", editLabel);
        // }
        const editLabelState = {
          addLabelIsChecked: false,
          editLabelIsChecked:true,
        };
        return { ...state, ...editLabelState };
      //测距
      case "measureDistanceClick":        
        drawTool.off("drawend", drawPolygonEnd);
        drawTool.off("drawend", drawLineEnd);
        drawTool.off("drawend", drawJZXEnd);
        drawTool.off("drawend", drawBalconyEnd);
        drawTool.off("drawend", drawCurveEnd);
        drawTool.off("drawend", rectifyPointEnd);  
        drawTool.off("drawend", drawPointEnd);
        map.off("click", addLabel);
        map.off("dblclick", drawToolOn);
        map.off("click", editLabel);
        if (!state.measureDistanceIsChecked) {
          UseDisTool();
          map.on("dblclick", drawToolOn);
        } else {
          drawTool.disable();
          map.off("dblclick", drawToolOn);
        }
        const measureDis = {
          plotIsChecked: false,
          drawPointIsChecked: false,
          rectifyPoiIsChecked:false,
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
        };
        return { ...state, ...measureDis };
      //测面积
      case "measureAreaClick":
        drawTool.off("drawend", drawPolygonEnd);
        drawTool.off("drawend", drawLineEnd);
        drawTool.off("drawend", drawJZXEnd);
        drawTool.off("drawend", drawBalconyEnd);
        drawTool.off("drawend", drawCurveEnd);
        drawTool.off("drawend", drawPointEnd);
        drawTool.off("drawend", rectifyPointEnd);
        map.off("dblclick", drawToolOn);      
        map.off("click", addLabel);
        map.off("click", editLabel);
        if (!state.measureAreaIsChecked) {
          UseAreaTool();
          map.on("dblclick", drawToolOn);
        } else {
          drawTool.disable();
          map.off("dblclick", drawToolOn);
        }
        const measureArea = {
          plotIsChecked: false,
          drawPointIsChecked: false,
          rectifyPoiIsChecked:false,
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
        };
        return { ...state, ...measureArea };
      //删除
      case "deleteClick":
        console.log(target);
        drawTool.disable();
        map.off("click", addLabel);
        map.off("click", editLabel);
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
        map.off("click", addLabel);
        map.off("click", editLabel);
        map.off("dblclick", drawToolOn);
        const newState7 = {
          plotIsChecked: false,
          drawPointIsChecked: false,
          rectifyPoiIsChecked:false,
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
          alertSave: true
        };
        return Object.assign({}, state, { ...newState7 });
      //打开捕捉选择列表
      case "snapClick":
        const snapOpen={snapIsChecked:!state.snapIsChecked}
        return Object.assign({}, state, { ...snapOpen });
      //关闭捕捉列表
      case "snapListClose":
        const snapClose={snapIsChecked:false}
        return Object.assign({}, state, { ...snapClose });
      //选择捕捉图层
      case "snapListClick":
        let layerChoice = action.payload.command;
        console.log(layerChoice);
        console.log(snap);
        if(layerChoice=="point"){
          if(!state.snapJzdIsChecked){ 
            snap.setLayer(map.getLayer('point'));
            snap.enable();
            (console.log('界址点捕捉开启'))
          }else{
            snap.disable();
            console.log('界址点捕捉关闭')
          }
          const snapJzdState={
            snapJzdIsChecked:!state.snapJzdIsChecked,
            snapDxIsChecked:false
          }
          return Object.assign({}, state, { ...snapJzdState });
        }
        if(layerChoice=="DX"){
          if(!state.snapDxIsChecked){ 
            snap.setLayer(map.getLayer('DT'));
            snap.enable();
            (console.log('底图捕捉开启'))
          }else{
            snap.disable();
            console.log('底图捕捉关闭')
          }
          const snapDxState={
            snapJzdIsChecked:false,
            snapDxIsChecked:!state.snapDxIsChecked
          }
          return Object.assign({}, state, { ...snapDxState });
        }
      //撤销
      case "undoClick":
      map.off("click", editLabel);
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
        map.off("click", editLabel);
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
          console.log(state)
          return { ...state };
        } else{
          let mapCenter = map.getCenter();
          drawTool.disable();
          map.off("click", drawToolOn);       
          map.off("click", addLabel);
          map.off("click", editLabel);
          map.off("dblclick", drawToolOn);
          console.log(map.getLayer("point").toJSON())
          const saveData = {
            plotIsChecked: false,
            drawPointIsChecked: false,
            rectifyPoiIsChecked:false,
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
            alertSave: false,
            mapZoom:map.getZoom(),
            mapCenter: mapCenter,
            layerData:{
              jzdJSONData: map.getLayer("point").toJSON(),
              szJSONData: map.getLayer("SZ").toJSON(),
              jzxJSONData: map.getLayer("JZX").toJSON(),
              zdJSONData: map.getLayer("polygon").toJSON(),
              zjJSONData: map.getLayer("label").toJSON()
            }
          }; 
          return Object.assign({}, state, { ...saveData });
        }

      case "saveAlertClose":
        const saveAlertClose = { alertSave: false };
        return Object.assign({}, state, { ...saveAlertClose });
      //签章
      case "signatureAlertOpen":
        const signatureAlert = {
          alertSignature: true,
        };
        return Object.assign({}, state, { ...signatureAlert });

      case "signatureAlerClose":
        const signatureAlertClose = { alertSignature: false };
        return Object.assign({}, state, { ...signatureAlertClose });

      //草图专题图切换时初始化数据
      case "resetSketchState":
        console.log("reset");
        const resetSketchState = {
          plotIsChecked: false,
          drawPointIsChecked: false,
          rectifyPoiIsChecked:false,
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
        //将地图中心设置为当前选中的界址线端点
        map.setCenter(jzxPoi.getCoordinates()[0]);
        return {...state};
      //点击拍照按钮后读取所选的界址点点号并打开摄像头进行拍照
      // case 'jzdXCZJClick':
      //   projectData.PoiId =  action.payload.command;
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
  // console.log(ownProps)
  return {
    text: ownProps.ownProps,
    MapData:ownProps.MapData,
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
