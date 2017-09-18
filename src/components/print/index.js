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
  flex: {
    flex: 1,
  },
  dialog: {
    width: '1650px',
    height: '1150px',
    marginTop: 20,
    marginLeft: 200
  },
  AppBar: {
    root: {
      marginTop: 30,
      width: '100%',
    },
    position: 'relative'
  },
  paper: {
    width: '100%',
    overflowX: 'auto',
  },
  tableText: {
    fontSize: '20px',
    padding: '0px',
    border: '0px' 
  },
}

class PrintModule extends Component {

  render() {
    const { handlePrintClose,
      handlePrintShow,
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
            <TableCell >权籍调查表</TableCell>
            <TableCell><Button>打印</Button></TableCell>
          </TableRow>
          <TableRow >
            <TableCell >界址标示表</TableCell>                         
            <TableCell><Button>打印</Button></TableCell>        
          </TableRow>
          <TableRow >
            <TableCell >界址签章表</TableCell>
            <TableCell><Button>打印</Button></TableCell>
          </TableRow>
          <TableRow >
            <TableCell >界址说明表</TableCell>
            <TableCell><Button>打印</Button></TableCell>
          </TableRow>
          <TableRow >
            <TableCell >调查审核表</TableCell>
            <TableCell><Button>打印</Button></TableCell>
          </TableRow>
          <TableRow >
            <TableCell>共有宗地面积分摊表</TableCell>
            <TableCell><Button>打印</Button></TableCell>  
          </TableRow>
          <TableRow >
            <TableCell>草图</TableCell>
            <TableCell><Button>打印</Button></TableCell>  
          </TableRow>
          <TableRow >
            <TableCell>专题图</TableCell>
            <TableCell><Button>打印</Button></TableCell>  
          </TableRow>
        </TableBody>
        </Table>
        </Paper>
      </Dialog>
      </div>
    )
  }
}

PrintModule.propTypes = {
  handlePrintClose: PropTypes.func.isRequired,
  handlePrintShow: PropTypes.func.isRequired,
  PrintShow: PropTypes.bool.isRequired,
};

//声明State与Action
const mapStateToProps = (state, ownProps) => {

  return {
    PrintShow: state.PrintReduce.PrintShow,
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { name: 'PrintModule' })(PrintModule));
//Reducer 
const PrintReduce = (
  state = {
    PrintShow: false,
  }, action) => {

  if (action.type === "handlePrintShow") {
    const PrintShow = { PrintShow: !state.PrintShow }
    return Object.assign({}, state, { ...PrintShow })
  }

  if (action.type === "handlePrintClose") {
    const PrintShow = { PrintShow: !state.PrintShow }
    return Object.assign({}, state, { ...PrintShow })
  }

  else
    return state
}

RootReducer.merge(PrintReduce);