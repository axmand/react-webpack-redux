import React, {Component} from 'react'
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Dialog, { DialogContent } from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Table, {  TableBody, TableCell, TableHead, TableRow,} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
//图标
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';
import FontAwesome from 'react-fontawesome'
// import FontAwesome from 'react-fontawesome'
import FileUploadIcon from 'material-ui-icons/FileUpload';
//redux
import { connect } from 'react-redux'
import RootReducer from './../../redux/RootReducer';

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
    marginTop: 20,
    overflowX: 'auto',
  },
}

let id = 0;
function createData(name, byte) {
  id += 1;
  return { id, name, byte };
}

const data = [
  createData('项目一', '159'),
  createData('项目二', '237'),

];

class OutputModule extends Component {

  render() {
    const { handleOutputClose,
      handleOutputShow,
      OutputShow,
      classes
    } = this.props
  
    return (
    <div>
      <ListItem button className={classes.listitem} disableGutters={true} onClick={ handleOutputShow }>
        <ListItemIcon>
          <FileUploadIcon className={classes.listItemIcon}/>
        </ListItemIcon>            
        <ListItemText
          disableTypography={true}
          className={classes.listItemText}
          primary="数据导出"
        />
      </ListItem>

      <Dialog
        fullScreen
        className={classes.dialog}
        open={OutputShow}
        onRequestClose={handleOutputClose}
        transition={<Slide direction="up" />}
      >
        <AppBar position="static">
          <Toolbar>
             <Typography type="title" color="inherit" className={classes.flex}>
              数据导出
                </Typography>
            <IconButton color="contrast" onClick={handleOutputClose} aria-label="Delete">
              <ClearIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
       
        <DialogContent style={{ overflowY: 'auto' }}>
        <Paper className={classes.paper}>
          <Table>
          <TableHead>
            <TableRow>
              <TableCell checkbox>
                <Checkbox/>
              </TableCell>
              <TableCell>文件夹名称</TableCell>
              <TableCell >文件大小</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell checkbox>
                    <Checkbox/>
                  </TableCell>
                <TableCell>{n.name}</TableCell>
                <TableCell>{n.byte}</TableCell>
              </TableRow>
            );
          })}
          </TableBody>
        </Table>
        </Paper>
        </DialogContent>
      </Dialog>
    </div>
    )
  }
}

OutputModule.propTypes = {
  handleOutputClose: PropTypes.func.isRequired,
  handleOutputShow: PropTypes.func.isRequired,
  OutputShow: PropTypes.bool.isRequired,
};

//声明State与Action
const mapStateToProps = (state, ownProps) => {

  return {
    OutputShow: state.OutputReduce.OutputShow,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleOutputShow: () => {
      dispatch({
        type: 'handleOutputShow',
      })
    },

    handleOutputClose: () => {
      dispatch({
        type: 'handleOutputClose',
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { name: 'OutputModule' })(OutputModule));
//Reducer 
const OutputReduce = (
  state = {
    OutputShow: false,
  }, action) => {

  if (action.type === "handleOutputShow") {
    const OutputShow = { OutputShow: !state.OutputShow }
    return Object.assign({}, state, { ...OutputShow })
  }

  if (action.type === "handleOutputClose") {
    const OutputShow = { OutputShow: !state.OutputShow }
    return Object.assign({}, state, { ...OutputShow })
  }

  else
    return state
}

RootReducer.merge(OutputReduce);