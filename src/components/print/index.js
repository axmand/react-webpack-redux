import React, {Component} from 'react'
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Dialog, { DialogContent,DialogContentText } from 'material-ui/Dialog'
import { LinearProgress } from 'material-ui/Progress';


import Table, {  TableBody, TableCell, TableHead, TableRow,} from 'material-ui/Table';

import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

//redux
import { connect } from 'react-redux'
import RootReducer from './../../redux/RootReducer';
import PrintIcon from 'material-ui-icons/Print';
import appConfig from "../../redux/Config"

const styles = {
  listitem: {
    flexDirection: 'column',
    justifyContent: 'center ',
    height:`${window.innerHeight*0.1}px`,
    // paddingTop: "15%",
    // paddingBottom: "15%",
  },
  listItemIcon: {
		width: "60%",
    height: "60%",
		margin: 0,
		color: '#C1C6C9',
	},
  listItemText: {
    fontSize: '1em',
    color: '#ffffff',
    fontFamily: "微软雅黑",
    fontWeight: 'bold',
    padding: '0px',
  },
  paper: {
    width: '100%',
    overflowX: 'auto',
  },
  root:{
    width: '100%',
    marginTop: 30,
  }
}

class PrintModule extends Component {

  render() {
    const { 
      handlePrintShow,handlePrintClose,
      handlePrint1,
      handlePrint2,
      handlePrint3,
      handlePrint4,
      handlePrintTrue,
      handlePrintFalse,
      PrintTrue,
      PrintFalse,
      PrintShow,
      PrintProgress,
      classes
    } = this.props
  
    return (
      <div>
      <ListItem button className={classes.listitem} disableGutters={true} onClick={ handlePrintShow }>
        <ListItemIcon>
          <PrintIcon className={classes.listItemIcon}/>  
        </ListItemIcon>            
        <ListItemText
          disableTypography={true}
          className={classes.listItemText}
          primary="打印签章"
        />
      </ListItem>

      <Dialog
        open={ PrintShow }
        onRequestClose={ handlePrintClose }
      >
        <Paper className={classes.paper}>
        <Table>
        <TableHead style ={{backgroundColor:"#455A64"}}>
          <TableRow>
            <TableCell style={{ fontSize: '1em',color: '#ffffff',fontFamily: "微软雅黑", fontWeight: 'bold',padding: '0px',}}><p>表格名称</p></TableCell>
            <TableCell style={{ fontSize: '1em',color: '#ffffff',fontFamily: "微软雅黑", fontWeight: 'bold',padding: '0px',}}><p>打印</p></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow >
            <TableCell >不动产权籍调查表</TableCell>
            <TableCell><Button onClick = { handlePrint1 }>打印</Button></TableCell>
          </TableRow> 
          <TableRow >
            <TableCell >界址标示表留白</TableCell>
            <TableCell><Button onClick = { handlePrint2 }>打印</Button></TableCell>
          </TableRow> 
          <TableRow >
            <TableCell >界址签章表</TableCell>
            <TableCell><Button onClick = { handlePrint3 }>打印</Button></TableCell>
          </TableRow> 
          <TableRow >
            <TableCell >不动产单元草图</TableCell>
            <TableCell><Button onClick = { handlePrint4 }>打印</Button></TableCell>
          </TableRow>
        </TableBody>
        </Table>
        </Paper>
      </Dialog>      
      
      <Dialog
        open={ PrintTrue }
        onRequestClose={ handlePrintTrue } 
      >
        <DialogContent>
          <DialogContentText>
             打印成功！
          </DialogContentText>
        </DialogContent>
      </Dialog>

       <Dialog
        open={ PrintFalse }
        onRequestClose={ handlePrintFalse } 
      >
        <DialogContent>
          <DialogContentText>
             Error_print_001:打印失败！,请检查是否有尚未填写完的表格
          </DialogContentText>
        </DialogContent>
      </Dialog> 
      
      <Dialog
        open={ PrintProgress }
      >
        <div style={{ width: 320,marginTop: 30}}>
          <LinearProgress />
        </div>`
      </Dialog>

      </div>
    )
  }
}



PrintModule.propTypes = {
  handlePrintClose: PropTypes.func.isRequired,
  handlePrintShow: PropTypes.func.isRequired,
  handlePrintTrue: PropTypes.func.isRequired,
  handlePrintFalse: PropTypes.func.isRequired,
  handlePrint1: PropTypes.func.isRequired,
  handlePrint2: PropTypes.func.isRequired,
  handlePrint3: PropTypes.func.isRequired,
  handlePrint4: PropTypes.func.isRequired,
  PrintShow: PropTypes.bool.isRequired,
  PrintTrue: PropTypes.bool.isRequired,
  PrintFalse: PropTypes.bool.isRequired,
  PrintProgress: PropTypes.bool.isRequired,
};

//声明State与Action
const mapStateToProps = (state, ownProps) => {

  return {
    PrintShow: state.PrintReduce.PrintShow,
    PrintTrue: state.PrintReduce.PrintTrue,
    PrintFalse:state.PrintReduce.PrintFalse,
    PrintProgress: state.PrintReduce.PrintProgress,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handlePrintShow: () => {
      if(ownProps.sketchHaveSaved){
        dispatch({
          type: 'MAP_SKETCH_VIEW_HIDE',
        });
      }
      dispatch({
        type: 'handlePrintShow',
        payload: {
          Loaded:ownProps.PrintData.Loaded,
          sketchHaveSaved:ownProps.sketchHaveSaved
        }
      });
    },

    handlePrintClose: () => {
      dispatch({
        type: 'handlePrintClose',
      })
    },

    handlePrint1: () => {
      dispatch({
        type: 'ProgressShow',
      });
     //调用接口打印不动产权籍调查表
      fetch(appConfig.fileServiceRootPath + '/project/printforms')
        .then(response => response.json())
        .then( json => {
          dispatch({
            type: 'handlePrint1',
            payload: json,
          })
          
          console.log(json)
          
          dispatch({
            type: 'ProgressShow',
          });
        })
        .catch(e => console.log("Oops, error", e))
    },
    
    handlePrint2: () => {
      dispatch({
        type: 'ProgressShow',
      });
      //调用接口打印界址标识表留白
      fetch(appConfig.fileServiceRootPath + '/project/printforms2')
        .then(response => response.json())
        .then( json => {
          dispatch({
            type: 'handlePrint2',
            payload: json,
          })

          console.log(json)
          dispatch({
            type: 'ProgressShow',
          });
        })
        .catch(e => console.log("Oops, error", e))
    },
    
    handlePrint3: () => {
      dispatch({
        type: 'ProgressShow',
      });
      //调用接口打印界址签章表
      fetch(appConfig.fileServiceRootPath + '/project/printjzqzb')
        .then(response => response.json())
        .then( json => {
          dispatch({
            type: 'handlePrint3',
            payload: json,
          })
          
          console.log(json)
          
          dispatch({
            type: 'ProgressShow',
          });
        })
        .catch(e => console.log("Oops, error", e))
    },
    
    handlePrint4: () => {
      dispatch({
        type: 'ProgressShow',
      });
      //调用接口打印不动产单元草图
      fetch(appConfig.fileServiceRootPath + '/project/printpicture')
        .then(response => response.json())
        .then( json => {
          dispatch({
            type: 'handlePrint4',
            payload: json,
          })
          console.log(json)
          
          dispatch({
            type: 'ProgressShow',
          });
        })
        .catch(e => console.log("Oops, error", e))
    },

    handlePrintTrue: () => {
      dispatch({
        type: 'handlePrintTrue',
      })
    },

    handlePrintFalse: () => {
      dispatch({
        type: 'handlePrintFalse',
      })
    },
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { name: 'PrintModule' })(PrintModule));
//Reducer 
const PrintReduce = (
  state = {
    PrintShow: false,
    PrintTrue: false,
    PrintFalse: false,
    PrintProgress: false,
  }, action) => {
  
  let newState = JSON.parse(JSON.stringify(state))
  
  if (action.type === "handlePrintShow") {
    if(action.payload.Loaded === false){
      alert("Error_import_002:请选择项目！");
    } else{ 
        newState.PrintShow =  !state.PrintShow 
    }
    return { ...state, ...newState }; 
  }

  if (action.type === "handlePrintClose") {
    const PrintShow = { PrintShow: !state.PrintShow }
    return Object.assign({}, state, { ...PrintShow })
  }
  
  if (action.type === "handlePrintTrue") {
    const PrintTrue = { PrintTrue: !state.PrintTrue }
    return Object.assign({}, state, { ...PrintTrue })
  }
    
  if (action.type === "handlePrintFalse") {
    const PrintFalse = { PrintFalse: !state.PrintFalse }
    return Object.assign({}, state, { ...PrintFalse })
  }

  if (action.type === "ProgressShow") {
    const PrintProgress = { PrintProgress: !state.PrintProgress }
    return Object.assign({}, state, { ...PrintProgress })
  }
  
  if (action.type === "handlePrint1") {
    let sta1 = JSON.parse(action.payload.status); 
    if(sta1 === 200)
      {
        newState.PrintTrue = !state.PrintTrue
      }
    else
      {newState.PrintFalse = !state.PrintFalse}
    newState.PrintShow = !state.PrintShow;
    return { ...state, ...newState }; 
  }
  
  if (action.type === "handlePrint2") {
    let sta2 = JSON.parse(action.payload.status); 
    if(sta2 === 200)
      {newState.PrintTrue = !state.PrintTrue}
    else
      {newState.PrintFalse = !state.PrintFalse}
    newState.PrintShow = !state.PrintShow;
    return { ...state, ...newState }; 
  }
    
  if (action.type === "handlePrint3") {
    let sta3 = JSON.parse(action.payload.status); 
    if(sta3 === 200)
      {newState.PrintTrue = !state.PrintTrue}
    else
      {newState.PrintFalse = !state.PrintFalse}
    newState.PrintShow = !state.PrintShow;
    return { ...state, ...newState }; 
  }
    
  if (action.type === "handlePrint4") {
    let sta4 = JSON.parse(action.payload.status); 
    if(sta4 === 200)
      {newState.PrintTrue = !state.PrintTrue}
    else
      {newState.PrintFalse = !state.PrintFalse}
    newState.PrintShow = !state.PrintShow;
    return { ...state, ...newState }; 
  }
 
  else
    return state
}

RootReducer.merge(PrintReduce);