import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RootReducer from "./../../redux/RootReducer";
import { withStyles } from "material-ui/styles";
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import Button from "material-ui/Button";
import Grid from 'material-ui/Grid';
import Input from 'material-ui/Input';
import Delete from "material-ui-icons/Delete"; //展点
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText
  } from "material-ui/Dialog";

const styles = theme => ({
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
      tablecell_id:{
        width:'20%',
        padding:0,
        textAlign:'center'
      },
      tablecell_coor:{
        width:'40%',
        padding:0,
        textAlign:'center'
      },
      inputInfo:{
          flex:1,
          fontSize:'1em',
          padding: '15px',
          textAlign: 'left',
          fontWeight:'600'
      },
      input:{
          height:'36px',
          width:'100%',
          border:0,
          textAlign:'center'
      },
      alertInfo:{
        flex:1,
        fontSize:'1em',
        padding: '15px',
        textAlign: 'left',
        fontWeight:'600',
        color:"#f00",
      },
});

class TotalStationCoorTransform extends Component{
    render(){    

        const classes = this.props.classes;

        const {
            plotFromFile,
            totalStationData,
            controlPoiArr,
            doCoorTransformClick,
            closeCoorTransform,
            handleControlPoiInput,
            totalStationAlertContent,
        }=this.props;
        console.log(this.props)
        return(
            <Drawer
                type="persistent"
                classes={{
                paper: classes.coordinateTransformPaper,
            }}
            anchor= 'left'
            open={plotFromFile}
            >
                <Toolbar className={classes.toolBar}>
                    <Typography className={classes.title}>
                        全站仪数据坐标转换
                    </Typography>
                </Toolbar> 
                <Grid container spacing={0} className={classes.totalStationGrid}>
                    <Grid item xs={6} style={{overflowX: 'auto', overflowY: 'auto'}}>
                    <Table>
                        <TableHead>
                            <TableRow style={{height:'36px'}}>
                                <TableCell className={classes.tablecell_id} >            
                                <Typography className={classes.headtext} >点号</Typography>      
                                </TableCell>
                                <TableCell className={classes.tablecell_coor}>
                                <Typography className={classes.headtext} >X坐标</Typography>  
                                </TableCell>
                                <TableCell className={classes.tablecell_coor}>
                                <Typography className={classes.headtext} >Y坐标</Typography>  
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                        {totalStationData.map(n => {
                            return (
                            <TableRow key={n.id} style={{height:'36px'}}>
                                {/*点号 */}
                                <TableCell className={classes.tablecell_id}>{n.id}</TableCell>
                                {/* X坐标 */}
                                <TableCell className={classes.tablecell_coor} >
                                {n.coordinates.x}
                                </TableCell>
                                {/* Y坐标 */}
                                <TableCell className={classes.tablecell_coor}>
                                {n.coordinates.y}
                                </TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className={classes.inputInfo}>
                            请输入控制点坐标：
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableRow style={{height:'36px'}}>
                                    <TableCell className={classes.tablecell_id}>            
                                    <Typography className={classes.headtext} >点号</Typography>      
                                    </TableCell>
                                    <TableCell className={classes.tablecell_coor}>
                                    <Typography className={classes.headtext} >X坐标</Typography>  
                                    </TableCell>
                                    <TableCell className={classes.tablecell_coor}>
                                    <Typography className={classes.headtext} >Y坐标</Typography>  
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {controlPoiArr.map(n => {
                                    let id_poiNum=n.index+'poiNum';
                                    let id_xCoor=n.index+'xCoor';
                                    let id_yCoor=n.index+'yCoor';
                                    return (
                                    <TableRow key={n.index} style={{height:'36px'}}>
                                        {/*点号 */}
                                        <TableCell className={classes.tablecell_id}>
                                        <input id={id_poiNum} className={classes.input}  onChange={handleControlPoiInput}/>
                                        </TableCell>
                                        {/* X坐标 */}
                                        <TableCell className={classes.tablecell_coor}>
                                        <input  id={id_xCoor} className={classes.input}  onChange={handleControlPoiInput}/>
                                        </TableCell>
                                        {/* Y坐标 */}
                                        <TableCell  className={classes.tablecell_coor} >
                                        <input id={id_yCoor} className={classes.input}  onChange={handleControlPoiInput}/>
                                        </TableCell>
                                    </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>              
                        <Button className={classes.coorTranBtn} onClick={doCoorTransformClick} >
                        确定
                        </Button>
                        <Button className={classes.coorTranBtn} onClick={closeCoorTransform}>
                        关闭
                        </Button>
                        <Typography className={classes.alertInfo} >
                        {totalStationAlertContent}
                        </Typography>
                    </Grid>
                </Grid>
             </Drawer>
        );
    }
}

TotalStationCoorTransform.protoTypes={
    classes:PropTypes.object.isRequired,
    plotFromFile:PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired
}
const mapStateToProps = state => {
    const sketchState = state.sketchReduce;
  
    return {
      plotFromFile:sketchState.plotFromFile,
      totalStationData:sketchState.totalStationData,
      controlPoiArr:sketchState.controlPoiArr,
      controlPoiNum:sketchState.controlPoiNum,
      totalStationAlertContent:sketchState.totalStationAlertContent
    };
  };

const mapDispatchToProps = (dispatch,ownProps) => {
    return{
        //进行坐标转换
        doCoorTransformClick:()=>{
            //判断控制点信息是否填写完成
            console.log(ownProps.controlPoiArr)
            
            let controlPoiArrIsComplete=false;
            let poiNumCorrect=false;

            for(let i=0;i<ownProps.controlPoiArr.length;i++){
                if(ownProps.controlPoiArr[i].poi_id&&ownProps.controlPoiArr[i].coor_x&&ownProps.controlPoiArr[i].coor_y){
                    controlPoiArrIsComplete=true;
                }else{
                    controlPoiArrIsComplete=false;
                    break;
                }
            }

            if(controlPoiArrIsComplete){
                let poi_id_arr=[];
                for(let j=0;j<ownProps.totalStationData.length;j++){
                    poi_id_arr.push(ownProps.totalStationData[j].id);
                }
                //判断控制点号是否正确无误
                if(poi_id_arr.indexOf(ownProps.controlPoiArr[0].poi_id) > -1&&poi_id_arr.indexOf(ownProps.controlPoiArr[1].poi_id) > -1&&ownProps.controlPoiArr[0].poi_id!=ownProps.controlPoiArr[1].poi_id){
                    poiNumCorrect=true;
                }

                if(poiNumCorrect){
                     dispatch({
                        type:"doCoorTransform",
                        payload:{
                            controlPoiarr:ownProps.controlPoiArr,
                            alertContent:""
                        }
                    })
                }else{
                    dispatch({
                        type:"showControlPoiAlert",
                        payload:{
                            alertContent:"请输入正确的控制点号！"
                        }
                    })
                }
            }else{
                dispatch({
                    type:"showControlPoiAlert",
                    payload:{
                        alertContent:"请输入完整的坐标信息！"
                    }
                })
            }
        },        

        handleControlPoiInput:event=>{
            dispatch({
                type:'handleControlPoiInput',
                payload:{
                    targetID:event.target.id,
                    targetValue:event.target.value
                }
            })
        },
        //关闭全站仪坐标转换界面
        closeCoorTransform:()=>{
            dispatch({
            type:"closeCoorTransform"
            })
        },

    }

};

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles, { name: "TotalStationCoorTransform" })(TotalStationCoorTransform)
  );