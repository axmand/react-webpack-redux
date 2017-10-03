import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import List, { ListItem, ListItemText } from 'material-ui/List'
import Tabs, { Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';


const styleSheet = {
  
  
   
   button: {
     width: '20px',
     height: '20px',

   },
 };
// Map Redux state to component props
const mapStateToProps=(state,ownProps)=> {

return {
    value:state.ObContentReducer[ownProps.tableIndex][ownProps.type][ownProps.row]
}
}

// Map Redux actions to component props
const mapDispatchToProps=(dispatch)=> {
  return {
//修改命令 修改的字段名 修改字段的值
    onclick: (row,col,type,tableID) => {

      dispatch({
        type: "changetest", 
        payload: {
            type:type,
          row:row,
          col:col,
          tableID:tableID

        }
      });
    }
  }
}


class CheckCellUI extends React.PureComponent {

    
  onClicked = () => {
    this.props.onclick(this.props.row,this.props.col,this.props.type,this.props.tableIndex);
};

    valueShow = (value) => {
       if(value==this.props.col)
       return "√";
       else
       return " ";
    }

 
  render() {
    const { row,col,onclick,value,type,tableIndex } = this.props;
    const classes = this.props.classes;

  
    return (
      // <button width="100px" height="100px" onClick={this.onClicked}>{this.valueShow(value)}

      // </button>

<Button
onClick={this.onClicked}
      className={classes.button}
    >
{this.valueShow(value)}
</Button>
    )
  }
}

CheckCellUI.propTypes = {
}

var CheckCellUI1 = withStyles(styleSheet)(CheckCellUI);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckCellUI1)

