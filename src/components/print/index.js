import React, {Component} from 'react'
import { withStyles } from 'material-ui/styles';

import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
// import FontAwesome from 'react-fontawesome'
// <FontAwesome
//   name='print'
//   size='5x'
//   style={{
//     width: '29.71px',
//     height: '32px',
//     margin: '0px',
//     padding: '2px',
//     color: '#C1C6C9',
//   }}
// />
import PrintIcon from 'material-ui-icons/Print';

const styles = {
  listitem: {
    flexDirection: 'column',
    justifyContent: 'center ',
    paddingTop: "15%",
    paddingBottom: "15%",
  },
  listItemIcon: {
		width: "50%",
    height: "50%",
		margin: 0,
		color: '#C1C6C9',
	},
  listItemText: {
    fontSize: '1em',
    color: '#ffffff',
    fontFamily: "微软雅黑",
    fontWeight: 'bold',
    padding: '0px',
  },
}

class PrintModule extends Component {

  render() {
    const classes = this.props.classes;
  
    return (
      <ListItem button className={classes.listitem} disableGutters={true}>
        <ListItemIcon>
          <PrintIcon className={classes.listItemIcon}/>  
        </ListItemIcon>            
        <ListItemText
          disableTypography={true}
          className={classes.listItemText}
          primary="打印签章"
        />
      </ListItem>
    )
  }
}

export default withStyles(styles)(PrintModule);