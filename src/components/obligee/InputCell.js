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
function mapStateToProps(state,ownProps) {
  const key =ownProps.name;
  const tableIndex =ownProps.tableIndex;
  let obj = {};
  obj['key2'] = key;
  // obj[key] = state.value[key];

  //var ttt=state.ObContentReducer[tableIndex][key];

  obj[key] =state.ObContentReducer[tableIndex][key];// state.ObContentReducer[tableIndex][key];
  
  return obj;
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
//修改命令 修改的字段名 修改字段的值
    onCompleteInput: (inputData,name,tableID) => {

      dispatch({
        type: "change", 
        payload: {
          inputValue: inputData,
          inputName: name,
tableID:tableID
        }
      });
    }
  }
}


class InputCellUI extends React.PureComponent {

  state = {
    cellShow: false,
    inputValue:""
    
  };
  showInputCell = () => {
    this.setState({ cellShow: true });
  }
  closeInputCell = (e) => {
    
    var inputData = this.state.inputValue;
    if(inputData!=="")
    this.props.onCompleteInput(inputData,this.props.name,this.props.tableIndex);
    this.setState({ cellShow: false });
  }
  
  onChanged = (e) => {
    this.setState({inputValue:e.target.value});
   
  }

  render() {
    const { 
      // onCompleteInput, 
      // dialogShow, 
      key2, 
      name,
      title,
      tips,
      // tableIndex 
    } = this.props;
    let value ="";
    if(name ===key2){
      value =this.props[key2]||"";
    }

  
    return (
      <div width="100%" height="100%">

         <ListItem button  onClick={this.showInputCell} > 
       
        <TextField
          id="placeholder"
          style={{ fontSize: '15px',color: '#000000',fontFamily: "微软雅黑", fontWeight: 'bold',padding: '0px',}}
          fullWidth
          multiline
          margin="normal"
          value={value}
        />
      
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

            {/* <br/>
            提示
            <br />
{tips} */}
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

InputCellUI.propTypes = {
  //value: PropTypes.string.isRequired,
  onCompleteInput: PropTypes.func.isRequired,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputCellUI)

