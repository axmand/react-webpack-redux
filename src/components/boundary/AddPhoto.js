import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
//UI
import Card, { CardContent,CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
//图标
//img
//Redux

const styles = {
  input: {
    display: 'none',
  },
};

class AddPhoto extends Component {

  render(){
    const { 
    } = this.props
    
    let item = this.props.entries;

    return(
      <div style={{padding:'20px'}}>
      <Card  style={{maxWidth:150,maxHeight:220,}}>
        <img src={item} alt="Contemplative Reptile"  style={{justifyContent:'center'}} width="60%" height="130px"/>
        <CardContent >
          <Typography type="headline" component="h2">
            { 123546 }
          </Typography>
        </CardContent>
      </Card>
      </div>
    )
  }
}

AddPhoto.propTypes = {
};

export default withStyles(styles,{name:'AddPhoto'})(AddPhoto);
