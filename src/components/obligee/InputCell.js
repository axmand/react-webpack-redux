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
import List, { ListItem,ListItemText } from 'material-ui/List'


// Map Redux state to component props
function mapStateToProps1(state) {
  return {
    value: state.Owner,
  }
}

// Map Redux actions to component props
function mapDispatchToProps1(dispatch) {
  return {
    
    onCompleteInput: (inputData) =>{
    
      dispatch( { type: "changeOwner", payload: {
                    inputValue:inputData
                }  })}
  }
}

function mapStateToProps2(state) {
  return {
    value: state.User,
  }
}

// Map Redux actions to component props
function mapDispatchToProps2(dispatch) {
  return {
    
    onCompleteInput: inputName =>{
    
      dispatch( { type: "changeUser", payload: {
                    inputValue:inputName
                }  })}
  }
}
// Connected Component
 
 class InputCell extends Component {

  state = {
    cellShow:false
  };
  showInputCell=()=>
  {
    this.setState({cellShow:true});
  }
  closeInputCell=()=>
  {
    this.setState({cellShow:false});
  }
  onChanged=(e)=>
  {
    var inputData=e.target.value;
    this.props.onCompleteInput(inputData);
  }

  render() {
    const { value,onCompleteInput,dialogShow,command } = this.props;
    return (
      <div width="100%" height="100%">
        
          <ListItem button>
        
           <ListItemText primary={value}  onClick={this.showInputCell}/> 
        </ListItem> 
         <Dialog open={this.state.cellShow}>
          <DialogTitle>
           权利人姓名
          </DialogTitle>
          <DialogContent>
            
            <Input ref="NameInput" defaultValue={value} onChange={this.onChanged}/>
            
          </DialogContent>
          <DialogActions>
            <Button  color="primary" onClick={this.closeInputCell}>
              确定
            </Button>
            
          </DialogActions>
        </Dialog>
            
         
         
      
      </div>
    )
  }
}

InputCell.propTypes = {
  value: PropTypes.string.isRequired,
   onCompleteInput: PropTypes.func.isRequired,
}


export const InputCell1 = connect(
  mapStateToProps1,
  mapDispatchToProps1
)(InputCell)

export const InputCell2 = connect(
  mapStateToProps2,
  mapDispatchToProps2
)(InputCell)