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
import CheckBoxOutlineBlank from "material-ui-icons/CheckBoxOutlineBlank"; //构面
import ViewCarousel from "material-ui-icons/ViewCarousel"; //阳台
import BookmarkBorder from "material-ui-icons/BookmarkBorder"; //标注
import NearMe from "material-ui-icons/NearMe"; //选中
import Delete from "material-ui-icons/Delete"; //删除
import Undo from "material-ui-icons/Undo"; //撤销
import Redo from "material-ui-icons/Redo"; //重做
import Save from "material-ui-icons/Save"; //保存
import CreateIcon from "material-ui-icons/Create"; //签章
import DragHandle from "material-ui-icons/DragHandle"; //拖动
import CloseIcon from "material-ui-icons/Close";
import Snackbar from "material-ui/Snackbar";
import SignatureList from "./SignatureList"

const styles = theme => ({
  root: {
    height: "100%",
    width: "75%",
    position: "absolute",
    top: `${window.innerHeight * 0.1}px`,
    left: "10%",
    display: "flex",
   padding:0,
    background: "rgba(0, 0, 0, .6)",
    borderRadius: 8,
    boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.2)"
  },
  button: {
    display: "inline-block",
    minHeight: "6.25%",
    minWidth: "4.17%",
    padding: 0,
    border: 0,
  },
  icon: {
    height: "45%",
    width: "45%",
    color: "#b3b3b3"
  },
  text: {
    fontSize: "1em",
    color: "#b3b3b3"
  },

  alert: {
    position: "absolute",
    top: `${window.innerHeight * 0.4}px`
  },
  close: {
    background: "rgba(0, 0, 0, .6)",
    color: "black",
    borderRadius: "3%",
    width: "50%",
    height: `${window.innerHeight * 0.08}px`,
    padding: 0
  },
  message: {
    fontSize: "1.5em",
    color: "#fff",
    textAlign: "center",
    padding: 0
  }
});
class SkechToolBar extends Component {
  render() {
    const classes = this.props.classes;
    const {
      onPlotClick,
      onDrawPointClick,
      onDrawLineClick,
      onDrawPolygonClick,
      onBalconyClick,
      onaddLabelClick,
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
      drawPolygonIsChecked,
      balconyIsChecked,
      addLabelIsChecked,
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
                    ? "rgba(0, 0, 0, .8)"
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
                    ? "rgba(0, 0, 0, .8)"
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
                backgroundColor: drawPolygonIsChecked
                    ? "rgba(0, 0, 0, .8)"
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
                    ? "rgba(0, 0, 0, .8)"
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
                backgroundColor: addLabelIsChecked
                    ? "rgba(0, 0, 0, .8)"
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
                backgroundColor: chooseObjIsChecked
                    ? "rgba(0, 0, 0, .8)"
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

          <SignatureList />
          
          <Dialog open={showDelDialog} onRequestClose={handleCloseDelDialog}>
            <DialogContent>
              <DialogContentText>确认删除？</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelDialog} color="default">
                取消
              </Button>
              <Button onClick={handleDelete} color="primary">
                确认
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            open={haveObjToDel}
            onRequestClose={onDelAlerClose}
            className={classes.alert}
          >
            <Button className={classes.close} onClick={onDelAlerClose}>
              <Typograghy className={classes.message}>未选中需要删除的对象！</Typograghy>
              <CloseIcon style={{ color: "rgba(255, 255, 255, .8)" }} />
            </Button>
          </Snackbar>

          <Snackbar
            open={alertPlotFail}
            onRequestClose={onPlotAlerClose}
            className={classes.alert}
          >
            <Button className={classes.close} onClick={onPlotAlerClose}>
              <Typograghy className={classes.message}>请求RTK数据失败！</Typograghy>
              <CloseIcon style={{ color: "rgba(255, 255, 255, .8)" }} />
            </Button>
          </Snackbar>


          <Snackbar
            open={alertSignature}
            onRequestClose={onPlotAlerClose}
            className={classes.alert}
          >
            <Button className={classes.close} onClick={onSignatureAlerClose}>
              <Typograghy className={classes.message}>您还未点击保存！</Typograghy>
              <CloseIcon style={{ color: "rgba(255, 255, 255, .8)" }} />
            </Button>
          </Snackbar>
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
    drawPolygonIsChecked: sketchState.drawPolygonIsChecked,
    balconyIsChecked: sketchState.balconyIsChecked,
    addLabelIsChecked: sketchState.addLabelIsChecked,
    chooseObjIsChecked: sketchState.chooseObjIsChecked,
    undoIsChecked: sketchState.undoIsChecked,
    redoIsChecked: sketchState.redoIsChecked,
    saveIsChecked: sketchState.saveIsChecked,
    alertPlotFail: sketchState.alertPlotFail,
    alertSignature:sketchState.alertSignature,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(ownProps);
  return {
    //展点
    onPlotClick: () => {
      if (ownProps.isRealtimeOn) {
        console.log("fetching ...");
        fetch("http://172.16.102.90:1338/bluetooth/connect/RTK/printnmea")
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
        dispatch({
            type:'signatureClick',
            payload: dispatch
        })
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
