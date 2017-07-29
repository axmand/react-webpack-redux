import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Menu, { MenuItem } from 'material-ui/Menu'
import List, { ListItem,ListItemText } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import ContentCopy from 'material-ui-icons/ContentCopy';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
class InputDialog extends Component {
  state = {
    open: false,
    OwnerName:this.props.DefaultValue
  }
   handleClick = event => {
    this.setState({ open: true });
  }

  handleRequestClose = () => {
    var value=document.getElementById('inputname').value;
    this.setState({ open: false,OwnerName:value })
  }
handleChanged=(text)=>{
   var value=document.getElementById('inputname').value;
    this.setState({ open: true,OwnerName:value })
}
  render() {
    const classes = this.props.classes
  
    return (
      <div >
          <Dialog open={this.state.open}>
          <DialogTitle>
            {this.props.Title}
          </DialogTitle>
          <DialogContent>
            
             <Input id="inputname" defaultValue={this.state.OwnerName}  onChange={this.handleChanged}/>
             <DialogContentText>
              {this.props.Tip}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button  color="primary" onClick={this.handleRequestClose}>
              确定
            </Button>
            
          </DialogActions>
        </Dialog>
            <List>

                  <ListItem button>
         
          <ListItemText primary={this.props.Title} secondary={this.state.OwnerName} onClick={this.handleClick}/>
        </ListItem>
            </List>     
      </div>
    )
  } 
}

export default InputDialog