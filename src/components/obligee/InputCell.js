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


// Map Redux state to component props
function mapStateToProps(state) {
  const key = state.key;
  let obj = {};
  obj['key2'] = key;
  obj[key] = state.value[key];
  return obj;
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {

    onCompleteInput: (inputData, command) => {

      dispatch({
        type: command, payload: {
          inputValue: inputData
        }
      });
    }
  }
}


class InputCellUI extends React.PureComponent {

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
    this.props.onCompleteInput(inputData, this.props.command);
  }

  shouldComponentUpdate(nextProps,nextStates){
    const {name,key2}=this.props;
    if(!key2)
      return true;
    return name === key2;
  }

  render() {
    const { onCompleteInput, dialogShow, command, key2, name } = this.props;
    let value ="未填";
    if(name ===key2){
      value =this.props[key2]||"未填";
    }

    //1.如果变动的字段是当前inputcell指定的字段，那么执行变动
    //2.如果字段不一致，退出render

    return (
      <div width="100%" height="100%">

        <ListItem button>

          <ListItemText primary={value} onClick={this.showInputCell} />
        </ListItem>
        <Dialog open={this.state.cellShow}>
          <DialogTitle>
            权利人姓名
          </DialogTitle>
          <DialogContent>

            <Input ref="NameInput" defaultValue={value} onChange={this.onChanged} />

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

