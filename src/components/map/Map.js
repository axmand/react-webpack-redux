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
 */
let map;
class Map extends Component {

    componentDidMount() {
        const mapDiv = this.refs.map;
        map = new maptalks.Map(mapDiv, {
            center:[-0.113049,51.498568],
            zoom: 14,
            baseLayer: new maptalks.TileLayer('base', {
                urlTemplate:'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                subdomains: ['a', 'b', 'c', 'd', 'e']
            }),
             layers : [
                new maptalks.VectorLayer('point'),
                new maptalks.VectorLayer('polygon')
            ]
        });
    }

    render() {

        const { onMenuItemClick } = this.props;

        return (
            <div>
                <div ref='map' style={{ color: "#000", width: "100%", height: "500px" }} />
                <MapToolBar style={{ right: "5px;" }} onClick={onMenuItemClick} text="zoom_in"/>
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

//加入reducer
const mapReduce = (state = 0, action) => {
    //图层管理

    
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
        //将对象添加至图层
        map.getLayer('point').addGeometry(circle);
        map.getLayer('polygon').addGeometry(marker);
    }
    //地图放大
    if (action.type === "menuClick" && action.payload.command==="zoom_in") {
        //放大地图
        map.zoomIn();
    }
    //地图缩小
    if (action.type === "menuClick" && action.payload.command==="zoom_out") {
        //缩小地图
        map.zoomOut();
    }

    
    return state;
}

RootReducer.merge(mapReduce);
//加入reducer
const layerControlReduce=(
  state= {
    anchorEl:undefined,
    menuOpen:false,
    pointIsChecked:false,
    linetIsChecked:false,
    polygonIsChecked:false},action)=>{
      if(action.type==="handlePointIsChecked"){
				console.log(state.pointIsChecked)
				const pointIsChecked = {
					pointIsChecked: !state.pointIsChecked
				}
        return	{... pointIsChecked }
      }
      if(action.type==="handleLineIsChecked"){
				const linetIsChecked = {
					linetIsChecked: !state.linetIsChecked
				}
        return	{... linetIsChecked }
      }
      if(action.type==="handlePolygonIsChecked"){
				const polygonIsChecked = {
					polygonIsChecked: !state.polygonIsChecked
				}
				return	{... polygonIsChecked }       
      }
      return state;
}

RootReducer.merge(layerControlReduce);
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

        onClick: () => {
            dispatch({
                type: 'menuClick2',
                payload: {
                    hhh: 2
                }
            })
        },

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

export default connect(mapStateToProps, mapDispatchToProps)(Map);