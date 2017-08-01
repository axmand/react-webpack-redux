/**
 * 
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//ui
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import IconButton from 'material-ui/IconButton';
//图标
import ContentCopy from 'material-ui-icons/ContentCopy';
import Flag from 'material-ui-icons/Flag';
import Add from 'material-ui-icons/Add';
import  Remove from 'material-ui-icons/Remove';
import  Search from 'material-ui-icons/Search';
import  RadioButtonChecked from 'material-ui-icons/RadioButtonChecked';
//组件
import LayerControl from './LayerControl';

const styleSheet = createStyleSheet(theme => ({
  list:{
    position:'absolute',
    top:'40px',
    right:'20px'

  },
  listitem: {
    width: '30px',
    height: '30px',
    flexDirection: 'column',
    justifyContent: 'center ',
    padding: '10px 10px 10px',
    position: 'relative',    
    border: 0,
  },
  listitemicon: {
    color:'#000',
    width: '30px',
    height: '30px',
    margin: '0px',   
    background: 'rgba(255, 255, 255, .75)',//'white',
    borderRadius: 5,
  },
  listitemtext:{
    fontSize:'20px'
  }
}));

class  MapToolBar extends Component{

    render(){
      
        const classes = this.props.classes;
        const { onClick }= this.props;

        return(
            <List className={classes.list}>
              <ListItem className={classes.listitem} disableGutters={true}>
                <LayerControl  />
              </ListItem>
            <ListItem button className={classes.listitem} disableGutters={true} onClick={()=>onClick("get_location")}>
            <ListItemIcon className={classes.listitemicon}>
              <Flag  />
            </ListItemIcon>
            </ListItem>
            <ListItem button className={classes.listitem} disableGutters={true} onClick={()=>onClick("zoom_in")}>
            <ListItemIcon className={classes.listitemicon}>
              <Add  />
            </ListItemIcon>                          
            </ListItem>            
            <ListItem button className={classes.listitem} disableGutters={true} onClick={()=>onClick("zoom_out")}>
            <ListItemIcon className={classes.listitemicon}>
              <Remove  />
            </ListItemIcon>                          
            </ListItem>
            <ListItem button className={classes.listitem} disableGutters={true} onClick={()=>onClick("zoom_out")}>
            <ListItemIcon className={classes.listitemicon}>
              <Search  />
            </ListItemIcon>                          
            </ListItem>
            <ListItem button className={classes.listitem} disableGutters={true} onClick={()=>onClick("zoom_out")}>
               <RadioButtonChecked  />             
            </ListItem>
            </List>
        )
    }
}

MapToolBar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(MapToolBar);