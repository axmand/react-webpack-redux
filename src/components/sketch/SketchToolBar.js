import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
//ui
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';

//import icon
import LocationSearching from  'material-ui-icons/LocationSearching';//展点
import Adjust from 'material-ui-icons/Adjust';//画点
import Timeline from 'material-ui-icons/Timeline';//连线
import CheckBoxOutlineBlank from 'material-ui-icons/CheckBoxOutlineBlank';//构面
import Delete from 'material-ui-icons/Delete';//删除
import Undo from 'material-ui-icons/Undo';//撤销
import Refresh from 'material-ui-icons/Refresh';//重做
import Redo from  'material-ui-icons/Redo';
import Save from 'material-ui-icons/Save';//保存
import DragHandle from 'material-ui-icons/DragHandle';

const styleSheet = createStyleSheet(theme=>({
    root:{
         height:'50px',
         width:'540px',
         position:'absolute',
         top:'80px',
         left:'100px',
         background: 'rgba(255, 255, 255, .75)',
         border:'solid 1px 	#606060',
         borderRadius: 8,
         boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.2)'
    },   
    button:{
        flexDirection: 'column',
        justifyContent: 'center ',
        display:'inline-block',
        minheight:'60px',
        minWidth:'60px',
        fontSize:'12px',
        padding:0,
        border:0,
    },

}))
class SkechToolBar1 extends Component{


    render(){
        const classes=this.props.classes;
        const { onDrawPointClick,drawPointIsChecked } = this.props;
        return(
            <Draggable handle="span">
                <div className={classes.root} >
                     <Button className={classes.button} checked={drawPointIsChecked}>
                        <LocationSearching />  
                        <ListItemText primary="展点" />
                    </Button>
                    <Button  className={classes.button} onClick={onDrawPointClick}>
                        <Adjust />
                        <ListItemText primary="画点" />
                    </Button>
                    <Button  className={classes.button} >
                        <Timeline />
                        <ListItemText primary="连线" />
                    </Button>                               
                    <Button  className={classes.button} >
                        <CheckBoxOutlineBlank />
                        <ListItemText primary="构面" />
                    </Button> 
                    <Button  className={classes.button} >
                        <Delete />
                        <ListItemText primary="删除" />
                    </Button>            
                    <Button  className={classes.button} >
                        <Undo />
                        <ListItemText primary="撤销" />
                    </Button>
                    <Button  className={classes.button} >
                        <Redo />
                       
                        <ListItemText primary="重做" />
                    </Button>
                    <Button  className={classes.button} >
                        <Save />
                        <ListItemText primary="保存" />
                    </Button>
                    <span className="cursor">
                        <DragHandle />
                    </span> 
                </div>
            </Draggable>                    
        )
    }
}

SkechToolBar1.PropTypes={
    classes: PropTypes.object.isRequired,
    pointNum: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => {
  const sketchState=state.sketchReduce;
 return {
	    pointNum: sketchState.pointNum
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        //画点
         onDrawPointClick: () => {
            dispatch({
                type: 'drawPointClick',
                payload: {
                    dispatch: dispatch,
                },
            });
        },
        //连线
        onDrawLineClick: () => {
            dispatch({
                type: 'drawLineClick',
                payload: {
                    dispatch: dispatch,
                },                
            });
        },
        //构面
        onDrawPolygonClick: () => {
            dispatch({
                type: 'drawPolygonClick',
                payload: {
                    dispatch: dispatch,
                },
            });
        }        
    }
}

const SkechToolBar=withStyles(styleSheet)(SkechToolBar1);
export default connect(mapStateToProps, mapDispatchToProps)(SkechToolBar);