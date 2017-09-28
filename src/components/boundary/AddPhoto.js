import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
//UI
import Card, { CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
//图标
//img
//Redux
// import projectData from './../../redux/RootData';

const styles = {
  input: {
    display: 'none',
  },
};

class AddPhoto extends Component {

  render(){
    const {  
      classes
    } = this.props
    
    let item = this.props.entries;

    return(
      <div style={{padding:'20px'}}>
      <Card  style={{maxWidth:150,maxHeight:220,}}>
        <img src={item} alt="Contemplative Reptile"  style={{justifyContent:'center'}} width="100%" height="150"/>
        <CardContent >
          <Typography type="headline" component="h2">
             指界点
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
