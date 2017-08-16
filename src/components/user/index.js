import React, {Component} from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles';

import { ListItem, ListItemIcon } from 'material-ui/List';
import FontAwesome from 'react-fontawesome'
// import AccountCircleIcon from 'material-ui-icons/AccountCircle';

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
              <FontAwesome 
                name='user'
                size='lg'
                style={{
                  width: '20px',
                  height: '20px',
                  margin: '0px',
                  padding: '2px',
                  color: '#C1C6C9',
                }}
              />
            </ListItemIcon>
          </ListItem>
    )
  }
  
}

export default withStyles(styleSheet)(UserModule);