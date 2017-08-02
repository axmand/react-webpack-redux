import React, {Component} from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles';

import { ListItem, ListItemIcon } from 'material-ui/List';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';

const styleSheet = createStyleSheet('UserModule', theme => ({
  listitem: {
    display: 'flex',
  },
}));

class UserModule extends Component {

  render() {
    const classes = this.props.classes;
  
    return (
          <ListItem button className={classes.listitem}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
          </ListItem>
    )
  }
  
}

export default withStyles(styleSheet)(UserModule);