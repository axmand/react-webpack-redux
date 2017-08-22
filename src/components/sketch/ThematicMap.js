import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import UI
import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input/Input';
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';


const styles={
    typography:{
        position:'absolute',
        top:'80px',
        left:'700px',
        background:'#D1E9E9',
        borderRadius: 8,
        padding:'10px 10px 10px',
        width:'300px'
    },
    mapContainer:{
        position:'absolute',
        left:'450px',
        top:'160px',
        height:'600px',
        width:'800px', 
        background:'#D1E9E9'     
    }

}

class ThematicMap extends Component {
    render(){
        const classes = this.props.classes;
        return(
            <div className={classes.root}>
                <Typography type='headline' className={classes.typography}>
                地图标题
                </Typography> 

                <Paper className={classes.mapContainer}>
                    It's a map 
                </Paper>

            </div>

        )
    }
}
ThematicMap.PropTypes={
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  
   return {
      }
  }
  
  const mapDispatchToProps = (dispatch, ownProps) => {
      return {

      }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles,{name:'ThematicMap'})(ThematicMap));