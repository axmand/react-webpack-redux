import React, { Component } from "react";
import { connect } from "react-redux";
import { findDOMNode } from "react-dom";
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
import Input from 'material-ui/Input';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from "material-ui/Button";
import Popover from "material-ui/Popover";
import List, { ListItem} from "material-ui/List";
import Typograghy from "material-ui/Typography";
import Checkbox from "material-ui/Checkbox";
import Grid from 'material-ui/Grid';
import PhotoCameraIcon from 'material-ui-icons/PhotoCamera';

//import icon
import LocationSearching from "material-ui-icons/LocationSearching"; //展点
import Adjust from "material-ui-icons/Adjust"; //画点
import HdrWeak from "material-ui-icons/HdrWeak"; //纠点拍照
import Timeline from "material-ui-icons/Timeline"; //连线
import BorderStyle from "material-ui-icons/BorderStyle"; //界址线
import CheckBoxOutlineBlank from "material-ui-icons/CheckBoxOutlineBlank"; //构面
import ViewCarousel from "material-ui-icons/ViewCarousel"; //阳台
import Looks from "material-ui-icons/Looks"; //弧线
//import PictureInPicture from "material-ui-icons/PictureInPicture"; //中空地块
import BookmarkBorder from "material-ui-icons/BookmarkBorder"; //标注
import Straighten from "material-ui-icons/Straighten"; //测距
import FlipToFront from "material-ui-icons/FlipToFront"; //测面
import TouchApp from "material-ui-icons/TouchApp"; //捕捉
import NearMe from "material-ui-icons/NearMe"; //选中
import Delete from "material-ui-icons/Delete"; //删除
import Undo from "material-ui-icons/Undo"; //撤销
import Redo from "material-ui-icons/Redo"; //重做
import Save from "material-ui-icons/Save"; //保存
import CreateIcon from "material-ui-icons/Create"; //签章
import DragHandle from "material-ui-icons/DragHandle"; //拖动
// import CloseIcon from "material-ui-icons/Close";
// import Snackbar from "material-ui/Snackbar";
import SecondDialog from '../obligee/SecondDialog';
import TotalStationCoorTransform from './TotalStationCoorTransform'
import appConfig from "../../redux/Config";
import coordinate from "../../utils/coordinate"
import macinfo from "../../utils/macinfo"

const styles = theme => ({
  root: {
    height: `${window.innerHeight * 0.075}px`,
    width:  `${window.innerHeight * 1.275}px`,
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
  snapList:{
    background: "rgba(69, 90, 100, .6)",
    height:`${window.innerHeight * 0.1}px`,
    width:`${window.innerHeight * 0.075}px`,
  },
  snapitem:{
    height:`${window.innerHeight * 0.025}px`,
    width:`${window.innerHeight * 0.1}px`,
    justifyContent: 'center ',
    background: "rgba(69, 90, 100, .6)",
    paddingLeft: '1%',
    paddingRight: '1%',
  },
  checkbox: {
    height:'30%',
    width: '30%',
    fontSize:'1rem'
  },
  checked: {
    color: "#B3D9D9"
  },
  snaptext:{
    color:'#fff',
    fontSize: "1em",
    fontFamily:'微软雅黑',
  },
  fileitem:{
    height:`${window.innerHeight * 0.025}px`,
    width:`${window.innerHeight * 0.08}px`,
    justifyContent: 'center ',
    background: "rgba(69, 90, 100, .6)",
    paddingLeft: '1%',
    paddingRight: '1%',
    color:'#fff',
    fontSize: "1em",
    fontFamily:'微软雅黑',
  },
  file_A:{
    overflow: 'hidden',
    textAlign:'center',
    height:'100%',
    width: '100%',
    color:'#fff',
    fontSize: "1em",
    fontFamily:'微软雅黑',
    position: 'relative',
    display: 'inline-block',
  },
  file_input:{
    height:'100%',
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0,
  },
  rectifydrawerPaper: {
    left:`${window.innerWidth * 0.083}px`,
    top:`${window.innerHeight * 0.2}px`,
    height: '75%',
    width:`${window.innerHeight * 0.4}px`,
  },

  coordinateTransformPaper: {
    left:`${window.innerWidth * 0.2}px`,
    top:`${window.innerHeight * 0.2}px`,
    height:`${window.innerHeight * 0.6}px`,
    width:`${window.innerWidth * 0.6}px`,
  },
  totalStationGrid:{
    flexGrow: 1,
    width: '100%',
    height: '100%'
  },
  coorTranBtn:{
    background:'#455A64',
    color:'#fff',
    top:'88%',
    minHeight:'32px',
    minWidth:'64px',
    margin:"10px"
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
    width:`${window.innerHeight * 0.05}px`
  },
  headcell:{
    padding:0,
    minHeight:'30px',
    minWidth:'40px',
  },
  headtext:{
    fontSize:'0.8rem',
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
  state = {
    anchorEl: findDOMNode(this.button),
  };
  render() {
    const classes = this.props.classes;
    const {anchorEl}=this.state;
    const {
      choosePlotType,
      PlotListClose,
      onRTKPlotClick,
      onBDPlotClick,
      onPlotfromFileClick,
      getFilePath,
      onDrawPointClick,
      onRectifyPoiClick,
      onDrawLineClick,
      onDrawJZXClick,
      onDrawArcClick,
      onDrawPolygonClick,
      onBalconyClick,
      onLabelClick,
      onaddLabelClick,
      onEditLabel,
      labelListClose,
      onMeasureDistanceClick,
      onMeasureAreaClick,
      onChooseObjClick,
      onSnapListClick,
      onDeleteClick,
      onUndoClick,
      onRedoClick,
      onSaveClick,
      onSignatureClick,
      onDelAlerClose,
      onSignatureAlerClose,
      openFetchPoiNum,
      closeFetchPoiNum,
      // onJzdTableClick,
      onRectifyJzdClick,
      onSnapClick,//捕捉
      SnapListClose,
      onPlotAlerClose,
      handleDelete,
      showDelDialog,
      handleCloseDelDialog,      
      updateMapdata2project,
      showSaveDialog,
      alerthaveSaved,
      handleCloseSaveDialog,
      onDrawAlerClose,
      alertPlotFail,
      plotListData,
      controlPoiNum,
      alertSignature,
      plotIsChecked,
      drawPointIsChecked,
      rectifyPoiIsChecked,
      plotFromFile,
      drawLineIsChecked,
      drawJZXIsChecked,
      drawArcIsChecked,
      drawPolygonIsChecked,
      balconyIsChecked,
      labelIsChecked,
      addLabelIsChecked,
      editLabelIsChecked,
      measureDistanceIsChecked,
      measureAreaIsChecked,
      chooseObjIsChecked,
      snapIsChecked,
      snapJzdIsChecked,
      snapDxIsChecked,
      haveObjToDel,
      drawAlert,
      onFetchPoi_NumClick,
      onjzdXCZJClick,
      fetchPoiNumIsChecked,
      controlPoiArr,
      totalStationData      
    } = this.props;
   return (
    <div>
      {/* 由各功能按钮组成的可拖动的草图编辑工具条 */}
        <Draggable handle="span">
            <List className={classes.root}>
            <Button 
                ref={node => {
                  this.Plot = node;
                }}
                className={classes.button} 
                style={{
                backgroundColor: plotIsChecked
                    ? "rgba(69, 90, 100, .8)"
                    : "transparent"
                }}
                onClick={choosePlotType}
                >
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
                backgroundColor: rectifyPoiIsChecked
                    ? "rgba(69, 90, 100, .8)"
                    : "transparent"
                }}
                onClick={onRectifyPoiClick}
            >
                <HdrWeak className={classes.icon} />
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
            {/* <Button
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
            </Button> */}
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
            {/* <Button
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
            </Button> */}
            <Button
                ref={node => {
                  this.label = node;
                }}
                className={classes.button}
                style={{
                backgroundColor: labelIsChecked
                    ? "rgba(69, 90, 100, .8)"
                    : "transparent"
                }}
                onClick={onLabelClick}
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
              ref={node => {
                this.snap = node;
              }}
              className={classes.button}
              style={{
              backgroundColor: snapIsChecked
                  ? "rgba(69, 90, 100, .8)"
                  : "transparent"
              }}
              onClick={onSnapClick}
            >
                <TouchApp className={classes.icon} />
                <Typograghy className={classes.text}>捕捉</Typograghy>
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
          {/* 删除时弹出确认对话框 */}
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
          {/* 保存时弹出确认对话框 */}
          <Dialog open={showSaveDialog} onRequestClose={handleCloseSaveDialog}>
            <DialogContent>
              <DialogContentText  style={{color:"#455A64"}}>确认保存草图绘制数据？</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseSaveDialog} color="default">
                取消
              </Button>
              <Button onClick={updateMapdata2project} style={{color:"#455A64"}}>
                确认
              </Button>
            </DialogActions>
          </Dialog>
          {/* 已保存提示 */}
          <Dialog open={alerthaveSaved} onRequestClose={handleCloseSaveDialog}>
            <DialogContent>
              <DialogContentText  style={{color:"#455A64"}}>草图绘制数据已保存！</DialogContentText>
            </DialogContent>
          </Dialog>
          {/* 删除时错误操作提示框 */}
          <Dialog 
            open={haveObjToDel} 
            onRequestClose={onDelAlerClose}>
              <DialogContent className={classes.alert} onClick={onDelAlerClose}>
                <Typograghy className={classes.message}>
                  Error_map_001:未选中需要删除的对象！                
                </Typograghy>
              </DialogContent>
          </Dialog>
          {/* RTK展点时错误提示框 */}
          <Dialog 
            open={alertPlotFail} 
            onRequestClose={onPlotAlerClose}>
              <DialogContent className={classes.alert} onClick={onPlotAlerClose}>
                <Typograghy className={classes.message}>
                Error_map_002:请求RTK数据失败！                
                </Typograghy>
              </DialogContent>
          </Dialog>
          {/* 撤销重做错误操作提示框 */}
          <Dialog 
            open={drawAlert} 
            onRequestClose={onDrawAlerClose}>
              <DialogContent className={classes.alert} onClick={onDrawAlerClose}>
                <Typograghy className={classes.message}>
                Error_map_003:您未处于绘制过程中，操作无效！                
                </Typograghy>
              </DialogContent>
          </Dialog>
          {/* 未保存时错误操作提示框 */}
          <Dialog 
            open={alertSignature} 
            onRequestClose={onSignatureAlerClose}>
              <DialogContent className={classes.alert} onClick={onSignatureAlerClose}>
                <Typograghy className={classes.message}>
                Error_map_004:您还未点击保存！                
                </Typograghy>
              </DialogContent>
          </Dialog>
          {/* 确认取号提示框 */}
          <Dialog open={fetchPoiNumIsChecked} onRequestClose={closeFetchPoiNum}>
            <DialogContent>
              <DialogContentText  style={{color:"#455A64"}}>确认取号？</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeFetchPoiNum} color="default">
                取消
              </Button>
              <Button onClick={onFetchPoi_NumClick} style={{color:"#455A64"}}>
                确认
              </Button>
            </DialogActions>
          </Dialog>
      {/* 点击标注按钮弹出操作选择列表 */}
      <Popover
          anchorEl={findDOMNode(this.label)}
          open={labelIsChecked}
          onRequestClose={labelListClose}
          anchorOrigin={{
            vertical:"bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          className={classes.snapList}
        >
          <ListItem
            button
            className={classes.snapitem}
            disableGutters={true}
            onClick={onaddLabelClick}
          >
            <Checkbox
              classes={{ checked: classes.checked }}
              checked={addLabelIsChecked}
              className={classes.checkbox}
            />
            <span className={classes.snaptext}>添加标注</span>
          </ListItem>
          <ListItem
            button
            className={classes.snapitem}
            onClick={onEditLabel}
          >
            <Checkbox
              classes={{ checked: classes.checked }}
              checked={editLabelIsChecked}
              className={classes.checkbox}
            />
            <span className={classes.snaptext}>编辑完成</span>
          </ListItem>
      </Popover>
      {/* 点击捕捉按钮弹出捕捉图层选择列表 */}
      <Popover
          anchorEl={findDOMNode(this.snap)}
          open={snapIsChecked}
          onRequestClose={SnapListClose}
          anchorOrigin={{
            vertical:"bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          className={classes.snapList}
        >
          <ListItem
            button
            className={classes.snapitem}
            disableGutters={true}
            onClick={() => onSnapListClick("point")}
          >
            <Checkbox
              classes={{ checked: classes.checked }}
              checked={snapJzdIsChecked}
              className={classes.checkbox}
            />
            <span className={classes.snaptext}>界址点</span>
          </ListItem>
          <ListItem
            button
            className={classes.snapitem}
            onClick={() => onSnapListClick("DX")}
          >
            <Checkbox
              classes={{ checked: classes.checked }}
              checked={snapDxIsChecked}
              className={classes.checkbox}
            />
            <span className={classes.snaptext}>地形图</span>
          </ListItem>
      </Popover>
      {/* 点击展点弹出展点方式选择列表 */}
      <Popover
          anchorEl={findDOMNode(this.Plot)}
          open={plotIsChecked}
          onRequestClose={PlotListClose}
          anchorOrigin={{
            vertical:"bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          className={classes.snapList}
        >
          <ListItem button className={classes.fileitem} disableGutters={true} onClick={onRTKPlotClick}>
          RTK展点
          </ListItem>
          <ListItem button className={classes.fileitem} disableGutters={true} onClick={onBDPlotClick}>
          内置北斗展点
          </ListItem>

          <ListItem button className={classes.fileitem}>
            <span  className={classes.file_A}>
                <span>从文件展点</span>
                <input 
                  type="file" 
                  className={classes.file_input}
                  value=""
                  onChange={onPlotfromFileClick}/>
            </span>
          </ListItem>
      </Popover>

      <TotalStationCoorTransform 
        controlPoiArr={controlPoiArr} 
        totalStationData={totalStationData}
      />
      {/* 点击纠点拍照弹出界址点列表 */}
      <Drawer
        type="persistent"
        classes={{
          paper: classes.rectifydrawerPaper,
        }}
        anchor= 'left'
        open={rectifyPoiIsChecked}
      >
        <Toolbar className={classes.toolBar}>
          <Typography className={classes.title}>
              实时成图点列表
          </Typography>
          <Button className={classes.fetchpoibut} onClick={openFetchPoiNum} >
          <Typography style={{fontSize:'0.875rem', color:'#fff'}}>
            取号
            </Typography>
          </Button>
        </Toolbar> 
        <div style={{overflowX: 'auto', overflowY: 'auto'}}>
          <Table>
            <TableHead>
              <TableRow style={{height:'40px'}}>
                <TableCell className={classes.headcell} style={{width:`${window.innerWidth * 0.06}px`,padding:0}}>            
                  <Typography className={classes.headtext} >id/界址点编号</Typography>      
                </TableCell>
                <TableCell className={classes.headcell} style={{width:`${window.innerWidth * 0.075}px`,padding:0}}>
                  <Typography className={classes.headtext} >坐标</Typography>  
                </TableCell>
                <TableCell className={classes.headcell} style={{width:`${window.innerWidth * 0.015}px`,padding:0}}>
                  <Typography className={classes.headtext} >修正</Typography>  
                </TableCell>
                <TableCell className={classes.headcell} style={{width:`${window.innerWidth * 0.015}px`,padding:0}}>
                  <Typography className={classes.headtext} >拍照</Typography>  
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {plotListData.map(n => {
                return (
                  <TableRow key={n.id}>
                    {/* id/界址点号 */}
                    <TableCell className={classes.tablecell} style={{width:`${window.innerWidth * 0.06}px`,padding:0}}>{n.id}</TableCell>
                    {/* 坐标 */}
                    <TableCell className={classes.tablecell} style={{width:`${window.innerWidth * 0.075}px`,padding:0,textAlign:'left'}}>
                      Lng:{n.coordinates[0].toFixed(7)}<br/>Lat:{n.coordinates[1].toFixed(7)}
                    </TableCell>
                    {/* 纠点 */}
                    <TableCell 
                      className={classes.tablecell}
                      style={{width:`${window.innerWidth * 0.015}px`,padding:0}}
                      onClick={()=>onRectifyJzdClick(n.id)}
                    >
                    <Adjust style={{color:'#000',width:`${window.innerWidth * 0.015}px`}}/>
                    </TableCell>
                    {/* 拍照*/}
                    <TableCell 
                    className={classes.tablecell}
                    style={{width:`${window.innerWidth * 0.015}px`,padding:0}}
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
  updateMapdata2project: PropTypes.func.isRequired,
  handleCloseDelDialog: PropTypes.func.isRequired,
  handleCloseSaveDialog: PropTypes.func.isRequired,
  showDelDialog: PropTypes.bool.isRequired,
  showSaveDialog:PropTypes.bool.isRequired,
  alerthaveSaved:PropTypes.bool.isRequired,
  haveObjToDel: PropTypes.bool.isRequired,
  drawPointIsChecked: PropTypes.bool.isRequired,
  drawLineIsChecked: PropTypes.bool.isRequired,
  drawJZXIsChecked: PropTypes.bool.isRequired,
  drawPolygonIsChecked: PropTypes.bool.isRequired,
  balconyIsChecked: PropTypes.bool.isRequired,
  addLabelIsChecked: PropTypes.bool.isRequired,
  labelIsChecked:PropTypes.bool.isRequired,
  chooseObjIsChecked: PropTypes.bool.isRequired,
  alertPlotFail: PropTypes.bool.isRequired,
  alertSignature: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
  const sketchState = state.sketchReduce;

  return {
    showDelDialog: sketchState.showDelDialog,
    showSaveDialog:sketchState.showSaveDialog,
    alerthaveSaved:sketchState.alerthaveSaved,
    haveObjToDel: sketchState.haveObjToDel,
    drawAlert:sketchState.drawAlert,
    plotIsChecked:sketchState.plotIsChecked,
    drawPointIsChecked: sketchState.drawPointIsChecked,
    rectifyPoiIsChecked:sketchState.rectifyPoiIsChecked,
    plotFromFile:sketchState.plotFromFile,
    totalStationData:sketchState.totalStationData,
    controlPoiArr:sketchState.controlPoiArr,
    drawLineIsChecked: sketchState.drawLineIsChecked,
    drawJZXIsChecked:sketchState.drawJZXIsChecked,
    drawArcIsChecked:sketchState.drawArcIsChecked,
    drawPolygonIsChecked: sketchState.drawPolygonIsChecked,
    balconyIsChecked: sketchState.balconyIsChecked,
    labelIsChecked:sketchState.labelIsChecked,
    addLabelIsChecked: sketchState.addLabelIsChecked,
    editLabelIsChecked:sketchState.editLabelIsChecked,
    measureDistanceIsChecked: sketchState.measureDistanceIsChecked,
    measureAreaIsChecked: sketchState.measureAreaIsChecked,
    chooseObjIsChecked: sketchState.chooseObjIsChecked,
    snapIsChecked:sketchState.snapIsChecked,
    snapJzdIsChecked:sketchState.snapJzdIsChecked,
    snapDxIsChecked:sketchState.snapDxIsChecked,
    undoIsChecked: sketchState.undoIsChecked,
    redoIsChecked: sketchState.redoIsChecked,
    haveSaved: sketchState.haveSaved,
    alertPlotFail: sketchState.alertPlotFail,
    alertSignature:sketchState.alertSignature,
    fetchPoiNumIsChecked:sketchState.fetchPoiNumIsChecked,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // console.log(ownProps);
  return {
    //选择展点方式
    choosePlotType:()=>{
      dispatch({
        type:"choosePlotType"
      });
    },
    //关闭展点选择列表
    PlotListClose:()=>{
      dispatch({
        type:"plotListClose",
      })
    },
 //选择RTK展点
    onRTKPlotClick: () => {
      if (ownProps.isRealtimeOn) {
        dispatch({
          type: "OPEN_WAITING_MODULE",
        });
        console.log("Fetching latitude and longtitude from the satellite ...");
       //获取RTK数据
        fetch(appConfig.fileServiceRootPath + "/bluetooth/connect/RTK/printnmea")
          .then(response => {
            console.log(response)
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
                  type:"RTKplotFail",
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
            // 输出错误信息
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
          type: "STATUS_BAR_NOTIFICATION",
          payload: {
            notification: "尚未实现从文件中展出测量点，请将实时成图按钮打开，从RTK获取测量数据！",
          }
        });
      }
    },
//选择内置北斗展点
onBDPlotClick: () => {
  dispatch({
    type: "OPEN_WAITING_MODULE",
  });
  console.log("Fetching latitude and longtitude from the BD ...");
  // 获取内置北斗定位数据
  fetch(appConfig.fileServiceRootPath + "/sp/getresult ")
    .then(response => {
      console.log(response)
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
      //处理不同HTTP状态码下的对应操作
      if (json.status === 200)
      {
        dispatch({
          type: "plotBD",
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
},
//选择从文件展点
    onPlotfromFileClick:event=>{
      //读取文件数据
      let file=event.target.files[0];
      let txtContent;
      let oFReader=new FileReader();
      oFReader.readAsText(file,"UTF-8");	
      oFReader.onloadend=function(oFRevent){
        txtContent=oFRevent.target.result;
        // 将文件数据传递至服务器处理后获取可展点在地图上的数据格式      
        fetch(appConfig.fileServiceRootPath + '//project/showtotalstation',
        // fetch(appConfig.fileServiceRootPath + '//project/totalstation',
          {
            method:"POST",
            body:txtContent
          }).then(response=>{
            return response.json()
            .then(json=>{
              if(response.ok){
                dispatch({
                  type:"getFileContent",
                  payload:{
                    content:json.data
                  }
                });
                return json
              }else{
                return Promise.reject(json);
              }
            })
          })
          .then(json=>{
            console.log(json)
          }).catch(err=>{
            console.log(err)
          })
          dispatch({
            type:"plotListClose",
          })
      }
    },
    //画点
    onDrawPointClick: () => {
      dispatch({
        type: "drawPointClick",
      });
    },
    //纠点拍照
    onRectifyPoiClick: () => {
      dispatch({
        type: "rectifyPoiClick",
      });
    },
    //画四至线
    onDrawLineClick: () => {
      dispatch({
        type: "drawLineClick",
      });
    },
    //画界址线
    onDrawJZXClick: () => {
      dispatch({
        type: "drawJZXClick",
      });
    },
    //画弧线
    onDrawArcClick:()=>{
      dispatch({
        type:"drawArcClick",
      })

    },
    //构面
    onDrawPolygonClick: () => {
      dispatch({
        type: "drawPolygonClick",
      });
    },
    //画阳台
    onBalconyClick: () => {
      dispatch({
        type: "balconyClick",
      });
    },
    //打开标注下拉列表
    onLabelClick:()=>{
      dispatch({
        type:'labelClick'
      })
    },
    // 添加标注并关闭下拉选择列表
    onaddLabelClick: () => {
      dispatch({
        type: "addLabelClick",
      });
      dispatch({
        type:"labelListClose"
      })
    },
    //编辑标注完成并关闭下拉选择列表
    onEditLabel:()=>{
      dispatch({
        type:"editLabel"
      });
      dispatch({
        type:"labelListClose"
      })
    },
    //关闭标注列表
    labelListClose:()=>{
      dispatch({
        type:"labelListClose"
      })
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
    //点击选中按钮绑定函数
    onChooseObjClick: () => {
      dispatch({
        type: "chooseObjClick",
      });
    },
    //点击捕捉按钮绑定函数
    onSnapClick:()=>{
      dispatch({
        type: "snapClick",
      });
    },
    // 关闭捕捉下拉列表
    SnapListClose:()=>{
      dispatch({
        type: "snapListClose",
      });
    },
    // 选择捕捉图层
    onSnapListClick:chosedLayer=>{
      dispatch({
        type: "snapListClick",
        payload:{
          command:chosedLayer
        }
      });
      dispatch({
        type: "snapListClose",
      });

    },

    //删除
    onDeleteClick: () => {
      dispatch({
        type: "deleteClick",
      });
    },

    //撤销
    onUndoClick: () => {
      dispatch({
        type: "undoClick",
      });
    },
    //重做
    onRedoClick: () => {
      dispatch({
        type: "redoClick",
      });
    },
    //保存
    onSaveClick: () => {
      //保存数据至sketchstate
      dispatch({
        type: "opensaveDialog",
      });
    },
    updateMapdata2project:()=>{
      //更新图层数据至项目数据
      console.log(ownProps)
      dispatch({
        type: "updateData2projectData",
        payload:{
           data:ownProps.LayerData
         }
      });
      // 关闭保存确认对话框
      dispatch({
        type: "handleCloseSaveDialog"
      });
      dispatch({
        type:'mapDataSaveSuccess'
      });
      // 保存后数据重填签章表
      dispatch({
        type:'fillSignatureList',
        payload: {
        data:ownProps.LayerData
        }
      });
    },
    // 关闭保存确认对话框
    handleCloseSaveDialog:()=>{
      dispatch({
        type: "handleCloseSaveDialog"
      });
    },
    //签章
    onSignatureClick:()=>{
      console.log(ownProps)
      if(ownProps.haveSaved){
        dispatch({
          type: "choose",
           payload: {
             choice: 3
            }
        });
        dispatch({
          type:'fillSignatureList',
          payload: {
          data:ownProps.LayerData
          }
        });
      }else{
        dispatch({
          type:'signatureAlertOpen'
        });
      }
    },
    // 点击删除
    handleDelete:()=>{
        dispatch({
            type: 'handleDelete',
        })
    },
// 关闭删除确认对话框
    handleCloseDelDialog: () => {
      dispatch({
        type: "handleCloseDelDialog"
      });
    },
    // 关闭错误删除警告提示
    onDelAlerClose: () => {
      dispatch({
        type: "delAlerClose"
      });
    },
    // 关闭展点错误警告提示
    onPlotAlerClose: () => {
      dispatch({
        type: "plotAlerClose"
      });
    },
    // 关闭签章警告提示
    onSignatureAlerClose:()=>{
        dispatch({
            type:"signatureAlerClose"
        })
    },
    //关闭错误使用撤销重做提示
    onDrawAlerClose:()=>{
      dispatch({
        type:"drawAlerClose"
      })
    },
    // 纠正点位按钮绑定事件
    onRectifyJzdClick:poi_id=>{
      dispatch({
        type:'rectifyJzdClick',
        payload:{command:poi_id}
      });
      
    },
    // 关闭取号对话框
    closeFetchPoiNum:()=>{
      dispatch({
        type:'closeFetchPoiNum',
      });
    },
    // 打开取号对话框
    openFetchPoiNum:()=>{
      dispatch({
        type:'openFetchPoiNum',
      });
    },
// 取号对话框确认按钮绑定的函数
    onFetchPoi_NumClick:()=>{
      dispatch({
        type:'closeFetchPoiNum',
      });       

      console.log(ownProps)
      ownProps.plotListData.forEach(n=>{
        let Poi_Data = JSON.stringify({
            	PointX: coordinate.LB2XY(n.coordinates[0],n.coordinates[1]).descartesX,
              PointY: coordinate.LB2XY(n.coordinates[0],n.coordinates[1]).descartesY,
              // strType: macinfo.macInfo,
              strType: localStorage.getItem('Macinfo'),
              strUserName: null
        });
        // 传递点坐标及旧点号到服务端获取新点号
        fetch('http://webapi.nlis.local:52417/NanNingWebService/GetParcelNumber.asmx/GetParcelSingleNumber',
        {
          method: "POST",
          mode: "cors",
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : localStorage.getItem('access_token')
          },
          body: Poi_Data
        })
        .then(response => {
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
            let Id_Data_0 = []
            Id_Data_0.push({BeforeId:n.id,AfterId:json.d}) 
            let Id_Data =JSON.stringify(Id_Data_0);   

            dispatch({
                  type: 'fetchPoi_NumClick',
                  payload1:json,
                  payload2:n
            }) 
                
              fetch(appConfig.fileServiceRootPath + '//project/changeid',
                {
                  method: "POST",
                  body: Id_Data
                })
              .then(response => {
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
                // console.log(json)
              })
              .catch(err => {
                console.log(err)
              })

        // console.log(json)
      })    
      .catch(err => {
        console.log(err)
      })  
      });
      dispatch({
        type: "STATUS_BAR_NOTIFICATION",
        payload: {
          notification: "数据库取点中。。。。。。",
        }
      });
   },
   //关闭控制点提示弹出框
   closeControlPoiAlert:()=>{
    dispatch({
        type:"closeControlPoiAlert"
    })
  },
  //  点击界址点拍照，传递当前点号
   onjzdXCZJClick:poi_id=>{
    dispatch({
      type:'jzdXCZJClick',
      payload:{command:poi_id}
    });
    dispatch({
        type: 'ProgressShow',
    });
    fetch(appConfig.fileServiceRootPath + '//project/photolist/'+ poi_id )
    // fetch(appConfig.fileServiceRootPath + '//project/photolist/' )
    .then(response => response.json())
    .then( json => {
      console.log(ownProps)
      dispatch({
        type: 'handleCameraShow',
        payload:{json:json,ownProps:ownProps},
      })
      
      dispatch({
        type: 'showPhoto2projectData',
        payload:{json:json,ownProps:ownProps},
      })

      dispatch({
        type: 'ProgressShow',
      }) 
    })
    .catch(err => {
      console.log(err)
      console.log(ownProps)
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
