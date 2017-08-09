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
import store from '../../index'

//引入地图组件
import MapToolBar from './MapToolBar';
/**
 * @type {maptalks.Map}
 */
let map;
class Map extends Component {

    componentDidMount() {
        const mapDiv = this.refs.map;
        map = new maptalks.Map(mapDiv, {
            center:[-0.113049,51.498568],
            zoom: 14,
            baseLayer: new maptalks.TileLayer('base', {
                urlTemplate:'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',//'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                subdomains: ['a', 'b', 'c', 'd', 'e']
            }),
             layers : [
                new maptalks.VectorLayer('point'),
                new maptalks.VectorLayer('line'),
                new maptalks.VectorLayer('polygon')
            ]
        });
    }

    render() {

        const { onMenuItemClick } = this.props;

        return (
            <div>
                <div ref='map' style={{ color: "#000", width: "100%", height: `${window.innerHeight-20}px` }} />
                <MapToolBar onClick={onMenuItemClick} text="zoom_in"/>
            </div>
        )
    }

}

/**
 * 限定组件的一些属性
 */
Map.propTypes = {
    //onClick: PropTypes.func.isRequired
}

//加入reducer(mapReduce)
const mapReduce = (state = 0, action) => {
    //获取当前定位
     if (action.type === "menuClick" && action.payload.command==="get_location") {
        //获取定位,由于无GPS返回固定坐标
        const center= new maptalks.Coordinate(114.360734,30.541093);
        map.setCenter (center); 
        const circle = new maptalks.Circle(center, 20, {
            symbol: {
                    lineColor: '#34495e',
                    lineWidth: 2,
                    polygonFill: '#1bbc9b',
                    polygonOpacity: 0.4
                }
             });
        const marker = new maptalks.Marker(
            center,{
                symbol : {
                    'textFaceName' : 'sans-serif',
                    'textName' : 'your location',
                    'textFill' : '#34495e',
                    'textHorizontalAlignment' : 'right',
                    'textSize' :25
                } 
            }
        );
        const line = new maptalks.LineString([
            center.add(-0.018,0.005),
            center.add(0.006,0.005)
        ], {
            symbol: {
            'lineColor' : '#1bbc9b',
            'lineWidth' : 3
            }
      });
        //将对象添加至图层
        map.getLayer('point').addGeometry(circle);
        map.getLayer('polygon').addGeometry(marker);
        map.getLayer('line').addGeometry(line);
    }
    //地图放大
    if (action.type === "menuClick" && action.payload.command==="zoom_in") {
        map.zoomIn();
    }
    //地图缩小
    if (action.type === "menuClick" && action.payload.command==="zoom_out") {
        map.zoomOut();
    }
    return state;
}

RootReducer.merge(mapReduce);

//加入reducer(layerControlReduce)
const layerControlReduce=(
  state= {
    pointIsChecked:true,
    linetIsChecked:true,
    polygonIsChecked:true},action)=>{
        //点选point图层控制其显示
      if(action.type==="handlePointIsChecked"){
          const pointIsChecked = {
              pointIsChecked: !state.pointIsChecked
            }    
            if(pointIsChecked.pointIsChecked){
              map.getLayer("point").show();
            }else{
              map.getLayer("point").hide();
          }
            console.log(pointIsChecked);
            return Object.assign({},state,{... pointIsChecked})
            //return	{... pointIsChecked }
      }
        //点选line图层控制其显示
      if(action.type==="handleLineIsChecked"){
          const linetIsChecked = {
				linetIsChecked: !state.linetIsChecked
            }
            if(linetIsChecked.linetIsChecked){
              map.getLayer("line").show();
            }else{
              map.getLayer("line").hide();
          }
            console.log(linetIsChecked);
            return Object.assign({},state,{... linetIsChecked})
      }
        //点选polygon图层控制其显示
      if(action.type==="handlePolygonIsChecked"){
          const polygonIsChecked = {
              polygonIsChecked: !state.polygonIsChecked
            }
            if(polygonIsChecked.polygonIsChecked){
                map.getLayer("polygon").show();
            }else{
                map.getLayer("polygon").hide();
            }
            console.log(polygonIsChecked);
         return Object.assign({},state,{... polygonIsChecked})   
      }
      return {...state};
}

RootReducer.merge(layerControlReduce);

//加入reducer(realtimeMapping)
const realtimeMappingReduce=(
    state={realtimeMappingIsChecked:false},action)=>{

    if(action.type==="handleRealtimeMapping"){
        const realtimeMappingIsChecked = {
              realtimeMappingIsChecked: !state.realtimeMappingIsChecked
            }    
            if(realtimeMappingIsChecked.realtimeMappingIsChecked){
             console.log('打开了');
            }else{
             console.log('没打开');
          }
            console.log(realtimeMappingIsChecked);
            return	{... realtimeMappingIsChecked }
    }
        return {... state};
}
RootReducer.merge(realtimeMappingReduce);

//加入Reducer(sketchReduce)

const drawPoint = (event) => {
		store.dispatch({
			type: 'DRAW_POINT_ON_MAP_SKETCH',
			payload: {
				event: event,
			}
		})
	}

const sketchReduce=(state = { 
	pointNum: 0,
	drawPointIsChecked: false }, action)=>{
	switch(action.type) {
		case 'drawPointClick':
		const newState1 = {
			drawPointIsChecked: !state.drawPointIsChecked,
		}
		console.log(newState1);
		if(newState1.drawPointIsChecked){
			console.log('bind on drawPoint function ...')
			map.on('click',drawPoint)
		}
		else{
			console.log('bind off drawPoint function ...')
			map.off('click',drawPoint)
		}

		return {...state,...newState1}

		case 'DRAW_POINT_ON_MAP_SKETCH':
			console.log(state);
			const newPointNum = state.pointNum + 1
			const newState2={
				pointNum: newPointNum,
			}
			console.log(newState2);
			const point_coordinate = action.payload.event.coordinate;
			const point = new maptalks.Circle(point_coordinate, 2, {
				symbol: {
					lineColor: '#6666FF',
					lineWidth: 2,
					polygonFill: '#9999FF',
					polygonOpacity: 0.4,
					'textFaceName' : 'sans-serif',
					'textName' : newState2.pointNum,
					'textFill' : '#6666FF',
					'textHorizontalAlignment' : 'right',
					'textSize' :20
				}
			});
			map.getLayer('point').addGeometry(point);
			return {...state,...newState2}
		default:
			return {... state}
	}
}
RootReducer.merge(sketchReduce);
 /**
 * 
 * @param {*} state 
 * @param {*} ownProps 
 */
const mapStateToProps = (state, ownProps) => {

    const props=ownProps;

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