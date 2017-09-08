import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//ui
import { withStyles } from 'material-ui/styles';
import Dialog,{ DialogActions, DialogTitle , DialogContent, DialogContentText } from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import Typograghy from 'material-ui/Typography'

//import icon
import Adjust from 'material-ui-icons/Adjust';//点样式
import Timeline from 'material-ui-icons/Timeline';//线样式
import CheckBoxOutlineBlank from 'material-ui-icons/CheckBoxOutlineBlank';//面样式
import Flag from 'material-ui-icons/Flag';//注记样式
import Save from 'material-ui-icons/Save';//保存

const styles={
    root:{
        position:'absolute',
         top:'80%',
         left:'40%',
         alignItem: 'center',
         background: 'rgba(255, 255, 255, .75)',
    },   
    button:{
        display:'inline-block',
        minheight:'80px',
        minWidth:'80px',
        fontSize:'16px',
        padding:0,
        border:0
    },
    dialog:{
        zIndex: '999990'
    }

};
class ThematicToolBar extends Component{
    render(){
        const classes=this.props.classes;
        const { onClick }= this.props;
        const { handleStyle,OnCloseStyleDialog,OnStyleValueClick} = this.props;
        const { pointStyleIsClicked, lineStyleIsClicked,polygonStyleIsClicked, labelStyleIsClicked,}=this.props

        return( 
                <div className={classes.root} >
                    <Button className={classes.button} onClick={()=>onClick("point")}>
                        <Adjust />  
                        <Typograghy>点样式</Typograghy>
                    </Button>
                    <Button  className={classes.button}  onClick={()=>onClick("line")} >
                        <Timeline />
                        <Typograghy>线样式</Typograghy>
                    </Button>
                    <Button  className={classes.button} onClick={()=>onClick("polygon")}>
                        <CheckBoxOutlineBlank />
                        <Typograghy>面样式</Typograghy>
                    </Button>                               
                    <Button  className={classes.button}  onClick={()=>onClick("label")}>
                        <Flag />
                        <Typograghy>注记样式</Typograghy>
                    </Button> 
                    <Button  className={classes.button} >
                        <Save />
                        <Typograghy>保存</Typograghy>
                    </Button>            
                
                    <Dialog
                        open={ pointStyleIsClicked }
                        onRequestClose={ OnCloseStyleDialog }
                        className={classes.dialog}>
                        <DialogTitle>点标记样式</DialogTitle>  
                        <DialogContent>
                            <Button className={classes.pointstyle} onClick={OnStyleValueClick('adjust')}>
                            <Adjust />  
                            </Button>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={ OnCloseStyleDialog } color="default">
                            取消
                            </Button>
                            <Button onClick={ handleStyle } color="primary">
                            确认
                            </Button>
                        </DialogActions>
                    </Dialog>

                </div>
        )
    }
}

ThematicToolBar.PropTypes={
    classes: PropTypes.object.isRequired,
    pointStyleIsClicked:PropTypes.bool.isRequired,
    lineStyleIsClicked:PropTypes.bool.isRequired,
    polygonStyleIsClicked:PropTypes.bool.isRequired,
    labelStyleIsClicked:PropTypes.bool.isRequired,

}

const mapStateToProps = (state) => {
  const thematicMapState=state.thematicMapReduce;

 return {
     pointStyleIsClicked:thematicMapState.pointStyleIsClicked,
     lineStyleIsClicked:thematicMapState.lineStyleIsClicked,
     polygonStyleIsClicked:thematicMapState.polygonStyleIsClicked,
     labelStyleIsClicked:thematicMapState.labelStyleIsClicked,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleStyle:()=>{
            dispatch({
                type: 'handleStyle',
                    })
        },

        OnCloseStyleDialog:()=>{
            dispatch({
                type: 'closeStyleDialog',
            })
        },
        OnStyleValueClick:(value)=>{
            dispatch({
                type: 'styleValueClick',
                payload: value
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles,{name:'ThematicToolBar'})(ThematicToolBar));