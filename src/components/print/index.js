import React, {Component} from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PrintIcon from 'material-ui-icons/Print';

const styleSheet = createStyleSheet('PrintModule', theme => ({
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

class PrintModule extends Component {

  render() {
    const classes = this.props.classes;
  
    return (
          <ListItem button className={classes.listitem} disableGutters={true}>
            <ListItemIcon className={classes.listitemicon}>
              <PrintIcon />
            </ListItemIcon>            
            <ListItemText primary="打印" />
          </ListItem>
    )
  }
}

export default withStyles(styleSheet)(PrintModule);