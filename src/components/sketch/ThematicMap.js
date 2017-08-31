import React, {Component} from 'react';
import { connect } from 'react-redux';
import RootReducer from './../../redux/RootReducer';
import PropTypes from 'prop-types';
//import UI
import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input/Input';
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

import ThematicToolBar from './ThematicToolBar'


const styles={
    root:{
        width: '100%', 
        height: `${window.innerHeight}px` ,
        background:'white'
    },
    typography:{
        position:'absolute',
        top:'60px',
        left:'40%',
        background:'#D1E9E9',
        borderRadius: 8,
        padding:'10px 10px 10px',
        width:'20%'
    },
    mapContainer:{
        position:'absolute',
        left:'20%',
        top:'15%',
        height:'60%',
        width:'60%',
        background:'#D1E9E9'     
    }

}

class ThematicMap extends Component {
    render(){
        const classes = this.props.classes;
        const { onStyleTypeClick } = this.props;
        return(
            <div className={classes.root}>
                <Typography type='headline' className={classes.typography}>
                地图标题
                </Typography> 

                <Paper className={classes.mapContainer}>
                    It's a map 
                </Paper>
                
                <ThematicToolBar onClick={onStyleTypeClick} text="point"/>
            </div>
        )
    }
}

ThematicMap.PropTypes={
    classes: PropTypes.func.isRequired,
    onStyleTypeClick: PropTypes.func.isRequired
}

const thematicMapReduce = (state = {
    pointStyle:undefined,
    lineStyle:undefined,
    polygonStyle:undefined,
    labelStyle:undefined,
    pointStyleIsClicked:false,
    lineStyleIsClicked:false,
    polygonStyleIsClicked:false,
    labelStyleIsClicked:false,
},action)=>{
    if(action.type === "styleTypeClick" &&action.payload.command==="point"){
        const isPointStyleClick={
                pointStyleIsClicked:true,
            }            
        return Object.assign({},state,{... isPointStyleClick});
    }
    if(action.type === "styleTypeClick" &&action.payload.command==="line"){
            const isLineStyleClick={
                lineStyleIsClicked:true,
            }
            return Object.assign({},state,{... isLineStyleClick});   
    }
    if(action.type === "styleTypeClick" &&action.payload.command==="polygon"){
            const isPolygonStyleClick={
                polygonStyleIsClicked:true,
            }
            return Object.assign({},state,{... isPolygonStyleClick}); 
    }
    if(action.type === "styleTypeClick" &&action.payload.command==="label"){
            const isLabelStyleClick={
                labelStyleIsClicked:true,
            }
            return Object.assign({},state,{... isLabelStyleClick});     
    }
    if(action.type === "closeStyleDialog"){
        const closeAllStyleDialog={
            pointStyleIsClicked:false,
            lineStyleIsClicked:false,
            polygonStyleIsClicked:false,
            labelStyleIsClicked:false,
        }
        return Object.assign({},state,{... closeAllStyleDialog});    
    }
    if(action.type ==="handleStyle"){
        const closeAllStyleDialog1={
            pointStyleIsClicked:false,
            lineStyleIsClicked:false,
            polygonStyleIsClicked:false,
            labelStyleIsClicked:false,
        }
        return Object.assign({},state,{... closeAllStyleDialog1});   
    }
    if(action.type === "styleValueClick"){
        const newPointStyle={pointStyle:action.payload}
        console.log(newPointStyle);
        return Object.assign({},state,{... newPointStyle});    
    }
        return {...state};
}

RootReducer.merge(thematicMapReduce);

const mapStateToProps = (state, ownProps) => {
    const props = ownProps;

    return {
        text: ownProps.ownProps,
    }
  }
  
  const mapDispatchToProps = (dispatch, ownProps) => {
      return {
           onStyleTypeClick: (text) => {
            dispatch({
                type: 'styleTypeClick',
                payload: {
                    command: text
                }
            });
        },


      }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles,{name:'ThematicMap'})(ThematicMap));