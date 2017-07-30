import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
//UI
import Dialog,{ DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
//图标
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add'
//img
import reptileImage from './test.jpg';

const styleSheet = createStyleSheet('SelfCard', theme =>({
  card: {
    maxWidth: 345,
    maxHeight: 345
  },
  addicon:{
    width: '50%',
    height: '50%',
    margin: '10px',
  }
}));

class SelfCard extends Component {

  state = {
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

  handleChange = () => {
    this.setState({ text: this.target.value });
  };

  render(){
    const classes = this.props.classes;

     return (
    <div>
      <Card className={classes.card}>
        <CardMedia>
          <img src={reptileImage} alt="Contemplative Reptile" />
        </CardMedia>
        <CardActions>
          <Button dense color="primary">
            项目一
          </Button>
        </CardActions>
      </Card>
      <IconButton onClick={this.handleClick} className={classes.addicon}>
         <AddIcon button/>
      </IconButton>

       <Dialog
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
       >
          <DialogContent>
            <DialogContentText>
              请输入项目名称
            </DialogContentText>
            <input type="text" onChange={this.handleChange} value={this.state.text} placeholder="权利人+宗地代码等"/>
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
    </div>
  );
  }
 
}

SelfCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(SelfCard);