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

//引入地图组件
import MapToolBar from './MapToolBar';
/**
 * @type {maptalks.Map}
 * 全局的地图对象和方法
 */
let map;
let drawTool;

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
let drawPoint,drawLine,drawPolygon,deleteObj,
     point,line,polygon,target,
     getPoint,clearPoiArr,getObj,
     clickEventBind;
let lineIsClicked = false,
    PolygonIsClicked = false;

//初始化线面的点集数组
let poiArr=[],
    poiId=[],
    poiCoor=[];
let actionArr=[],
    redoArr=[];

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
//用于连线和构面时获取被选中的点并存放在poiArr数组中
        getPoint=getPoint ||function(e){
            target=e.target;
            poiArr.push(target);
            poiCoor.push(target._coordinates); 
            const id=target._id;
            poiId.push(id);
            target.updateSymbol([{ 'polygonFill': '#00FFFF','lineColor': '#00FFFF'}]); 
        }
//用于清空点集
        clearPoiArr=clearPoiArr || function(){
            //判断点集是否为空
            const obj=map.getLayer('point').getGeometryById(poiId[0])
            if(obj){
                for(var i=0;i<poiId.length;i++){ 
                    map.getLayer('point').getGeometryById(poiId[i]).updateSymbol([{ 'polygonFill': '#0000FF','lineColor': '#0000FF'}]);                     
                }   
            }                
            poiArr=[];
            poiId=[];
            poiCoor=[];
            console.log('cleared array'); 
        }        
//用于获取线面对象
        getObj = getObj ||function(e){
            target=e.target;
            console.log(target);
            if(target.type==='Polygon'){
                PolygonIsClicked=!PolygonIsClicked;
                if(PolygonIsClicked){
                    target.updateSymbol({'lineColor': '#00FFFF'});
                }
                if(!PolygonIsClicked){
                    target.updateSymbol({ 'lineColor': '#FF0000'});
                }
            }
            if(target.type==='LineString'){
                lineIsClicked=!lineIsClicked;
                if(lineIsClicked){
                    target.updateSymbol({ 'lineColor': '#00FFFF'});
                }
                if(!lineIsClicked){
                    target.updateSymbol({ 'lineColor': '#FF0000'});
                }
            }
        }
//用于判断click事件的绑定
       clickEventBind=clickEventBind || function(status){
            if(status==='drawPoint'){
                console.log(status)
                if(!state.drawLineIsChecked){
                    map.off('click',drawLine);
                    map.off('dblclick',clearPoiArr)
                }
                if(!state.drawPolygonIsChecked){
                    map.off('dblclick',drawPolygon)
                }
                if(!state.deleteIsChecked){
                    map.off('click',deleteObj)
                }                                   
            }
            if(status==='drawLine'){
                console.log(status)
                if(!state.drawPointIsChecked){
                    map.off('click',drawPoint)
                }
                if(!state.drawPolygonIsChecked){
                    map.off('dblclick',drawPolygon)
                }  
                if(!state.deleteIsChecked){
                    map.off('click',deleteObj)
                }                                 
            }
            if(status==='drawPolygon'){
                console.log(status)
                if(!state.drawPointIsChecked){
                    map.off('click',drawPoint)
                }
                if(!state.drawLineIsChecked){
                    map.off('click',drawLine)
                    map.off('dblclick',clearPoiArr)
                }
                if(!state.deleteIsChecked){
                    map.off('click',deleteObj)
                }                                 
            }
            if(status==='delete'){
                console.log(status)
                if(!state.drawPointIsChecked){
                    map.off('click',drawPoint)
                }                                                  
            }                                   
        };      

//用于画点
        drawPoint = drawPoint ||function () {
                drawTool.setMode('Circle').enable();
                drawTool.on('drawstart',function(param){                
                    state.pointNum++;
                    drawTool.setSymbol({
                        'lineColor': '#0000FF',
                        'lineWidth': 2,
                        'polygonFill': '#0000FF',
                        'textFaceName': 'sans-serif',
                        'textName': state.pointNum,
                        'textFill': '#FFFFFF',
                        'textHorizontalAlignment': 'right',
                        'textSize': 20});                    
                        console.log(state.pointNum);
                });
                drawTool.on('drawend', function (param) { 
                    param.geometry.setRadius(2);  
                    map.getLayer('point').addGeometry(param.geometry);
                  });
                
            };
//用于画线
        drawLine = drawLine ||function () {
            console.log(poiArr.length);
            if(poiArr.length===2){
                line = new maptalks.ConnectorLine(poiArr[0], poiArr[1], {
                    'showOn' : 'always', 
                    'arrowStyle' : 'classic',
                    'arrowPlacement' : null,
                    'symbol': {
                        'lineColor': '#FF0000',
                        'ineWidth': 2
                    }
                });
                line.on('click',getObj);
                map.getLayer('line').addGeometry(line);   
                actionArr.push(line);                 
            } 
            if(poiArr.length>2){
                const i=poiArr.length-2;
                    line = new maptalks.ConnectorLine(poiArr[i], poiArr[i+1], {
                        showOn : 'always', 
                        arrowStyle : 'classic',
                        arrowPlacement : null,
                        symbol: {
                            lineColor: '#FF0000',
                            lineWidth: 2
                        }
                    });
                    line.on('click',getObj);
                    map.getLayer('line').addGeometry(line); 
                    actionArr.push(line);                                  
            }
           
        };
//用于画地块
        drawPolygon = drawPolygon ||function () {
             console.log(poiCoor.length);
             if(poiCoor.length>=3){
                 polygon = new maptalks.Polygon(poiCoor, {
                    symbol: {
                    'lineColor' : '#FF0000',
                    'lineWidth' : 2,
                    'polygonFill' : '#FFFFFF',
                    'polygonOpacity' : 0.6
                    }
                });
                polygon.on('click',getObj);
                map.getLayer('polygon').addGeometry(polygon);
                actionArr.push(polygon);     
             }else{
                 alert('小于三点无法构面!</br>');
             }
            clearPoiArr();}
//用于删除对象
        deleteObj = deleteObj ||function (){
            target.remove();
            target=null;          
        }
//撤销
       
//重做



///////
        switch (action.type) {
            
            case 'drawPointClick':
                // clickEventBind('drawPoint');
                // clearPoiArr();
                // !state.drawPointIsChecked ? map.on('click', drawPoint):map.off('click',drawPoint);
                drawPoint();
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

            case 'drawLineClick':  
                clickEventBind('drawLine');
                clearPoiArr();
                !state.drawLineIsChecked ? map.on('click', drawLine):map.off('click',drawLine);
                !state.drawLineIsChecked ? map.on('dblclick', clearPoiArr):map.off('dblclick',clearPoiArr);   
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

            case  'drawPolygonClick':
                clickEventBind('drawPolygon');
                clearPoiArr();
                !state.drawPolygonIsChecked ? map.on('dblclick', drawPolygon):map.off('dblclick',drawPolygon);                  
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

            case 'deleteClick':
                console.log(target);
                clickEventBind('delete');
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
                }
            return{...state}

            case 'handleCloseDelDialog':
                const showDelDialog1 ={showDelDialog: !state.showDelDialog} 
                return Object.assign({},state,{... showDelDialog1});

            case 'handleDelete':
                 deleteObj();
                const  showDelDialog2 ={showDelDialog: !state.showDelDialog}
                return Object.assign({},state,{... showDelDialog2});
                
            case 'undoClick':
                console.log('撤销');
                console.log(actionArr[actionArr.length-1]);
                console.log(actionArr.length);
                actionArr[actionArr.length-1].undoEdit();
 

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