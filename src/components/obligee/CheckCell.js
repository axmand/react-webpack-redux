import React from 'react'

import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles';
import Checkbox from 'material-ui/Checkbox';


const styleSheet =theme=> ({
  checkbox: {
    color: '#455A64',
  },
 });
// Map Redux state to component props
const mapStateToProps=(state,ownProps)=> {
//绑定字段到state
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
        type: "CHANGE_CHECKBOX", 
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
//控制显示隐藏
    valueShow = (value) => {
       return  value === this.props.col;
       

      //  if(value==this.props.col)
      //  return "√";
      //  else
      //  return " ";
    }

 
  render() {
    const { 
      // row,
      // col,
      // onclick,
      value,
      // type,
      // tableIndex 
    } = this.props;
    const classes = this.props.classes;

  
    return (
<Checkbox
                checked={this.valueShow(value)}
                onChange={this.onClicked}
               className={classes.checkbox}
              />

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

