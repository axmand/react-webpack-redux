import React, {Component} from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { NavLink } from 'react-router-dom'

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import MapIcon from 'material-ui-icons/Map';

const styleSheet = createStyleSheet('SketchModule', theme => ({
  listitem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center ',
  },
  listitemicon: {
    width: '50%',
    height: '50%',
    margin: '0px',
  },
}));

class SketchModule extends Component {

  render() {
    const classes = this.props.classes;
  
    return (
      <NavLink to="/sketch">
        <ListItem button className={classes.listitem} disableGutters={true}>
          <ListItemIcon className={classes.listitemicon}>
            <MapIcon />
          </ListItemIcon>            
          <ListItemText primary="草图" />                         
        </ListItem>
      </NavLink>
    )
  }
}

export default withStyles(styleSheet)(SketchModule);