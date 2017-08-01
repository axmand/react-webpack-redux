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

const styleSheet = createStyleSheet('AddCard', {
  card: {
    maxWidth: 345,
    maxHeight: 345
  },
});

class AddCard extends Component {

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
    </div>
  );
  }
 
}

AddCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

//加入reducer
const AddCardReduce=(
  state= {},action)=>{

}

RootReducer.merge(layerControlReduce);

const mapStateToProps = (state, ownProps) => {
const props=ownProps;
    return {
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
		} 
}  	

export default withStyles(styleSheet)(AddCard);