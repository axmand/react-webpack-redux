import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
//ui
import { withStyles } from 'material-ui/styles';
import Dialog,{ DialogActions, DialogContent, DialogContentText } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Typograghy from 'material-ui/Typography'

//import icon
import LocationSearching from  'material-ui-icons/LocationSearching';//展点
import Adjust from 'material-ui-icons/Adjust';//画点
import Timeline from 'material-ui-icons/Timeline';//连线
import CheckBoxOutlineBlank from 'material-ui-icons/CheckBoxOutlineBlank';//构面
import Delete from 'material-ui-icons/Delete';//删除
import Undo from 'material-ui-icons/Undo';//撤销
// import Refresh from 'material-ui-icons/Refresh';//重做
import Redo from  'material-ui-icons/Redo';
import Save from 'material-ui-icons/Save';//保存
import CreateIcon from 'material-ui-icons/Create';//保存
import DragHandle from 'material-ui-icons/DragHandle';

const styles={
    root:{
         height:'50px',
         width:'500px',
         position:'absolute',
         top:'80px',
         left:'100px',
         display: 'flex',
         alignItem: 'center',
         background: 'rgba(255, 255, 255, .75)',
         border:'solid 1px 	#606060',
         borderRadius: 8,
         boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.2)'
    },   
    button:{
        display:'inline-block',
        minheight:'50px',
        minWidth:'50px',
        fontSize:'12px',
        padding:0,
        border:0
    },

};
class SkechToolBar extends Component{
    render(){
        const classes=this.props.classes;
        const { onDrawPointClick, onDrawLineClick,onDrawPolygonClick,onDeleteClick,onUndoClick,onRedoClick,onSaveClick} = this.props;
        const { handleDelete,handleShowDelDialog,showDelDialog,handleCloseDelDialog } = this.props
        const { drawPointIsChecked,drawLineIsChecked,drawPolygonIsChecked,undoIsChecked,redoIsChecked,saveIsChecked, } = this.props;
        return( 
            <Draggable handle="span">
                <div className={classes.root} >
                    <Button className={classes.button}>
                        <LocationSearching />  
                        <Typograghy>展点</Typograghy>
                    </Button>
                    <Button  className={classes.button} style={{backgroundColor: drawPointIsChecked ? '#D1E9E9' : 'transparent'}} onClick={onDrawPointClick} >
                        <Adjust />
                        <Typograghy>画点</Typograghy>
                    </Button>
                    <Button  className={classes.button} style={{backgroundColor: drawLineIsChecked ? '#D1E9E9' : 'transparent'}} onClick={onDrawLineClick}>
                        <Timeline />
                        <Typograghy>连线</Typograghy>
                    </Button>                               
                    <Button  className={classes.button} style={{backgroundColor: drawPolygonIsChecked ? '#D1E9E9' : 'transparent'}} onClick={onDrawPolygonClick}>
                        <CheckBoxOutlineBlank />
                        <Typograghy>构面</Typograghy>
                    </Button> 
                    <Button  className={classes.button} style={{backgroundColor: showDelDialog ? '#D1E9E9' : 'transparent'}} onClick={onDeleteClick}>
                        <Delete />
                        <Typograghy>删除</Typograghy>
                    </Button>            
                    <Button  className={classes.button} style={{backgroundColor: undoIsChecked ? '#D1E9E9' : 'transparent'}} onClick={onUndoClick}>
                        <Undo />
                        <Typograghy>撤销</Typograghy>
                    </Button>
                    <Button  className={classes.button} style={{backgroundColor: redoIsChecked ? '#D1E9E9' : 'transparent'}} onClick={onRedoClick}>
                        <Redo />
                        <Typograghy>重做</Typograghy>
                    </Button>
                    <Button  className={classes.button} style={{backgroundColor: saveIsChecked ? '#D1E9E9' : 'transparent'}} onClick={onSaveClick}>
                        <Save />
                        <Typograghy>保存</Typograghy>
                    </Button>
                    <Button  className={classes.button} style={{backgroundColor: saveIsChecked ? '#D1E9E9' : 'transparent'}} onClick={onSaveClick}>
                        <CreateIcon />
                        <Typograghy>签章</Typograghy>
                    </Button>
										<Button  className={classes.button} style={{backgroundColor: saveIsChecked ? '#D1E9E9' : 'transparent'}}>
											<span className="cursor">
													<DragHandle />
											</span> 
										</Button>
                    <Dialog
                        open={ showDelDialog }
                        onRequestClose={ handleCloseDelDialog }>
                        <DialogContent>
                            <DialogContentText>
                            确认删除？
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={ handleCloseDelDialog } color="default">
                            取消
                            </Button>
                            <Button onClick={ handleDelete } color="primary">
                            确认
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Draggable>
        )
    }
}

SkechToolBar.PropTypes={
    classes: PropTypes.object.isRequired,
    handleDelete:PropTypes.func.isRequired,
    handleCloseDelDialog:PropTypes.func.isRequired,
    handleShowDelDialog:PropTypes.func.isRequired,
    showDelDialog:PropTypes.bool.isRequired,
    drawPointIsChecked:PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
  const sketchState=state.sketchReduce;

 return {
        showDelDialog: sketchState.showDelDialog,
        drawPointIsChecked:sketchState.drawPointIsChecked,
        drawLineIsChecked:sketchState.drawLineIsChecked,
        drawPolygonIsChecked:sketchState.drawPolygonIsChecked,
        undoIsChecked:sketchState.undoIsChecked,
        redoIsChecked:sketchState.redoIsChecked,
        saveIsChecked:sketchState.saveIsChecked
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        //画点
         onDrawPointClick: () => {
            dispatch({
                type: 'drawPointClick',
                payload: dispatch,
            });
        },
        //连线
        onDrawLineClick: () => {
            dispatch({
                type: 'drawLineClick',
                payload:dispatch,                
            });
        },
        //构面
        onDrawPolygonClick: () => {
            dispatch({
                type: 'drawPolygonClick',
                payload:dispatch,
            });
        },
        //删除
        onDeleteClick: () => {
            dispatch({
                type: 'deleteClick',
                payload:dispatch,
            });
        },
        //撤销
        onUndoClick: () => {
            dispatch({
                type: 'undoClick',
                payload:dispatch,
            });
        },        
        //重做
        onRedoClick:()=>{
            dispatch({
                type:'redoClick',
                payload:dispatch,
            });
        },
        //保存
        onSaveClick:()=>{
            dispatch({
                type:'saveClick',
                payload:dispatch,
            });
        },
        
        handleDelete:()=>{
            dispatch({
                type: 'handleDelete',
                    })
        },

        handleCloseDelDialog:()=>{
            dispatch({
                type: 'handleCloseDelDialog',
                    })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles,{name:'SkechToolBar'})(SkechToolBar));