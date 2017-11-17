import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Draggable from "react-draggable";
//ui
import { withStyles } from "material-ui/styles";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText
} from "material-ui/Dialog";
import Button from "material-ui/Button";
import List from "material-ui/List"
import Typograghy from "material-ui/Typography";

//import icon
import LocationSearching from "material-ui-icons/LocationSearching"; //展点
import Adjust from "material-ui-icons/Adjust"; //画点
import Timeline from "material-ui-icons/Timeline"; //连线
import BorderStyle from "material-ui-icons/BorderStyle"; //界址线
import CheckBoxOutlineBlank from "material-ui-icons/CheckBoxOutlineBlank"; //构面
import ViewCarousel from "material-ui-icons/ViewCarousel"; //阳台
import Looks from "material-ui-icons/Looks"; //弧线
import PictureInPicture from "material-ui-icons/PictureInPicture"; //中空地块
import BookmarkBorder from "material-ui-icons/BookmarkBorder"; //标注
import Straighten from "material-ui-icons/Straighten"; //测距
import FlipToFront from "material-ui-icons/FlipToFront"; //测面
import NearMe from "material-ui-icons/NearMe"; //选中
import Delete from "material-ui-icons/Delete"; //删除
import Undo from "material-ui-icons/Undo"; //撤销
import Redo from "material-ui-icons/Redo"; //重做
import Save from "material-ui-icons/Save"; //保存
import CreateIcon from "material-ui-icons/Create"; //签章
import DragHandle from "material-ui-icons/DragHandle"; //拖动
import CloseIcon from "material-ui-icons/Close";
import Snackbar from "material-ui/Snackbar";
import SecondDialog from '../obligee/SecondDialog'

import appConfig from "../../redux/Config"

const styles = theme => ({
  root: {
    height: `${window.innerHeight * 0.075}px`,
    width:  `${window.innerHeight * 1.35}px`,
    position: "absolute", 
    top: `${window.innerHeight * 0.1}px`,
    left: "1%",
    display: "flex",
    padding:0,
    background: "rgba(69, 90, 100, .6)",
    borderRadius: 8,
    boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.2)"
  },
  button: {
    display: "inline-block",
    minHeight: "100%",
    minWidth: "5%",
    padding: 0,
    border: 0,
  },
  icon: {
    height: "45%",
    width: "45%",
    color: "#fff"
  },
  text: {
    fontSize: "1em",
    fontFamily:'微软雅黑',
    color: "#fff"
  },
  alert: {
    height:`${window.innerHeight * 0.08}px`,
    display: "flex",
    padding:'0 10px 0 10px'
  }, 
  message:{
     fontSize: "1.5em",
    fontFamily:'微软雅黑',
    color:"#455A64",
    textAlign: "center",
  }, 
});
class SkechToolBar extends Component {
  render() {
    const classes = this.props.classes;
    const {
      onPlotClick,
      onDrawPointClick,
      onDrawLineClick,
      onDrawJZXClick,
      onDrawArcClick,
      onDrawPolygonClick,
      onBalconyClick,
      onaddLabelClick,
      onMeasureDistanceClick,
      onMeasureAreaClick,
      onChooseObjClick,
      onDeleteClick,
      onUndoClick,
      onRedoClick,
      onSaveClick,
      onSignatureClick,
      onDelAlerClose,
      onSignatureAlerClose,
      onJzdTableClick,
    } = this.props;
    const {
      onPlotAlerClose,
      handleDelete,
      showDelDialog,
      handleCloseDelDialog
    } = this.props;
    const {
      alertPlotFail,
      alertSignature,
      drawPointIsChecked,
      drawLineIsChecked,
      drawJZXIsChecked,
      drawArcIsChecked,
      drawPolygonIsChecked,
      balconyIsChecked,
      addLabelIsChecked,
      measureDistanceIsChecked,
      measureAreaIsChecked,
      chooseObjIsChecked,
      haveObjToDel
    } = this.props;
    return (
    <div>
        <Draggable handle="span">
            <List className={classes.root}>
            <Button className={classes.button} onClick={onPlotClick}>
                <LocationSearching className={classes.icon} />
                <Typograghy className={classes.text}>展点</Typograghy>
            </Button>
            <Button
                className={classes.button}
                style={{
                backgroundColor: drawPointIsChecked
                    ? "rgba(69, 90, 100, .8)"
                    : "transparent"
                }}
                onClick={onDrawPointClick}
            >
                <Adjust className={classes.icon} />
                <Typograghy className={classes.text}>画点</Typograghy>
            </Button>
            <Button
                className={classes.button}
                style={{
                backgroundColor: drawLineIsChecked
                    ? "rgba(69, 90, 100, .8)"
                    : "transparent"
                }}
                onClick={onDrawLineClick}
            >
                <Timeline className={classes.icon} />
                <Typograghy className={classes.text}>四至</Typograghy>
            </Button>
            <Button
                className={classes.button}
                style={{
                backgroundColor: drawJZXIsChecked
                    ? "rgba(69, 90, 100, .8)"
                    : "transparent"
                }}
                onClick={onDrawJZXClick}
            >
                <BorderStyle className={classes.icon} />
                <Typograghy className={classes.text}>界址线</Typograghy>
            </Button>
            <Button
                className={classes.button}
                style={{
                backgroundColor: drawArcIsChecked
                    ? "rgba(69, 90, 100, .8)"
                    : "transparent"
                }}
                onClick={onDrawArcClick}
            >
                <Looks className={classes.icon} />
                <Typograghy className={classes.text}>弧线</Typograghy>
            </Button>
            <Button
                className={classes.button}
                style={{
                backgroundColor: drawPolygonIsChecked
                    ? "rgba(69, 90, 100, .8)"
                    : "transparent"
                }}
                onClick={onDrawPolygonClick}
            >
                <CheckBoxOutlineBlank className={classes.icon} />
                <Typograghy className={classes.text}>宗地</Typograghy>
            </Button>
            <Button
                className={classes.button}
                style={{
                backgroundColor: balconyIsChecked
                    ? "rgba(69, 90, 100, .8)"
                    : "transparent"
                }}
                onClick={onBalconyClick}
            >
                <ViewCarousel className={classes.icon} />
                <Typograghy className={classes.text}>阳台</Typograghy>
            </Button>
            <Button
                className={classes.button}
                style={{
                backgroundColor: balconyIsChecked
                    ? "rgba(69, 90, 100, .8)"
                    : "transparent"
                }}
                onClick={onBalconyClick}
            >
                <PictureInPicture className={classes.icon} />
                <Typograghy className={classes.text}>异型地</Typograghy>
            </Button>
            <Button
                className={classes.button}
                style={{
                backgroundColor: addLabelIsChecked
                    ? "rgba(69, 90, 100, .8)"
                    : "transparent"
                }}
                onClick={onaddLabelClick}
            >
                <BookmarkBorder className={classes.icon} />
                <Typograghy className={classes.text}>标注</Typograghy>
            </Button>
            <Button
                className={classes.button}
                style={{
                backgroundColor: measureDistanceIsChecked
                    ? "rgba(69, 90, 100, .8)"
                    : "transparent"
                }}
                onClick={onMeasureDistanceClick}
            >
                <Straighten className={classes.icon} />
                <Typograghy className={classes.text}>测距</Typograghy>
            </Button>
            <Button
                className={classes.button}
                style={{
                backgroundColor: measureAreaIsChecked
                    ? "rgba(69, 90, 100, .8)"
                    : "transparent"
                }}
                onClick={onMeasureAreaClick}
            >
                <FlipToFront className={classes.icon} />
                <Typograghy className={classes.text}>测面</Typograghy>
            </Button>
            <Button
                className={classes.button}
                style={{
                backgroundColor: chooseObjIsChecked
                    ? "rgba(69, 90, 100, .8)"
                    : "transparent"
                }}
                onClick={onChooseObjClick}
            >
                <NearMe className={classes.icon} />
                <Typograghy className={classes.text}>选中</Typograghy>
            </Button>
            <Button className={classes.button} onClick={onDeleteClick}>
                <Delete className={classes.icon} />
                <Typograghy className={classes.text}>删除</Typograghy>
            </Button>
            <Button className={classes.button} onClick={onUndoClick}>
                <Undo className={classes.icon} />
                <Typograghy className={classes.text}>撤销</Typograghy>
            </Button>
            <Button className={classes.button} onClick={onRedoClick}>
                <Redo className={classes.icon} />
                <Typograghy className={classes.text}>重做</Typograghy>
            </Button>
            <Button className={classes.button} onClick={onSaveClick}>
                <Save className={classes.icon} />
                <Typograghy className={classes.text}>保存</Typograghy>
            </Button>

            <Button className={classes.button} onClick={onSignatureClick}>
                <CreateIcon className={classes.icon} />
                <Typograghy className={classes.text}>签章</Typograghy>
            </Button>
            <Button className={classes.button}>
                <span className="cursor">
                <DragHandle className={classes.icon} />
                </span>
            </Button>
            </List>
        </Draggable>

          <SecondDialog />
          
          <Dialog open={showDelDialog} onRequestClose={handleCloseDelDialog}>
            <DialogContent>
              <DialogContentText  style={{color:"#455A64"}}>确认删除？</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelDialog} color="default">
                取消
              </Button>
              <Button onClick={handleDelete} style={{color:"#455A64"}}>
                确认
              </Button>
            </DialogActions>
          </Dialog>


          <Dialog 
            open={haveObjToDel} 
            onRequestClose={onDelAlerClose}>
              <DialogContent className={classes.alert} onClick={onDelAlerClose}>
              <Typograghy className={classes.message}>
                未选中需要删除的对象！                
                </Typograghy>
              </DialogContent>
          </Dialog>

          <Dialog 
            open={alertPlotFail} 
            onRequestClose={onPlotAlerClose}>
              <DialogContent className={classes.alert} onClick={onPlotAlerClose}>
              <Typograghy className={classes.message}>
              请求RTK数据失败！                
              </Typograghy>
              </DialogContent>
          </Dialog>

          <Dialog 
            open={alertSignature} 
            onRequestClose={onSignatureAlerClose}>
              <DialogContent className={classes.alert} onClick={onSignatureAlerClose}>
              <Typograghy className={classes.message}>
              您还未点击保存！                
              </Typograghy>
              </DialogContent>
          </Dialog>
      </div>     
    );
  }
}

SkechToolBar.PropTypes = {
  classes: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleCloseDelDialog: PropTypes.func.isRequired,
  handleShowDelDialog: PropTypes.func.isRequired,
  showDelDialog: PropTypes.bool.isRequired,
  haveObjToDel: PropTypes.bool.isRequired,
  drawPointIsChecked: PropTypes.bool.isRequired,
  drawLineIsChecked: PropTypes.bool.isRequired,
  drawJZXIsChecked: PropTypes.bool.isRequired,
  drawPolygonIsChecked: PropTypes.bool.isRequired,
  balconyIsChecked: PropTypes.bool.isRequired,
  addLabelIsChecked: PropTypes.bool.isRequired,
  chooseObjIsChecked: PropTypes.bool.isRequired,
  alertPlotFail: PropTypes.bool.isRequired,
  alertSignature: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
  const sketchState = state.sketchReduce;

  return {
    showDelDialog: sketchState.showDelDialog,
    haveObjToDel: sketchState.haveObjToDel,
    drawPointIsChecked: sketchState.drawPointIsChecked,
    drawLineIsChecked: sketchState.drawLineIsChecked,
    drawJZXIsChecked:sketchState.drawJZXIsChecked,
    drawArcIsChecked:sketchState.drawArcIsChecked,
    drawPolygonIsChecked: sketchState.drawPolygonIsChecked,
    balconyIsChecked: sketchState.balconyIsChecked,
    addLabelIsChecked: sketchState.addLabelIsChecked,
    measureDistanceIsChecked: sketchState.measureDistanceIsChecked,
    measureAreaIsChecked: sketchState.measureAreaIsChecked,
    chooseObjIsChecked: sketchState.chooseObjIsChecked,
    undoIsChecked: sketchState.undoIsChecked,
    redoIsChecked: sketchState.redoIsChecked,
    saveIsChecked: sketchState.saveIsChecked,
    alertPlotFail: sketchState.alertPlotFail,
    alertSignature:sketchState.alertSignature,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  //console.log(ownProps);
  return {
    //展点
    onPlotClick: () => {
      if (ownProps.isRealtimeOn) {
        console.log("fetching ...");
        fetch(appConfig.fileServiceRootPath + "/bluetooth/connect/RTK/printnmea")
          .then(response => response.json())
          .then(json => {
            dispatch({
              type: "plotRTK",
              payload: json
            });
            console.log(json);
          })
          .catch(e => {
              
              dispatch({
                  type:"plotFail",
                  payload:e
              })
              console.log(e)
          });
      } else {
        console.log("importing ...");
        dispatch({
            type:'plotFile'
        })
      }
    },
    //画点
    onDrawPointClick: () => {
      dispatch({
        type: "drawPointClick",
        payload: dispatch
      });
    },
    //连线
    onDrawLineClick: () => {
      dispatch({
        type: "drawLineClick",
        payload: dispatch
      });
    },
    //连线
    onDrawJZXClick: () => {
      dispatch({
        type: "drawJZXClick",
        payload: dispatch
      });
    },
    //画弧线
    onDrawArcClick:()=>{
      dispatch({
        type:"drawArcClick",
        payload:dispatch
      })

    },
    //构面
    onDrawPolygonClick: () => {
      dispatch({
        type: "drawPolygonClick",
        payload: dispatch
      });
    },
    //画阳台
    onBalconyClick: () => {
      dispatch({
        type: "balconyClick",
        payload: dispatch
      });
    },
    //  添加标注
    onaddLabelClick: () => {
      dispatch({
        type: "addLabelClick",
        payload: dispatch
      });
    },
    //测距
    onMeasureDistanceClick:()=>{
      dispatch({
        type:"measureDistanceClick"
      })
    },
    //测面积
    onMeasureAreaClick:()=>{
      dispatch({
        type:"measureAreaClick"
      })
    },
    //选中对象
    onChooseObjClick: () => {
      dispatch({
        type: "chooseObjClick",
        payload: dispatch
      });
    },
    //删除
    onDeleteClick: () => {
      dispatch({
        type: "deleteClick",
        payload: dispatch
      });
    },

    //撤销
    onUndoClick: () => {
      dispatch({
        type: "undoClick",
        payload: dispatch
      });
    },
    //重做
    onRedoClick: () => {
      dispatch({
        type: "redoClick",
        payload: dispatch
      });
    },
    //保存
    onSaveClick: () => {
      dispatch({
        type: "saveClick",
        payload: dispatch
      });
    },
    //签章
    onSignatureClick:()=>{
      ownProps.saveIsChecked ?         
        dispatch({
          type: "choose",
          payload: {
            choice: 3
          }
        }) :
        dispatch({
          type:'signatureClick',
          payload: dispatch
      }) ;
    },
    
    handleDelete:()=>{
        dispatch({
            type: 'handleDelete',
        })
    },

    handleCloseDelDialog: () => {
      dispatch({
        type: "handleCloseDelDialog"
      });
    },
    onDelAlerClose: () => {
      dispatch({
        type: "delAlerClose"
      });
    },
    onPlotAlerClose: () => {
      dispatch({
        type: "plotAlerClose"
      });
    },
    onSignatureAlerClose:()=>{
        dispatch({
            type:"signatureAlerClose"
        })
    },

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles, { name: "SkechToolBar" })(SkechToolBar)
);
