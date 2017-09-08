import React, {Component} from 'react';
import { connect } from 'react-redux';
import RootReducer from './../../redux/RootReducer';
import PropTypes from 'prop-types';
//import UI
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
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
    paper: {
        width: '600px',
        height:'800px',
        padding:'20px 100px 0 100px'
      },
    typography:{
        padding:'10px 0 10px 0'
    },
      tablecell:{
        width: '60px',
        height:'10px',
        padding:'0 10px 0 10px',
        border:'solid 1px 	#606060',
      },
      tablebody:{
        border:'solid 1px 	#606060',
      }



}

class ThematicMap extends Component {
    render(){
        const classes = this.props.classes;
        const { onStyleTypeClick } = this.props;
        return(
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Typography type='headline' className={classes.typography}>
                    不动产单元草图
                    </Typography> 
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tablecell}>土地权利人</TableCell>
                                <TableCell className={classes.tablecell}>杨xx</TableCell>
                                <TableCell className={classes.tablecell}>坐落</TableCell>
                                <TableCell className={classes.tablecell}>x，y</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.tablebody}>
                        </TableBody>

                </Table>
            </Paper>
                
                
                {/* <ThematicToolBar onClick={onStyleTypeClick} text="point"/> */}
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