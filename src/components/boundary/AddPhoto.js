import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
//UI
import Card, { CardContent} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
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
      handleChoosePhoto,
      classes
    } = this.props
    
    let item = this.props.entries;
    let key = this.props.keys;

    return(
      <div style={{paddingBottom:20,paddingLeft:20,paddingRight:20,paddingTop:0}}>
      <Card  style={{maxWidth:221,}}>
        <img src={item} alt="Contemplative Reptile"  
             style={{justifyContent:'center',}} 
             width="170" height="170"/>
        <CardContent style={{padding: '0px',}}>
          <Checkbox onClick={  handleChoosePhoto }/>
          <Typography  component="p"> 
            {key}
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
