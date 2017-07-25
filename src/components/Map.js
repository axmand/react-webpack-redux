/**
 * login 登录组件
 * @author yellow date 2017/7/24
 * -由于此组件包含input,button。可以根据需要拆分组件
 * 
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import RootReducer from './../redux/reducers/RootReducer';
import { LOGIN_TODO } from './../redux/actions/ActionTypes';
import PropTypes from 'prop-types';
import * as maptalks from 'maptalks';

class Map extends Component {

    componentDidMount() {

        const mapDiv = this.refs.map;
        const map = new maptalks.Map(mapDiv, {
            center: [-0.113049, 51.498568],
            zoom: 14,
            baseLayer: new maptalks.TileLayer('base', {
                urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                subdomains: ['a', 'b', 'c', 'd', 'e']
            })
        });


    }

    render() {
        return <div ref='map' style={{color : "#000",width:"500px",height:"400px"}} />
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
    if (action.type === LOGIN_TODO) {
        //登录认证操作
    }
    return state;
}

RootReducer.merge(mapReduce);

export default Map;