import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
//UI
import Card, { CardActions, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
//图标
//img
import reptileImage from './test.jpg';
//Redux

const styleSheet = createStyleSheet(theme => ({
  input: {
    display: 'none',
  },
}));

class AddCard extends Component {

  render(){
		const { 
      handleChooseList,
      classes
    } = this.props
    
    let item = this.props.entries;

    return(
      <div style={{padding:'10px'}}>
      <Card key={ item.key } style={{Width:300,Height:345}}>
        <CardMedia>
          <img src={ reptileImage } alt="Contemplative Reptile" />
        </CardMedia>  
        <CardActions>
          <Checkbox onClick={  handleChooseList } />
          <input accept="bak,dwg,BAK,DWG" className={classes.input} id="file" multiple type="file"  />
          <label htmlFor="file">
          <Button color="primary" component="span">{ item.text.inputValue }</Button>
          </label >
        </CardActions>
      </Card>
      </div>
    )
  }
}

AddCard.propTypes = {
  entries: PropTypes.object.isRequired,
  handleChooseList:PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(AddCard);
