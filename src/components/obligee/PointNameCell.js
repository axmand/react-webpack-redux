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


// Map Redux state to component props
const mapStateToProps=(state,ownProps)=> {

  var ttt=state.ObContentReducer[ownProps.tableIndex][ownProps.type][ownProps.row];
return {
  
    value:state.ObContentReducer[ownProps.tableIndex][ownProps.type][ownProps.row]
}
}

// Map Redux actions to component props
const mapDispatchToProps=(dispatch) =>{
  return {
//修改命令 修改的字段名 修改字段的值
    onclick: (name) => {

      dispatch({
        type: "ZoomToPoint", 
        payload: {
           
         pointName:name

        }
      });
    }
  }
}


class PointNameCellUI extends React.PureComponent {

    
  onClicked = () => {
      var sss=this.props.name;
    this.props.onclick(sss);
};

    

 
  render() {
    const { name,type,row,tableIndex } = this.props;
    

  
    return (
      <button width="100px" height="100px" onClick={this.onClicked}>{this.props.name}

      </button>
    )
  }
}

PointNameCellUI.propTypes = {
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PointNameCellUI)
