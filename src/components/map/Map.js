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
                urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',//'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                subdomains: ['a', 'b', 'c', 'd', 'e']
            }),
            layers: [
                new maptalks.VectorLayer('point'),
                new maptalks.VectorLayer('line'),
                new maptalks.VectorLayer('polygon')
            ]
        });
        map.setZoom(20);
        //将画图工具添加至地图
        drawTool = new maptalks.DrawTool({
            mode: 'Polygon',
            symbol : {
                'lineColor' : '#000',
                'lineWidth' : 5
            }
          }).addTo(map).disable();
           //为界址点图层添加snapto工具
           snap=new SnapTool({
                tolerance: 5,
                mode : 'point'
            });
            snap.addTo(map);
            snap.setLayer( map.getLayer("point"));
            
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
        const circle = new maptalks.Circle(center, 20, {
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
        linetIsChecked: true,
        polygonIsChecked: true
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
        const linetIsChecked = {
            linetIsChecked: !state.linetIsChecked
        }
        if (linetIsChecked.linetIsChecked) {
            map.getLayer("line").show();
        } else {
            map.getLayer("line").hide();
        }
        console.log(linetIsChecked);
        return Object.assign({}, state, { ...linetIsChecked })
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
let target,label,labels=[],length,clickedObj=[],
    addLabel,
    deleteObj,clickObj,recoverObj,
    computeAngle;
let drawPoint,drawToolOn,
     drawLineEnd,drawLine,
     drawPolygonEnd,drawPolygon;

const sketchReduce = (state = { 
    pointNum: 0, 
    drawPointIsChecked: false,
    drawLineIsChecked: false,
    drawPolygonIsChecked:false,
    deleteIsChecked:false,
    undoIsChecked:false,
    redoIsChecked:false,
    saveIsChecked:false,
    showDelDialog:false}, action) => {

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
                drawTool.disable();
                if(target.options.isClicked){
                    target.updateSymbol({ 'lineColor': '#00FFFF'});
                }
                if(!target.options.isClicked){
                    target.updateSymbol({ 'lineColor': '#000000'});
                }
            }
            if(target._jsonType==="Polygon"){
                target.options.isClicked = ! target.options.isClicked;
                drawTool.disable();
                if(target.options.isClicked){
                    target.updateSymbol({'lineColor': '#00FFFF'});  
                }
                if(!target.options.isClicked){
                    target.updateSymbol({  'lineColor': '#000000'});
                }
            }
        }
//用于清除对象被选中的高亮效果
recoverObj = recoverObj ||function(){
    let num = clickedObj.length;
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
	// console.log(angle)

	// if (angle >= 0) 
	// {
	// 		angle = - angle
	// }
	// else
	// {
	// 		angle = - angle
	// }
  return -angle;
}
//用于添加标签
addLabel = addLabel || function(content,startPoi,endPoi,layer){
    let rotation = computeAngle(startPoi,endPoi);
    let coord = new maptalks.Coordinate({ x : (startPoi.x+endPoi.x)/2, y :  (startPoi.y+endPoi.y)/2});
		
		const rotation_rad = rotation / 180 * Math.PI
		const dx = 16 * Math.sin(rotation_rad)
		const dy = -16 * Math.cos(rotation_rad)

		if ((rotation > 90 && rotation < 180) || (rotation > -180 && rotation < -90))
		{
			rotation += 180
		}


		label = new maptalks.Label(content,coord,{
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
    })
    labels.push(label);
    for(let i=0;i<labels.length;i++){
        labels[i].on('click',function(){
            labels[i].startEditText();
            drawTool.disable();
        })
    }
    layer.addGeometry(label);
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
					let point =new maptalks.Circle(e.coordinate, 2,
						{
							'id': state.pointNum, 
							'isClicked':false,         
							'symbol': {
								'lineColor': '#000000',
								'lineWidth': 1,
								'polygonFill': '#FFFFFF',

								'textName': state.pointNum,
								'textFaceName': '宋体',                        
								'textSize': 18,
								'textFill': '#000000',

								'textDy': -14,
								'textAlign': 'auto',
							}
						}
					);
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
                addLabel(content,startPoi,endPoi,map.getLayer('line'));
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
              addLabel(content,startPoi,endPoi,map.getLayer('polygon'));
           }
            param.geometry.config('isClicked',false);
            console.log(param.geometry);
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
//用于删除对象
        deleteObj = deleteObj ||function (){
            target.remove();
            if(target._jsonType==="LineString"){
                let line_labels=target.options.labels;
                for(let i=0;i<line_labels.length;i++){
                    line_labels[i].remove();
                }
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
                map.off('click',drawToolOn);
                if(!state.drawPointIsChecked){
                    if(state.drawPolygonIsChecked){
                        drawTool.off('drawend', drawPolygonEnd);                      
                    };
                    if(state.drawLineIsChecked){
                        drawTool.off('drawend', drawLineEnd);                 
                    }                 
                    map.on('click',drawPoint)
                }else{
                    map.off('click',drawPoint)
                }
                const newState1={
                    pointNum:state.pointNum,
                    drawPointIsChecked:!state.drawPointIsChecked,
                    drawLineIsChecked:false,
                    drawPolygonIsChecked:false,
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
                    //开始画线
                    if(!drawTool.isEnabled()){
                        map.on('click',drawToolOn); 
                    }                     
                    drawLine(); 
                }else{
                    drawTool.disable();
                    map.off('click',drawToolOn); 
                }
                const newState2={
                    pointNum:state.pointNum,
                    drawPointIsChecked:false,
                    drawLineIsChecked:!state.drawLineIsChecked,
                    drawPolygonIsChecked:false,
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
                    //开始构面
                    if(!drawTool.isEnabled()){
                        map.on('click',drawToolOn); 
                    } 
                    drawPolygon();
                }else{
                    drawTool.disable();
                    map.off('click',drawToolOn); 
                }
                const newState3={
                    pointNum:state.pointNum,
                    drawPointIsChecked:false,
                    drawLineIsChecked:false,
                    drawPolygonIsChecked:!state.drawPolygonIsChecked,
                    deleteIsChecked:false,
                    undoIsChecked:false,
                    redoIsChecked:false,
                    saveIsChecked:false
                }
                return {...state,...newState3};   

            //删除
            case 'deleteClick':
                console.log(target);
                if(target){
                    const newState4={
                        deleteIsChecked:!state.deleteIsChecked, 
                        showDelDialog:!state.showDelDialog,                   
                        undoIsChecked:false,
                        redoIsChecked:false,
                        saveIsChecked:false
                    }
                    return Object.assign({},state,{... newState4});                       
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
                
            case 'undoClick':

                return { ...state }

            case 'redoClick':
                console.log('重做');

                return { ...state }

            case 'saveClick':
                console.log('保存');

                return { ...state }

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