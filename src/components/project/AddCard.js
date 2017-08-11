import React, { Component } from 'react';
import PropTypes from 'prop-types';
//UI
import Card, { CardActions, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
//图标
//img
import reptileImage from './test.jpg';

class AddCard extends Component {

  render(){
		const { 
			handleChooseList,
    } = this.props
    
    let todoEntries = this.props.entries;
    
    function  CreateTasks(item) {
      return (
      <Card key={ item.key } style={{maxWidth:300,maxHeight:345}}>
        <CardMedia>
          <img src={ reptileImage } alt="Contemplative Reptile" />
        </CardMedia>  
        <CardActions>
          <Checkbox onClick={ handleChooseList } />
          <Button color="primary">{ item.text.inputValue }</Button>
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
  handleChooseList:PropTypes.func.isRequired,
};

export default (AddCard);
