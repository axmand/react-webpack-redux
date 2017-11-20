import React, { Component } from "react";
import { connect } from "react-redux";
import RootReducer from './../../redux/RootReducer';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog from "material-ui/Dialog";
import Slide from 'material-ui/transitions/Slide';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import PhotoCameraIcon from 'material-ui-icons/PhotoCamera';
import projectData from "./../../redux/RootData";
import appConfig from "../../redux/Config";

const styles = {
  toolBar:{
    padding:0,
    minHeight:'50px',
    background:'#455A64',
  },
  title: {
    flex: 1,
    fontSize:'1.5em',
    fontWeight: 'bold',
    textAlign:'center',
    color:'#fff',
  },
  headcell:{
    padding:0,
    height:'30px',
  },
  headtext:{
    fontSize:'1.2em',
    textAlign:'center',
    width:'100%',    
    fontWeight:'600',
  },
  tablecell:{
    fontSize:'1em',
    fontWeight:'400',
    textAlign:'center',
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class JZDList extends Component {

  render() {
    const { classes,showXCZJDialog,onJZDListClose,jzdTableData,onjzdXCZJClick} = this.props;
    return (
    <Dialog
      fullScreen
      open={showXCZJDialog}
      onRequestClose={onJZDListClose}
      transition={Transition}
    >
          <Toolbar className={classes.toolBar}>
            <Typography type="title" color="inherit" className={classes.title}>
              界址点现场指界表
            </Typography>            
            <IconButton color="contrast" aria-label="Close" onClick={onJZDListClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar> 
          <div style={{overflowX: 'auto', overflowY: 'auto'}}>
          <Table>
            <TableHead>
              <TableRow style={{height:'40px'}}>
                <TableCell className={classes.headcell} style={{width:`${window.innerWidth * 0.2}px`}}>            
                  <Typography className={classes.headtext} >点号</Typography>      
                </TableCell>
                <TableCell className={classes.headcell} style={{width:`${window.innerWidth * 0.4}px`}}>
                  <Typography className={classes.headtext} >坐标</Typography>  
                </TableCell>
                <TableCell className={classes.headcell} style={{width:`${window.innerWidth * 0.4}px`}}>
                  <Typography className={classes.headtext} >拍照取证</Typography>  
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
            {jzdTableData.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell className={classes.tablecell}>{n.id}</TableCell>
                  <TableCell className={classes.tablecell}>{n.coordinates}</TableCell>
                  <TableCell 
                    className={classes.tablecell}
                    onClick={()=>onjzdXCZJClick(n.id)}> 
                    <PhotoCameraIcon style={{color:'#CCCCCC'}}/>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        </div>
      </Dialog>
    );
  }
}

JZDList.propTypes = {
  classes: PropTypes.object.isRequired,
  showXCZJDialog:PropTypes.bool.isRequired,
};

const mapStateToProps = state =>{
  const JZDListState = state.JZDListReduce;
  return{
    showXCZJDialog:JZDListState.showXCZJDialog,
    jzdTableData:JZDListState.jzdTableData,
  }
}

const mapDispatchToProps = (dispatch,ownProps)=> {

  return{
    onJZDListClose:()=>{
      dispatch({
        type:'JZDListClose'
      })
    },
    onjzdXCZJClick:poi_id=>{
      dispatch({
        type:'jzdXCZJClick',
        payload:{command:poi_id}
      });
      
      dispatch({
        type:'JZDListClose'
      });
      
      dispatch({
        type: "saveClick",
      }); 

      dispatch({
          type: 'ProgressShow',
      });

      fetch(appConfig.fileServiceRootPath + '//project/photolist' )
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
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { name: "JZDList" })(JZDList));

//reducer
const JZDListReduce =( state = {
        showXCZJDialog:false,
        alertXCZJ:false,
        jzdTableData:[]
    },action)=>{
        switch(action.type){
          //打开界址点列表，将界址点的id及坐标等相关信息依次填入表中
            case 'XCZJclick':
                const jzdData=JSON.parse(projectData.ProjectItem.L.jzdJSONData);
                console.log(jzdData)
                let jzdpoi=jzdData.geometries;
                let tableRow;
                let tableData=[];
                for(let i=0;i<jzdpoi.length;i++){
                  tableRow={
                    id: jzdpoi[i].feature.id,
                    coordinates:jzdpoi[i].coordinates
                  };
                  tableData.push(tableRow)
                }
                console.log(tableData)

                const XCZJ1={
                    showXCZJDialog:true,
                    jzdTableData:tableData
                }
                return Object.assign({},state,{... XCZJ1});
            //点击拍照按钮后读取所选的界址点点号并打开摄像头进行拍照
            case 'jzdXCZJClick':
                projectData.PoiId =  action.payload.command;
                return {...state}
            //关闭界址点列表   
            case 'JZDListClose':
                const jzdListClose={showXCZJDialog:false}
                return Object.assign({}, state, { ...jzdListClose })        
            default:return {...state}
        }
    }
    RootReducer.merge(JZDListReduce);