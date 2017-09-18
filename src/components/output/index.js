import React, {Component} from 'react'
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Dialog,{ DialogActions, DialogContent, DialogContentText, DialogTitle,} from 'material-ui/Dialog'
import Button from 'material-ui/Button';
//图标
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
    overflowX: 'auto',
  },
  tableText: {
    fontSize: '20px',
    padding: '0px',
    border: '0px' 
  },
}

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
        open={OutputShow}
        onRequestClose={handleOutputClose}
      >
      <DialogTitle>{"数据导出"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            此操作将保存修改的数据，是否确认导出数据？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOutputClose} color="primary">
            确认
          </Button>
          <Button onClick={handleOutputClose} color="primary">
            取消
          </Button>
        </DialogActions>
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