import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
//UI
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import Dialog,{ DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import Switch from 'material-ui/Switch';
import Button from 'material-ui/Button';
//自定义组件
import SelfCard from './SelfCard'

class SelfButton extends Component {
  state = {
    checkedA: true,
    checkedB: false,
    anchorEl: undefined,
    open: false,
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  }
  
  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    return (
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedA}
              onChange={(event, checked) => this.setState({ checkedA: checked })}
            />
          }
          label="编辑"
        />
       <FormLabel>
          <Button onClick={this.handleClick}>删除</Button>
          <Button>完成</Button>
       </FormLabel>
      
       <Dialog
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
       >
          <DialogContent>
            <DialogContentText>
              确定删除所选项目？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="default">
              取消
            </Button>
            <Button onClick={this.handleRequestClose} color="primary">
              确认
            </Button>
          </DialogActions>
       </Dialog>
       <SelfCard/>

      </div>
    );
  }
}

export default SelfButton;