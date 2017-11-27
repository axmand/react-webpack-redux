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
import Drawer from 'material-ui/Drawer';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from "material-ui/Button";
import List from "material-ui/List"
import Typograghy from "material-ui/Typography";
import IconButton from 'material-ui/IconButton';
import PhotoCameraIcon from 'material-ui-icons/PhotoCamera';

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
import projectData from "./../../redux/RootData";
import appConfig from "../../redux/Config";

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
  drawerPaper: {
    left:`${window.innerWidth * 0.083}px`,
    top:`${window.innerHeight * 0.2}px`,
    height: '70%',
    width:`${window.innerHeight * 0.45}px`,
  },
  toolBar:{
    padding:0,
    minHeight:'45px',
    background:'#455A64',
  },
  title: {
    flex: 1,
    fontWeight: '800',
    fontSize:'1rem',
    textAlign:'center',
    color:'#fff',
  },
  fetchpoibut:{
    backgroundColor:'rgba(255, 255, 255, .3)',
  },
  headcell:{
    padding:0,
    minHeight:'30px',
    minWidth:'40px',
  },
  headtext:{
    fontSize:'0.875rem',
    textAlign:'center',
    width:'100%',    
    fontWeight:'600',
  },
  tablecell:{
    padding:0,
    fontSize:'0.875rem',
    fontWeight:'400',
    textAlign:'center',
    minHeight:'30px',
    minWidth:'40px',
  }
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
      onjzdPlotClick,
    } = this.props;
    const {
      onPlotAlerClose,
      handleDelete,
      showDelDialog,
      handleCloseDelDialog
    } = this.props;
    const {
      alertPlotFail,
      plotListData,
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
      haveObjToDel,
      onFetchPoi_NumClick,
      onjzdXCZJClick
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
                <Typograghy className={classes.text}>纠点拍照</Typograghy>
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
      <Drawer
        type="persistent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor= 'left'
        open={drawPointIsChecked}
      >
        <Toolbar className={classes.toolBar}>
          <Typography className={classes.title}>
              实时成图点列表
          </Typography>
          <Button className={classes.fetchpoibut} onClick={onFetchPoi_NumClick} >
          <Typography style={{fontSize:'0.875rem', color:'#fff'}}>
            取号
            </Typography>
          </Button>
        </Toolbar> 
        <div style={{overflowX: 'auto', overflowY: 'auto'}}>
          <Table>
            <TableHead>
              <TableRow style={{height:'40px'}}>
                <TableCell className={classes.headcell} style={{width:`${window.innerWidth * 0.05}px`,padding:0}}>            
                  <Typography className={classes.headtext} >点号</Typography>      
                </TableCell>
                <TableCell className={classes.headcell} style={{width:`${window.innerWidth * 0.1}px`,padding:0}}>
                  <Typography className={classes.headtext} >坐标</Typography>  
                </TableCell>
                <TableCell className={classes.headcell} style={{width:`${window.innerWidth * 0.05}px`,padding:0}}>
                  <Typography className={classes.headtext} >修正</Typography>  
                </TableCell>
                <TableCell className={classes.headcell} style={{width:`${window.innerWidth * 0.05}px`,padding:0}}>
                  <Typography className={classes.headtext} >拍照</Typography>  
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {plotListData.map(n => {
                return (
                  <TableRow key={n.id}>
                    <TableCell className={classes.tablecell} style={{width:`${window.innerWidth * 0.05}px`,padding:0}}>{n.id}</TableCell>
                    <TableCell className={classes.tablecell} style={{width:`${window.innerWidth * 0.1}px`,padding:0,textAlign:'left'}}>
                      Lng:{n.coordinates[0]}<br/>Lat:{n.coordinates[1]}
                    </TableCell>
                    <TableCell 
                      className={classes.tablecell}
                      style={{width:`${window.innerWidth * 0.05}px`,padding:0}}
                      onClick={()=>onjzdPlotClick(n.id)}
                    >
                    <Adjust style={{color:'#000',width:`${window.innerWidth * 0.015}px`}}/>
                    </TableCell>
                    <TableCell 
                    className={classes.tablecell}
                    style={{width:`${window.innerWidth * 0.05}px`,padding:0}}
                    onClick={()=>onjzdXCZJClick(n.id)}> 
                    <PhotoCameraIcon style={{color:'#000',width:`${window.innerWidth * 0.015}px`}}/>
                  </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Drawer>

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
    // plotListData:sketchState.plotListData
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  //console.log(ownProps);
  return {
    //展点
    onPlotClick: () => {
      if (ownProps.isRealtimeOn) {

        dispatch({
          type: "OPEN_WAITING_MODULE",
        });

        console.log("Fetching latitude and longtitude from the satellite ...");
        fetch(appConfig.fileServiceRootPath + "/bluetooth/connect/RTK/printnmea")
          .then(response => {
          if (response.ok) {
            return response.json()
          } 
          else {
            return Promise.reject({
              status: response.status,
              statusText: response.statusText
            })
          }
        })
        .then(json => {
          console.log(json);
          // 处理不同HTTP状态码下的对应操作
          if (json.status === 500)
          {
            dispatch({
                type:"plotFail",
                payload: "尚未获取到差分后的测量点坐标数据"
            })           
          };
          if (json.status === 200)
          {
            dispatch({
              type: "plotRTK",
              payload: json
            });
          };
          // 在状态栏显示调试信息
          dispatch({
            type: "STATUS_BAR_NOTIFICATION",
            payload: {
              notification: json,
            }
          });
          dispatch({
            type: "CLOSE_WAITING_MODULE",
          });
        })
        .catch(err => {
          console.log(err);
          dispatch({
            type: "STATUS_BAR_NOTIFICATION",
            payload: {
              notification: err,
            }
          });
          dispatch({
            type: "CLOSE_WAITING_MODULE",
          });
        });
      } else {
        console.log("Importing surveying data from the files ...");
        dispatch({
            type:'plotFile'
        })
        dispatch({
          type: "STATUS_BAR_NOTIFICATION",
          payload: {
            notification: "尚未实现从文件中展出测量点，请将实时成图按钮打开，从RTK获取测量数据！",
          }
        });
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
    onjzdPlotClick:poi_id=>{
      dispatch({
        type:'jzdPlotClick',
        payload:{command:poi_id}
      });
    },

    onFetchPoi_NumClick:()=>{
        // dispatch({
        //   type: 'fetchPoi_NumClick'
        // })
      ownProps.plotListData.map(n=>{          
        // let Poi_Data = JSON.stringify({
        //     	PointX: n.coordinates[0],
        //       PointY: n.coordinates[1],
        //       strType: null,
        //       strUserName: null
        //   });
        console.log(n)
        fetch('http://webapi.nlis.local:52417/NanNingWebService/GetParcelNumber.asmx/GetParcelSingleNumber',
        {
          method: "POST",
          mode: "cors",
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : '_xMo3tbdjHjIsF9GN9UP_ZS9tmo4jdQl1rCRc8qpkscFQ0zUk_F9t9mMC3FrsoL-JjSXBjZrXInes1YptzvjJQcoQl34aTvfBz1WcjhF4aHUR651KEIPVt00J-4gQeAmRr6r0sOue7QtoIZNBZezG7cdx10CzBAZOXd7hLuv2wqEV9OhcDMeDfocvwwsB8Nj3fSIwUbwE7OUMB4-5YwLOJ1UVvPF0WsPjlJFimd2E3yUcllMSfXienLev3kYssBeIJ05mmNeDpl55dqDIK_tvRo_xOpu4mlSXnvy0cAECpiis9U0Xq8k4rQ1j8o-5-dMkjXKVmcqZzZlj-HT8xI0UO9fg-Ihsm7j78oCKDJDDck_UhfT0YgLvQojOk7xRL-y4MryV-JROs_rsAq9FcfpqXhSIskkiPJwEoga8XjR7Hq0DoILnyIUdQS-LgXoecE8pqcja0z1pgU7E8BaF8UddjYe1glsFJXLXgdH5Tat9YPMFkFM_ikFZocuFBOItNJRdC7dYBcro9TdZWyW6rKOB1VNNYjzFxZMeoxQr-NnjlGrCco6Rd5NzimiVTzVmFexhJzU9Atn0EGzTLZcm2moWfvun0dwzDvJkdyXjF0ifGqytDDX2KKmCH2FEr00kY2tx316txboIbAvys6Q_hyv4C7SQUvaGslfmUydHPouFlKreNTi1w1aw3HuaQ2N24s4eptP8Xy-OK6yEB4uxgld6C5D-_9je1BfVgukf-GStGAR-ibc3gyeeVPAHWCy6jzstpDe0C8YrtH-Z6iPD-A5sJajxPy2tKpZeTJsEFAtehauVk-HbArQCQ4qazYhsPdtJD2_cLdBgBAj4tM7FSCe_n3Q2BnGd4JBW9nym4YEjWNFThRMqOBrPw2fz4oWihrU-JZuJTZwD64stVVOhO1uw2tZiJ874qRNfe1bCaKXwfYyHGGsiv385ty7fg_8eWOf4g7NtiJMe-m9SpdHyIeNjrQtRXWugLGZLbgFd0g4lTgU3Q93ydCU74kPzezH_XnhVm991HkX9jG90NasgVV8WKlvnb_fjjb-pZd7hv8HV4acdm3uK1brkOKf6OJlF6i6'
          },
          body:  JSON.stringify({
            	PointX: n.coordinates[0],
              PointY: n.coordinates[1],
              strType: null,
              strUserName: null
          })
        })
        .then(response => {
          console.log(response)
          return response.json()
            .then(json => {
              if (response.ok) {
                return json
              } 
              else {
                return Promise.reject(json)
              }
            })
        })
      .then( json => {
        dispatch({
          type: 'fetchPoi_NumClick',
          payload:json,
        })
        console.log(json)
      })
      .catch(err => {
        console.log(err)
      })
      })     
   },
   
   onjzdXCZJClick:poi_id=>{
    dispatch({
      type:'jzdXCZJClick',
      payload:{command:poi_id}
    });
    
    dispatch({
      type: "saveClick",
    }); 

    dispatch({
        type: 'ProgressShow',
    });
    fetch(appConfig.fileServiceRootPath + '//project/photolist/'+poi_id )
    // fetch(appConfig.fileServiceRootPath + '//project/photolist/' )
    .then(response => response.json())
    .then( json => {
      dispatch({
        type: 'handleCameraShow',
        payload:json,
      })
      //console.log(json)
      dispatch({
        type: 'ProgressShow',
      }) 
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: 'ProgressShow',
      }) 
    })
   }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles, { name: "SkechToolBar" })(SkechToolBar)
);
