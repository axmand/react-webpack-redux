import React from 'react'
import PropTypes from 'prop-types'
// import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Dialog, {
  DialogActions,
  DialogContent,
  // DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
// import Input from 'material-ui/Input';
import { ListItem } from 'material-ui/List'
// import Tabs, { Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import { 
  // FormControl, 
  FormHelperText 
} from 'material-ui/Form';

// Map Redux state to component props
// function mapStateToProps(state,ownProps) {
//   const key =ownProps.name;
//   const index=ownProps.index;
//   let obj = {};
//   obj['key2'] = key;
//   // obj[key] = state.value[key];
//   var ttt=state.ObContentReducer[tableIndex][key][index];
//   obj[key][index] =ttt;
  
//   return obj;
// }
const mapStateToProps=(state,ownProps)=> {

  
  
  var valueData="test";

 // console.log(state.ObContentReducer[ownProps.tableIndex]);
  // if(state.ObContentReducer[ownProps.tableIndex][ownProps.name]!=undefined)
  // if(state.ObContentReducer[ownProps.tableIndex][ownProps.name][ownProps.index]!=undefined)

 valueData=state.ObContentReducer[ownProps.tableIndex][ownProps.name][ownProps.index];
 
  return {
    

      value:valueData
  }
  }
// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
//修改命令 修改的字段名 修改字段的值
    onCompleteInput: (inputData,name,tableID,index) => {

      dispatch({
        type: "CHANGE_INPUTLIST", 
        payload: {
          inputValue: inputData,
          inputName: name,
          index:index,
tableID:tableID
        }
      });
    }
  }
}


class InputListCellUI extends React.PureComponent {

  state = {
    cellShow: false,
    inputValue:""
    
  };
  showInputCell = () => {
    this.setState({ cellShow: true });
  }
  closeInputCell = (e) => {
    
    var inputData = this.state.inputValue;
    if(inputData!="")
    this.props.onCompleteInput(inputData,this.props.name,this.props.tableIndex,this.props.index);
    this.setState({ cellShow: false });
  }
  
  onChanged = (e) => {
    this.setState({inputValue:e.target.value});
   
  }

  render() {
    const { 
      name,index,defaultValue,title,tips,value
    } = this.props;
    
    
    return (
      <div width="100%" height="100%">

         <ListItem button  onClick={this.showInputCell} > {value}
       
        {/* <TextField
          id="placeholder"
          style={{ fontSize: '15px',color: '#000000',fontFamily: "微软雅黑", fontWeight: 'bold',padding: '0px',}}
          fullWidth
          
          margin="normal"
          value={value}
        /> */}
      
        </ListItem>

     
        <Dialog open={this.state.cellShow}>
          <DialogTitle>
          {title}
          </DialogTitle>
          <DialogContent>
            <TextField
          id="placeholder"
        
          fullWidth
          multiline
          margin="normal"
          //value={value}
          defaultValue={value} 
          onChange={this.onChanged}
        />

        <FormHelperText>{tips}</FormHelperText>

          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.closeInputCell}>
              确定
            </Button>

          </DialogActions>
        </Dialog>

      </div>
    )
  }
}

InputListCellUI.propTypes = {
  onCompleteInput: PropTypes.func.isRequired,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputListCellUI)

