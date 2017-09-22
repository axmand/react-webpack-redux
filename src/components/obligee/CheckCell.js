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
function mapStateToProps(state,ownProps) {

return {
    value:state[ownProps.type][ownProps.row]
}
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
//修改命令 修改的字段名 修改字段的值
    onclick: (row,col,type) => {

      dispatch({
        type: "changetest", 
        payload: {
            type:type,
          row:row,
          col:col

        }
      });
    }
  }
}


class CheckCellUI extends React.PureComponent {

    
  onClicked = () => {
    this.props.onclick(this.props.row,this.props.col,this.props.type);
};

    valueShow = (value) => {
       if(value==this.props.col)
       return "√";
       else
       return " ";
    }

 
  render() {
    const { row,col,onclick,value,type } = this.props;
    

  
    return (
      <button width="100px" height="100px" onClick={this.onClicked}>{this.valueShow(value)}

      </button>
    )
  }
}

CheckCellUI.propTypes = {
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckCellUI)

