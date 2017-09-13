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
  const key =ownProps.name;
  let obj = {};
  obj['key2'] = key;
  obj[key] = state.value[key];
  return obj;
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
//修改命令 修改的字段名 修改字段的值
    onCompleteInput: (inputData,name) => {

      dispatch({
        type: "change", 
        payload: {
          inputValue: inputData,
          inputName: name

        }
      });
    }
  }
}


class DateInputCellUI extends React.PureComponent {

  state = {
    cellShow: false,
    
  };
  showInputCell = () => {
    this.setState({ cellShow: true });
  }
  closeInputCell = () => {
    this.setState({ cellShow: false });
  }
  onChanged = (e) => {
    var inputData = e.target.value;
    this.props.onCompleteInput(inputData,this.props.name);
  }

  shouldComponentUpdate(nextProps,nextStates){
    const {name,key2}=this.props;
    if(!key2)
      return true;
    return name === key2;
  }

  render() {
    const { onCompleteInput, dialogShow, key2, name,title,tips } = this.props;
    let value ="";
    if(name ===key2){
      value =this.props[key2]||"";
    }

  
    return (
      <div width="100%" height="100%">

        <ListItem button  onClick={this.showInputCell} > 
       
        <Input
          id="placeholder"
        
         
      
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
        id="date"
       
        type="date"
       
        value={value}
          defaultValue={value} 
          onChange={this.onChanged}
      />

            {/* <TextField
          id="placeholder"
        
          fullWidth
          multiline
          margin="normal"
          value={value}
          defaultValue={value} 
          onChange={this.onChanged}
        /> */}
            <br/>
            提示
            <br />
{tips}
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

DateInputCellUI.propTypes = {
  //value: PropTypes.string.isRequired,
  onCompleteInput: PropTypes.func.isRequired,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateInputCellUI)

