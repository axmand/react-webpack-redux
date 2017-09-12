/**
 * Map组件
 * @author yellow date 2017/7/24
 * -由于此组件包含input,button。可以根据需要拆分组件
 * 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import RootReducer from './../../redux/RootReducer';
import PropTypes from 'prop-types';
import * as maptalks from 'maptalks';
import { SnapTool } from "maptalks.snapto";

//引入地图组件
import MapToolBar from './MapToolBar';
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
            center: [-0.113049, 51.498568],
            zoom: 14,
            baseLayer: new maptalks.TileLayer('base', {
                urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                subdomains: ['a', 'b', 'c', 'd', 'e']
            }),
            layers: [
                new maptalks.VectorLayer('point'),
                new maptalks.VectorLayer('line'),
                new maptalks.VectorLayer('polygon'),
                new maptalks.VectorLayer('label')
            ]
        });
        map.setZoom(20);
        //将画图工具添加至地图
        drawTool = new maptalks.DrawTool({
            mode: 'Polygon',
            symbol : {
                'lineColor' : '#000',
                'lineWidth' : 3
            }
          }).addTo(map).disable();
           //为界址点图层添加snapto工具
           snap=new SnapTool({
                tolerance: 5,
                mode : 'point'
            });
            snap.addTo(map);
            snap.setLayer( map.getLayer("point"));
            snap.disable();
    }

    render() {

        const { onMenuItemClick } = this.props;

        return (
            <div>
                <div ref='map' style={{ color: "#000", width: '100%', height: `${window.innerHeight}px` }} />
                <MapToolBar onClick={onMenuItemClick} text="zoom_in" />
            </div>
        )
    }

}

/**
 * 限定组件的一些属性
 */
Map.propTypes = {
    onMenuItemClick: PropTypes.func.isRequired
}

//加入reducer(mapReduce)
const mapReduce = (state = 0, action) => {
    //获取当前定位
    if (action.type === "menuClick" && action.payload.command === "get_location") {
        //获取定位,由于无GPS返回固定坐标
        const center = new maptalks.Coordinate(114.360734, 30.541093);
        map.setCenter(center);
        const circle = new maptalks.Circle(center, 5, {
            symbol: {
                lineColor: '#34495e',
                lineWidth: 2,
                polygonFill: '#1bbc9b',
                polygonOpacity: 0.4
            }
        });
        const marker = new maptalks.Marker(
            center, {
                symbol: {
                    'textFaceName': 'sans-serif',
                    'textName': 'your location',
                    'textFill': '#34495e',
                    'textHorizontalAlignment': 'right',
                    'textSize': 25
                }
            }
        );
        //将对象添加至图层
        map.getLayer('point').addGeometry(circle);
        map.getLayer('point').addGeometry(marker);
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
}

RootReducer.merge(mapReduce);

//加入reducer(layerControlReduce)
const layerControlReduce = (
    state = {
        pointIsChecked: true,
        lineIsChecked: true,
        polygonIsChecked: true,
        labelIsChecked:true
    }, action) => {
    //点选point图层控制其显示
    if (action.type === "handlePointIsChecked") {
        const pointIsChecked = {
            pointIsChecked: !state.pointIsChecked
        }
        if (pointIsChecked.pointIsChecked) {
            map.getLayer("point").show();
        } else {
            map.getLayer("point").hide();
        }
        console.log(pointIsChecked);
        return Object.assign({}, state, { ...pointIsChecked })
    }
    //点选line图层控制其显示
    if (action.type === "handleLineIsChecked") {
        const lineIsChecked = {
            lineIsChecked: !state.lineIsChecked
        }
        if (lineIsChecked.lineIsChecked) {
            map.getLayer("line").show();
        } else {
            map.getLayer("line").hide();
        }
        console.log(lineIsChecked);
        return Object.assign({}, state, { ...lineIsChecked })
    }
    //点选polygon图层控制其显示
    if (action.type === "handlePolygonIsChecked") {
        const polygonIsChecked = {
            polygonIsChecked: !state.polygonIsChecked
        }
        if (polygonIsChecked.polygonIsChecked) {
            map.getLayer("polygon").show();
        } else {
            map.getLayer("polygon").hide();
        }
        console.log(polygonIsChecked);
        return Object.assign({}, state, { ...polygonIsChecked })
    }
    //点选注记图层控制其显示
    if (action.type === "handleLabelIsChecked") {
        const labelIsChecked = {
            labelIsChecked: !state.labelIsChecked
        }
        if (labelIsChecked.labelIsChecked) {
            map.getLayer("label").show();
        } else {
            map.getLayer("label").hide();
        }
        console.log(labelIsChecked);
        return Object.assign({}, state, { ...labelIsChecked })
    }
    return { ...state };
}

RootReducer.merge(layerControlReduce);

//加入reducer(realtimeMapping)
const realtimeMappingReduce = (
    state = { realtimeMappingIsChecked: false }, action) => {

    if (action.type === "handleRealtimeMapping") {
        const realtimeMappingIsChecked = {
            realtimeMappingIsChecked: !state.realtimeMappingIsChecked
        }
        if (realtimeMappingIsChecked.realtimeMappingIsChecked) {
            console.log('打开了');
        } else {
            console.log('没打开');
        }
        console.log(realtimeMappingIsChecked);
        return { ...realtimeMappingIsChecked }
    }
    return { ...state };
}

RootReducer.merge(realtimeMappingReduce);

//加入Reducer(sketchReduce)
//初始化相关量
let target,labels=[],length,clickedObj=[],
    addObjLabel,addObjLabelEnd,deleteObj,clickObj,recoverObj,
    computeAngle;
let drawPoint,drawToolOn,
     drawLineEnd,drawLine,
     drawPolygonEnd,drawPolygon,
     drawBalconyEnd,drawBalcony,
     addLabel,labelEditEnd;

const sketchReduce = (state = { 
    pointNum: 0, 
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
    showDelDialog:false,
    JZDLayer:JSON,
    SZLayer:JSON,
    ZDLayer:JSON,
    LabelLayer:JSON,

}, action) => {

//用于获取点线面对象
    clickObj = clickObj ||function(e){
            target=e.target;
            clickedObj.push(target);
            console.log(target);
            if(target._jsonType==="Circle"){
                target.options.isClicked = ! target.options.isClicked;
                if(target.options.isClicked){
                    target.updateSymbol({ 'polygonFill': '#00FFFF','lineColor': '#00FFFF'}); 
                }
                if(!target.options.isClicked){
                    target.updateSymbol({ 'lineColor': '#000000','polygonFill': '#FFFFFF'});
                }
            }
            if(target._jsonType==="LineString"){
                target.options.isClicked = ! target.options.isClicked;
                if(target.options.isClicked){
                    target.updateSymbol({ 'lineColor': '#00FFFF'});
                }
                if(!target.options.isClicked){
                    target.updateSymbol({ 'lineColor': '#000000'});
                }
            }
            if(target._jsonType==="Polygon"){
                target.options.isClicked = ! target.options.isClicked;
                if(target.options.isClicked){
                    target.updateSymbol({'lineColor': '#00FFFF'});  
                }
                if(!target.options.isClicked){
                    target.updateSymbol({  'lineColor': '#000000'});
                }
            }
            if(target._content !== null){
                    target.startEditText();
                    map.off('click',addLabel);
                    map.on('dblclick',labelEditEnd);                    
            }
        }
//用于清除对象被选中的高亮效果
    recoverObj = recoverObj ||function(){
        let num = clickedObj.length;
        target=null;  
        for(let i=0;i<num;i++){
            if(clickedObj[i]._jsonType==="Circle"){ 
                clickedObj[i].options.isClicked = false;
                clickedObj[i].updateSymbol({ 'lineColor': '#000000','polygonFill': '#FFFFFF'});
            }
            if(clickedObj[i]._jsonType==="LineString"){ 
                clickedObj[i].options.isClicked = false;
                clickedObj[i].updateSymbol({'lineColor': '#000000'});
            }
            if(clickedObj[i]._jsonType==="Polygon"){ 
                clickedObj[i].options.isClicked = false;
                clickedObj[i].updateSymbol({'lineColor': '#000000'});
            }
        }
    }

//用于计算标签的角度
    computeAngle = computeAngle || function(a,b){

        const mapProjection = map.getProjection()
        // console.log(mapProjection)

        const aProject = mapProjection.project(a)
        const bProject = mapProjection.project(b)
        // console.log(aProject)
        // console.log(bProject)

        // let angle = Math.atan((aProject.y-bProject.y)/(aProject.x-bProject.x)) * 180 / Math.PI;
        const angle = Math.atan2((bProject.y - aProject.y), (bProject.x - aProject.x)) * 180 / Math.PI;

        return -angle;
    }
//用于添加四至和宗地的线段标注
    addObjLabel = addObjLabel || function(content,startPoi,endPoi){
        let rotation = computeAngle(startPoi,endPoi);
        let coord = new maptalks.Coordinate({ x : (startPoi.x+endPoi.x)/2, y :  (startPoi.y+endPoi.y)/2});
            
            const rotation_rad = rotation / 180 * Math.PI
            const dx = 16 * Math.sin(rotation_rad)
            const dy = -16 * Math.cos(rotation_rad)

            if ((rotation > 90 && rotation < 180) || (rotation > -180 && rotation < -90))
            {
                rotation += 180
            }

            let objLabel = new maptalks.Label(content,coord,{
                'draggable' : true,
                'box': false,
                'symbol': {
                    'textWeight' : 'bold',
                    'textRotation': rotation,
                    'textFaceName' : '宋体',
                    'textFill' : '#34495e',
                    'textSize' : 16.8,
                    'textDx': dx,
                    'textDy': dy,
                    'textHorizontalAlignment': 'middle',
                    'textVerticalAlignment': 'middle',
                    'textAlign': 'center',
                }
            });
        map.getLayer('label').addGeometry(objLabel);
        objLabel.on('click',function(e){
            target=e.target;
            objLabel.startEditText();
            drawTool.disable();
        });
        labels.push(objLabel);    
    }

//打开画图工具
    drawToolOn = drawToolOn ||function(){
        drawTool.enable();
        console.log('on');
    }
//用于画点
        drawPoint = drawPoint ||function(e){
					recoverObj();
                    state.pointNum++;
                     let content = state.pointNum;
                     //为界址点添加点号注记
                    let label = new maptalks.Label(content,e.coordinate,{
                        'draggable' : true,
                        'box': false,
                        'symbol': {
                            'textWeight' : 'bold',
                            'textFaceName' : '宋体',                      
                            'textSize': 18,
                            'textFill': '#000000',
                            'textDy': -14,
                            'textAlign': 'auto',
                        }
                    })
                        label.on('click',function(){
                            drawTool.disable();
                            label.startEditText();
                    });
					let point =new maptalks.Circle(e.coordinate, 0.5,
						{
                            'id': state.pointNum, 
                            'labels':label,
                            'picture':'',
							'isClicked':false,         
							'symbol': {
								'lineColor': '#000000',
								'lineWidth': 1,
								'polygonFill': '#FFFFFF'
							}
						}
                    );
                    map.getLayer('label').addGeometry(label);
					map.getLayer('point').addGeometry(point);
					point.on('click',clickObj)
        }

//画线时drawTool的绑定事件
       drawLineEnd = drawLineEnd || function(param){
           let coorArr=param.geometry._coordinates;
           //为折线的每条线段添加长度标注
           for(let i=0;i<coorArr.length-1;i++){
               //每条线段的起点和终点坐标
               let startPoi=coorArr[i],
                    endPoi=coorArr[i+1];
                //计算每条线段的长度
                length= map.computeLength(startPoi,endPoi);
                param.geometry.config('length',length);
                let content=param.geometry.options.length.toFixed(2);
                addObjLabel(content,startPoi,endPoi);
           }
           param.geometry.config('labels',labels);
           labels=[];
           param.geometry.config('isClicked',false);

           map.getLayer('line').addGeometry(param.geometry);
           param.geometry.on('click',clickObj); 
           recoverObj();    
       }
//用于画线
        drawLine = drawLine || function(){ 
            recoverObj();
            drawTool.setMode('LineString').enable();
            drawTool.setSymbol({ 'lineColor': '#000000','lineWidth': 2});   
            drawTool.on('drawend', drawLineEnd);    
        }

//构面时drawTool的绑定事件
       drawPolygonEnd = drawPolygonEnd ||function(param){
           let coorArr=param.geometry._coordinates;
           let startPoi=[],
                endPoi=[];
           //为地块添加每段边长的注记
           for(let i=0;i<coorArr.length;i++){
               //每条线段的起点和终点坐标
              if(i<coorArr.length-1){
                  startPoi=coorArr[i];
                  endPoi=coorArr[i+1];
              }else{
                  startPoi=coorArr[i];
                  endPoi=coorArr[0];
              }
              length= map.computeLength(startPoi,endPoi);
              let content=length.toFixed(2);
              addObjLabel(content,startPoi,endPoi);
           }
           param.geometry.config('labels',labels);
           labels=[];
           param.geometry.config('isClicked',false);
           param.geometry.config('polygonType','ZD');
           map.getLayer('polygon').addGeometry(param.geometry);
           param.geometry.on('click',clickObj); 
           recoverObj();
       }
//用于构面
        drawPolygon = drawPolygon ||function(){
            recoverObj();
            drawTool.setMode('Polygon').enable();
            drawTool.setSymbol({
                'lineColor' : '#000000',
                'lineWidth' : 3,
                'polygonFill' : '#FFFFFF',
                'polygonOpacity' : 0.6
            });                 
            drawTool.on('drawend', drawPolygonEnd);   
        }
//画阳台时绑定的事件
        drawBalconyEnd = drawBalconyEnd ||function(param){
            param.geometry.config('isClicked',false);
            param.geometry.config('polygonType','YT');
            map.getLayer('polygon').addGeometry(param.geometry);
            param.geometry.on('click',clickObj);
            recoverObj();
        }
        drawBalcony = drawBalcony ||function(){
            recoverObj();
            drawTool.setMode('Polygon').enable();
            drawTool.setSymbol({
                'lineColor' : '#000000',
                'lineWidth' : 3,
                'lineDasharray' : [10, 5, 10, 5],
                'polygonFill' : '#FFFFFF',
                'polygonOpacity' : 0.6
            });                 
            drawTool.on('drawend', drawBalconyEnd);   
        }
//添加自定义标注
        addLabel = addLabel ||function(e){
            recoverObj();
            let label = new maptalks.Label('label',e.coordinate,
            {
                'draggable' : true,
                'box': false,
                'symbol': {
                    'textWeight' : 'bold',
                    'textFaceName' : '宋体',
                    'textFill' : '#34495e',
                    'textSize' : 16.8,
                    'textHorizontalAlignment': 'middle',
                    'textVerticalAlignment': 'middle',
                    'textAlign': 'center',
                }
            });
            map.getLayer('label').addGeometry(label);
            label.on('click',clickObj)
        }
        labelEditEnd= labelEditEnd ||function(){
            map.on('click',addLabel);
            console.log('label on')
        }
     
//用于删除对象
        deleteObj = deleteObj ||function (){
            
            if(target._jsonType==="Circle"){
                target.remove(); 
                let point_labels = target.options.labels;
                point_labels.remove();
            }
            if(target._jsonType==="LineString"){
                target.remove(); 
                let line_labels=target.options.labels;
                for(let i=0;i<line_labels.length;i++){
                    line_labels[i].remove();
                }
            }
            if(target._jsonType==="Polygon"){
                target.remove(); 
                let polygon_labels=target.options.labels;
                for(let i=0;i<polygon_labels.length;i++){
                    polygon_labels[i].remove();
                }                
            }
            if(target._content !== null){
                target.endEditText();
                target.remove(); 
            }
            target=null;          
        }
//撤销
       
//重做



///////
        switch (action.type) {
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
                    drawPointIsChecked:!state.drawPointIsChecked,
                    drawLineIsChecked:false,
                    drawPolygonIsChecked:false,
                    balconyIsChecked:false,
                    addLabelIsChecked:false,
                    chooseObjIsChecked:false,
                    deleteIsChecked:false,
                    undoIsChecked:false,
                    redoIsChecked:false,
                    saveIsChecked:false
                }
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
                    drawPointIsChecked:false,
                    drawLineIsChecked:!state.drawLineIsChecked,
                    drawPolygonIsChecked:false,
                    balconyIsChecked:false,
                    addLabelIsChecked:false,
                    chooseObjIsChecked:false,
                    deleteIsChecked:false,
                    undoIsChecked:false,
                    redoIsChecked:false,
                    saveIsChecked:false
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
                    drawPointIsChecked:false,
                    drawLineIsChecked:false,
                    drawPolygonIsChecked:!state.drawPolygonIsChecked,
                    balconyIsChecked:false,
                    addLabelIsChecked:false,
                    chooseObjIsChecked:false,
                    deleteIsChecked:false,
                    undoIsChecked:false,
                    redoIsChecked:false,
                    saveIsChecked:false
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
                    drawPointIsChecked:false,
                    drawLineIsChecked:false,
                    drawPolygonIsChecked:false,
                    balconyIsChecked:!state.balconyIsChecked,
                    addLabelIsChecked:false,
                    chooseObjIsChecked:false,
                    deleteIsChecked:false,
                    undoIsChecked:false,
                    redoIsChecked:false,
                    saveIsChecked:false
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
                    drawPointIsChecked:false,
                    drawLineIsChecked:false,
                    drawPolygonIsChecked:false,
                    balconyIsChecked:false,
                    addLabelIsChecked:!state.addLabelIsChecked,
                    chooseObjIsChecked:false,
                    deleteIsChecked:false,
                    undoIsChecked:false,
                    redoIsChecked:false,
                    saveIsChecked:false
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
                        showDelDialog:!state.showDelDialog,                   
                        undoIsChecked:false,
                        redoIsChecked:false,
                        saveIsChecked:false
                    }
                    return Object.assign({},state,{... newState6});                       
                }else{
                    alert('未选中对象，无法删除！')
                    return{...state}
                }
            

            case 'handleCloseDelDialog':
                const showDelDialog1 ={showDelDialog: !state.showDelDialog} 
                return Object.assign({},state,{... showDelDialog1});

            case 'handleDelete':
                 deleteObj();
                const  showDelDialog2 ={showDelDialog: !state.showDelDialog}
                return Object.assign({},state,{... showDelDialog2});
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
                    drawPointIsChecked:false,
                    drawLineIsChecked:false,
                    drawPolygonIsChecked:false,
                    balconyIsChecked:false,
                    addLabelIsChecked:false,
                    chooseObjIsChecked:!state.chooseObjIsChecked,
                    deleteIsChecked:false,
                    undoIsChecked:false,
                    redoIsChecked:false,
                    saveIsChecked:false
                }
                return Object.assign({},state,{... newState7});   
            //撤销
            case 'undoClick':

                return { ...state }
            //重做
            case 'redoClick':
                console.log('重做');

                return { ...state }

            case 'saveClick':
                console.log('保存');
                const saveData= {
                    saveIsChecked:true,
                    JZDLayer:map.getLayer('point').toJSON(),
                    SZLayer:map.getLayer('line').toJSON(),
                    ZDLayer:map.getLayer('poligon').toJSON(),
                    LabelLayer:map.getLayer('label').toJSON(),
                }
                return Object.assign({},state,{... saveData});

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
    }
}
/**
 * 只对顶层view可见
 * @param {*} dispatch 
 * @param {*} ownProps 
 */
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

        onMenuItemClick: (text) => {
            dispatch({
                type: 'menuClick',
                payload: {
                    command: text
                }
            });
        },


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)