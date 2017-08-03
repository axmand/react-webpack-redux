import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
//UI
import Dialog,{ DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Checkbox from 'material-ui/Checkbox';
//图标
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add'
//img
import reptileImage from './test.jpg';
//Redux

class AddCard extends Component {
 
  render(){
    console.log(this.props.entries)
    let todoEntries = this.props.entries; 
    
    function  CreateTasks(item) {
      return (
      <Card key={item.key} style={{maxWidth:300,maxHeight:345}}>
        <CardMedia>
          <img src={reptileImage} alt="Contemplative Reptile" />
        </CardMedia>
        <Checkbox />   
        <CardActions>
          <Button dense color="primary">
            {item.text}
          </Button>
        </CardActions>
      </Card>);
    } 
    
    let listItems = todoEntries.map(CreateTasks);
    return(
      <div>
      <ul>
        {listItems};
      </ul>
      </div>
    )
  }
}

AddCard.propTypes = {
  classes: PropTypes.object.isRequired,
  entries: PropTypes.array.isRequired,
};

export default AddCard;