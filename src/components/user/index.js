import React, {Component} from 'react'
import { withStyles } from 'material-ui/styles';

import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import FontAwesome from 'react-fontawesome'
// import AccountCircleIcon from 'material-ui-icons/AccountCircle';

const styles = {
  listitem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center ',
    paddingLeft: '0px',
  },
  listItemText: {
    lineHeight: '20px',
    color: '#ffffff',
    fontFamily: "微软雅黑",
    fontWeight: 'bold',
  },
}

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
                  width: '15.23px',
                  height: '21.33px',
                  margin: '0px',
                  padding: '2px',
                  color: '#C1C6C9',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="***"
              disableTypography={true}
              className={classes.listItemText}
            />
          </ListItem>
    )
  }
  
}

export default withStyles(styles)(UserModule);