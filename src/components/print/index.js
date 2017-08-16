import React, {Component} from 'react'
import { withStyles } from 'material-ui/styles';

import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import FontAwesome from 'react-fontawesome'
// import PrintIcon from 'material-ui-icons/Print';

const styles = {
  listitem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center ',
  },
  listItemText: {
    lineHeight: '32px',
    padding: '2px',
    color: '#ffffff',
  },
}

class PrintModule extends Component {

  render() {
    const classes = this.props.classes;
  
    return (
      <ListItem button className={classes.listitem} disableGutters={true}>
        <ListItemIcon>
          <FontAwesome
            name='print'
            size='2x'
            style={{
              width: '29.71px',
              height: '32px',
              margin: '0px',
              padding: '2px',
              color: '#C1C6C9',
            }}
          />
        </ListItemIcon>            
        <ListItemText
          disableTypography={true}
          className={classes.listItemText}
          primary="打印"
        />
      </ListItem>
    )
  }
}

export default withStyles(styles)(PrintModule);