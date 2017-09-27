import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
//UI
import Card, { CardActions } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import Typography from 'material-ui/Typography';
//图标
//img
import reptileImage from './test2.jpg';
//Redux

const styles = {
  input: {
    display: 'none',
  },
};

class AddPhoto extends Component {

  render(){
    const { 
      handleChooseList,
      handleContentClose2
    } = this.props
    
    let item = this.props.entries;

    return(
      <div style={{padding:'20px'}}>
      <Card key={ item.key } style={{maxWidth:300,maxHeight:250,}}>
        <img src={ reptileImage } alt="Contemplative Reptile" onClick={ handleContentClose2 } style={{justifyContent:'center'}}/>
        <CardActions >
          <Checkbox onClick={  handleChooseList } />
          <Typography component="p">
            { item.text.inputValue }
          </Typography>
        </CardActions>
      </Card>
      </div>
    )
  }
}

AddCard.propTypes = {
  entries: PropTypes.object.isRequired,
  handleChooseList:PropTypes.func.isRequired,
  handleContentClose2:PropTypes.func.isRequired
};

export default withStyles(styles,{name:'AddCard'})(AddCard);
