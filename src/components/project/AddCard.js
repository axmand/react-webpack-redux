import React, { Component } from 'react';
import PropTypes from 'prop-types';
//UI
import Card, { CardActions, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
//图标
//img
import reptileImage from './test.jpg';
//Redux

class AddCard extends Component {
 
  render(){
    let todoEntries = this.props.entries; 
    
    function  CreateTasks(item) {
      return (
      <Card  style={{maxWidth:300,maxHeight:345}}>
        <CardMedia>
          <img src={reptileImage} alt="Contemplative Reptile" />
        </CardMedia>
       
        <Checkbox />   
        
        <CardActions>
          <Button  color="primary"></Button>
        </CardActions>
      </Card>);
    } 
    
    let listItems = todoEntries.map(CreateTasks);
   
    return(
      <div>
        {listItems}
      </div>
    )
  }
}

AddCard.propTypes = {
  entries: PropTypes.array.isRequired,
};

export default AddCard;