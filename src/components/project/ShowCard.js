import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
//UI
import Card,{CardContent} from 'material-ui/Card';
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

class ShowCard extends Component {

  render(){
	const { 
      handleChooseItem
    } = this.props  
   
    let item = this.props.entries;

    return(
      <div style={{padding:'20px'}}>
      <Card key={ item.key } style={{width:150,height:220,}}>
        <img src={ reptileImage } alt="Contemplative Reptile" onClick={ handleChooseItem } style={{justifyContent:'center'}}/>
         <CardContent>
          <Typography type="headline" component="h2">
            {item.text}
          </Typography>
        </CardContent>
      </Card>
      </div>
    )
  }
}

ShowCard.propTypes = {
  entries: PropTypes.object.isRequired,
  handleChooseItem:PropTypes.func.isRequired,
};

export default withStyles(styles,{name:'ShowCard'})(ShowCard);
