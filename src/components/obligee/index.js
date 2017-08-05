import React, {Component} from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import PeopleIcon from 'material-ui-icons/People'
import SimpleDialogWrapped from './ChooseDialog'
import Menu, { MenuItem } from 'material-ui/Menu'
import FirstDialog from './FirstDialog'
import SecondDialog from './SecondDialog'
const styleSheet = createStyleSheet('ObligeeModule', theme => ({
  listitem: {
    flexDirection: 'column',
    justifyContent: 'center ',
  },
  listitemicon: {
    width: '50%',
    height: '50%',
    margin: '0px',
  },
}));
var scdIndex=2;
class ObligeeModule extends Component {

  state = {
    anchorEl: undefined,
    open: false,
    selectedValue:"",
    firstDialogOpen:false,
    secondDialogOpen:false,
secondTabIndex:0
  }

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleRequestClose =value => {
    if(value=="权籍调查表")
      this.setState({ open: false,selectedValue: value,firstDialogOpen:true });
   if(value=="界址标示表")
      this.setState({ open: false,selectedValue: value,secondDialogOpen:true,secondTabIndex:0 });
   if(value=="界址签章表")
      this.setState({ open: false,selectedValue: value,secondDialogOpen:true,secondTabIndex:1 });
  }

  test= value =>
  {
     
    if(value=="权籍调查表")
      this.setState({ open: false,firstDialogOpen:false,selectedValue: value });
    if(value=="界址标示表")
      this.setState({ open: false,secondDialogOpen:false,selectedValue: value });
    if(value=="界址签章表")
      this.setState({ open: false,secondDialogOpen:false,selectedValue: value });
  }
  render() {
    const classes = this.props.classes
  
    return (
      <div>
        <ListItem button className={classes.listitem} disableGutters={true} onClick={this.handleClick}>
          <ListItemIcon className={classes.listitemicon}>
            <PeopleIcon />
          </ListItemIcon>            
          <ListItemText primary="权利人" />
        </ListItem>

        <Dialog
           
            open={this.state.open}
            onRequestClose={this.handleRequestClose}
          
          >
            <SimpleDialogWrapped onRequestClose={this.handleRequestClose} selectedValue={this.state.selectedValue} projectName="项目二"/>
          </Dialog>

          <FirstDialog  open={this.state.firstDialogOpen} firstDialogClose={this.test}/>
          <SecondDialog  open={this.state.secondDialogOpen} secondDialogClose={this.test} changeTabIndex={this.state.secondTabIndex} />
      </div>
    )
  }

}

export default withStyles(styleSheet)(ObligeeModule);