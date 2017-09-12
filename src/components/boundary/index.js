import React, {Component} from 'react'
import { withStyles } from 'material-ui/styles';

import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
// import FontAwesome from 'react-fontawesome'
import PhotoCameraIcon from 'material-ui-icons/PhotoCamera';

const styles = {
  listitem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center ',
	},
	listItemIcon: {
		width: 85,
		height: 85,
		margin: 0,
		color: '#C1C6C9',
	},
  listItemText: {
    fontSize: '24px',
    color: '#ffffff',
    fontFamily: "微软雅黑",
    fontWeight: 'bold',
  },
}

class BoundaryModule extends Component {

  render() {
    const classes = this.props.classes;
  
    return (
      <ListItem button className={classes.listitem} disableGutters={true}>
        <ListItemIcon>
          <PhotoCameraIcon className={classes.listItemIcon}/>
        </ListItemIcon>            
        <ListItemText
          disableTypography={true}
          className={classes.listItemText}
          primary="现场指界"
        />
      </ListItem>
    )
  }
}

export default withStyles(styles,{name:'BoundaryModule'})(BoundaryModule);