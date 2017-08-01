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
// Action

var inputData;
const completeInput = { type: 'completeInput', payload: {
                    //inputValue:{inputData}
                }  }
// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.value,
    dialogShow:state.show
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onShowClick: () => dispatch(showInputDialog),
    onCompleteInput: () =>{
      if(document.getElementById('inputname')!=undefined)
        inputData= document.getElementById('inputname').value;
      else
        inputData="...."
      dispatch(completeInput)}
  }
}

// Connected Component
 


 class Counter extends Component {
  render() {
    const { value, onShowClick,onCompleteInput,dialogShow } = this.props
    return (
      <div>
         <ListItem button>
         
          <ListItemText primary="权利人姓名" secondary={value} onClick={onShowClick}/>
        </ListItem>


        
         <Dialog open={dialogShow}>
          <DialogTitle>
           权利人姓名
          </DialogTitle>
          <DialogContent>
            
            <Input id="inputname" defaultValue={value} />
            
          </DialogContent>
          <DialogActions>
            <Button  color="primary" onClick={onCompleteInput}>
              确定
            </Button>
            
          </DialogActions>
        </Dialog>
            
         
         
      
      </div>
    )
  }
}

Counter.propTypes = {
  value: PropTypes.string.isRequired,
  onShowClick: PropTypes.func.isRequired,
   onCompleteInput: PropTypes.func.isRequired,
}

const InputCell = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

export default InputCell;
const showInputDialog = { type: 'showInputDialog',}