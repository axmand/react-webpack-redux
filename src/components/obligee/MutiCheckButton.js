import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styleSheet =theme=> ({
  checkbox: {
    color: '#455A64',
  },
 });
// Map Redux state to component props
const mapStateToProps=(state,ownProps)=> {

return {
    
}
}

// Map Redux actions to component props
const mapDispatchToProps=(dispatch)=> {
  return {
//修改命令 修改的字段名 修改字段的值
    onclick: (col,type,tableID) => {

      dispatch({
        type: "Muti_CHANGE_CHECKBOX", 
        payload: {
            type:type,
          col:col,
          tableID:tableID
        }
      });
    }
  }
}


class MuitiCheckCellUI extends React.PureComponent {

    
  onClicked = () => {
    this.props.onclick(this.props.col,this.props.type,this.props.tableIndex);
};

   

 
  render() {
    const { 
     
      value,
     
    } = this.props;
    const classes = this.props.classes;

  
    return (
<div
                
                onClick={this.onClicked}
               >
               {value}
              </div>

    )
  }
}

MuitiCheckCellUI.propTypes = {
}

var MuitiCheckCellUI1 = withStyles(styleSheet)(MuitiCheckCellUI);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MuitiCheckCellUI1)

