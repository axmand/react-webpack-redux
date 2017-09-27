import React, {Component} from 'react'
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Dialog from 'material-ui/Dialog'


import Table, {  TableBody, TableCell, TableHead, TableRow,} from 'material-ui/Table';

import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

//redux
import { connect } from 'react-redux'
import RootReducer from './../../redux/RootReducer';
import PrintIcon from 'material-ui-icons/Print';
import projectData from './../../redux/RootData';

const styles = {
  listitem: {
    flexDirection: 'column',
    justifyContent: 'center ',
    paddingTop: "15%",
    paddingBottom: "15%",
  },
  listItemIcon: {
		width: "50%",
    height: "50%",
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
}

class PrintModule extends Component {

  render() {
    const { 
      handlePrintShow,handlePrintClose,
      handlePrint1,handlePrint2,handlePrint3,handlePrint4,handlePrint5,handlePrint6,handlePrint7,handlePrint8,
      handlePrintTrue,handlePrintFalse,
      PrintTrue,
      PrintFalse,
      PrintShow,
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
        <TableHead>
          <TableRow>
            <TableCell><p>表格名称</p></TableCell>
            <TableCell><p>打印</p></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow >
            <TableCell >宗地基本信息表</TableCell>
            <TableCell><Button onClick = { handlePrint1 }>打印</Button></TableCell>
          </TableRow>
          <TableRow >
            <TableCell >界址标示表</TableCell>                         
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
          <TableRow >
            <TableCell >界址说明表</TableCell>
            <TableCell><Button onClick = { handlePrint5 }>打印</Button></TableCell>
          </TableRow>
          <TableRow >
            <TableCell>调查审核表</TableCell>
            <TableCell><Button onClick = { handlePrint6 }>打印</Button></TableCell>  
          </TableRow>
          <TableRow >
            <TableCell>共有宗地面积分摊表</TableCell>
            <TableCell><Button onClick = { handlePrint7 }>打印</Button></TableCell>  
          </TableRow>
          <TableRow >
            <TableCell>专题图</TableCell>
            <TableCell><Button onClick = { handlePrint8 }>打印</Button></TableCell>  
          </TableRow>
        </TableBody>
        </Table>
        </Paper>
      </Dialog>      
      
      <Dialog
        open={ PrintTrue }
        onRequestClose={ handlePrintTrue } 
      >
      打印成功
      </Dialog>

      <Dialog
        open={ PrintFalse }
        onRequestClose={ handlePrintFalse } 
      >
      打印失败！
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
  handlePrint5: PropTypes.func.isRequired,
  handlePrint6: PropTypes.func.isRequired,
  handlePrint7: PropTypes.func.isRequired,
  handlePrint8: PropTypes.func.isRequired,
  PrintShow: PropTypes.bool.isRequired,
  PrintTrue: PropTypes.bool.isRequired,
  PrintFalse: PropTypes.bool.isRequired,
};

//声明State与Action
const mapStateToProps = (state, ownProps) => {

  return {
    PrintShow: state.PrintReduce.PrintShow,
    PrintTrue: state.PrintReduce.PrintTrue,
    PrintFalse:state.PrintReduce.PrintFalse,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handlePrintShow: () => {
      dispatch({
        type: 'handlePrintShow',
      })
    },

    handlePrintClose: () => {
      dispatch({
        type: 'handlePrintClose',
      })
    },

    handlePrint1: () => {
      fetch('http://172.16.102.90:1338/project/print/1')
        .then(response => response.json())
        .then( json => {
          dispatch({
            type: 'handlePrint1',
            payload: json,
          })
          console.log(json)
        })
        .catch(e => console.log("Oops, error", e))
    },
    
    handlePrint2: () => {
      fetch('http://172.16.102.90:1338/project/print/2')
        .then(response => response.json())
        .then( json => {
          dispatch({
            type: 'handlePrint2',
            payload: json,
          })
          console.log(json)
        })
        .catch(e => console.log("Oops, error", e))
    },
    
    handlePrint3: () => {
      fetch('http://172.16.102.90:1338/project/print/3')
        .then(response => response.json())
        .then( json => {
          dispatch({
            type: 'handlePrint3',
            payload: json,
          })
          console.log(json)
        })
        .catch(e => console.log("Oops, error", e))
    },
    
    handlePrint4: () => {
      fetch('http://172.16.102.90:1338/project/print/4')
        .then(response => response.json())
        .then( json => {
          dispatch({
            type: 'handlePrint4',
            payload: json,
          })
          console.log(json)
        })
        .catch(e => console.log("Oops, error", e))
    },
    
    handlePrint5: () => {
      fetch('http://172.16.102.90:1338/project/print/5')
        .then(response => response.json())
        .then( json => {
          dispatch({
            type: 'handlePrint5',
            payload: json,
          })
          console.log(json)
        })
        .catch(e => console.log("Oops, error", e))
    },
    
    handlePrint6: () => {
      fetch('http://172.16.102.90:1338/project/print/6')
        .then(response => response.json())
        .then( json => {
          dispatch({
            type: 'handlePrint6',
            payload: json,
          })
          console.log(json)
        })
        .catch(e => console.log("Oops, error", e))
    },
    
    handlePrint7: () => {
      fetch('http://172.16.102.90:1338/project/print/7')
        .then(response => response.json())
        .then( json => {
          dispatch({
            type: 'handlePrint7',
            payload: json,
          })
          console.log(json)
        })
        .catch(e => console.log("Oops, error", e))
    },
    
    handlePrint8: () => {
      fetch('http://172.16.102.90:1338/project/print/8')
        .then(response => response.json())
        .then( json => {
          dispatch({
            type: 'handlePrint8',
            payload: json,
          })
          console.log(json)
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
  }, action) => {
  
  let newState = JSON.parse(JSON.stringify(state))
  
  if (action.type === "handlePrintShow") {
    if(projectData.Loaded === false)
      alert("请选择项目！");
    else
      { newState.PrintShow =  !state.PrintShow }
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
  
  if (action.type === "handlePrint1") {
    let list1 = JSON.parse(action.payload.data); 
    if(list1 === 'true')
      {newState.PrintTrue = !state.PrintTrue}
    else
      {newState.PrintFalse = !state.PrintFalse}
    newState.PrintShow = !state.PrintShow;
    return { ...state, ...newState }; 
  }
  
  if (action.type === "handlePrint2") {
    let list2 = JSON.parse(action.payload.data); 
    if(list2 === 'true')
      {newState.PrintTrue = !state.PrintTrue}
    else
      {newState.PrintFalse = !state.PrintFalse}
    newState.PrintShow = !state.PrintShow;
    return { ...state, ...newState }; 
  }
    
  if (action.type === "handlePrint3") {
    let list3 = JSON.parse(action.payload.data); 
    if(list3 === 'true')
      {newState.PrintTrue = !state.PrintTrue}
    else
      {newState.PrintFalse = !state.PrintFalse}
    newState.PrintShow = !state.PrintShow;
    return { ...state, ...newState }; 
  }
    
  if (action.type === "handlePrint4") {
    let list4 = JSON.parse(action.payload.data); 
    if(list4 === 'true')
      {newState.PrintTrue = !state.PrintTrue}
    else
      {newState.PrintFalse = !state.PrintFalse}
    newState.PrintShow = !state.PrintShow;
    return { ...state, ...newState }; 
  }
    
  if (action.type === "handlePrint5") {
    let list5 = JSON.parse(action.payload.data); 
    if(list5 === 'true')
      {newState.PrintTrue = !state.PrintTrue}
    else
      {newState.PrintFalse = !state.PrintFalse}
    newState.PrintShow = !state.PrintShow;
    return { ...state, ...newState }; 
  }
    
  if (action.type === "handlePrint6") {
    let list6 = JSON.parse(action.payload.data); 
    if(list6 === 'true')
      {newState.PrintTrue = !state.PrintTrue}
    else
      {newState.PrintFalse = !state.PrintFalse}
    newState.PrintShow = !state.PrintShow;
    return { ...state, ...newState }; 
  }

  if (action.type === "handlePrint7") {
    let list7 = JSON.parse(action.payload.data); 
    if(list7 === 'true')
      {newState.PrintTrue = !state.PrintTrue}
    else
      {newState.PrintFalse = !state.PrintFalse}
    newState.PrintShow = !state.PrintShow;
    return { ...state, ...newState }; 
  }

  if (action.type === "handlePrint8") {
    let list8 = JSON.parse(action.payload.data); 
    if(list8 === 'true')
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