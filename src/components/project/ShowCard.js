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
   //   handleChooseList,
      handleContentClose2
    } = this.props
    
    let item = this.props.entries;
  //  let itemId = this.props.Id;


    return(
      <div style={{padding:'20px'}}>
      <Card key={ item } style={{width:300,height:300,}}>
        <img src={ reptileImage } alt="Contemplative Reptile" onClick={ handleContentClose2 } style={{justifyContent:'center'}}/>
         <CardContent>
          <Typography type="headline" component="h2">
            {item}
          </Typography>
        </CardContent>
      </Card>
      </div>
    )
  }
}

ShowCard.propTypes = {
  entries: PropTypes.string.isRequired,
 // handleChooseList:PropTypes.func.isRequired,
  handleContentClose2:PropTypes.func.isRequired
};

export default withStyles(styles,{name:'ShowCard'})(ShowCard);
