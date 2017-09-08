import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import Menu, { MenuItem } from 'material-ui/Menu'

import Tabs, { Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import RootReducer from './../../redux/RootReducer';


import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import ObligeeTable1 from './ObligeeTable1'
import ObligeeTable2 from './ObligeeTable2'
import ObligeeTable3 from './ObligeeTable3'
const TabContainer = props =>
  <div style={{ padding: 20,overflow:"auto" }}>
    {props.children}
  </div>;

const styleSheet = createStyleSheet('FirstDialog', {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
   root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
   
  },
});

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styleSheet2 = createStyleSheet('BasicTabs', theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
}));

class ThirdDialog extends Component {


  render() {
    const classes = this.props.classes;
        const { open,close } = this.props;

    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onRequestClose={close}
          transition={<Slide direction="up" />}
        >
          <AppBar >
             
            <Toolbar>
                  <Typography type="title" color="inherit"  className={classes.flex}>
                 
              </Typography>
             
                 <IconButton color="contrast" onClick={close} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div>
       
          <TabContainer >

            <h1><br></br>调查审核表</h1>

  
          </TabContainer>
        
        
             </div>
        </Dialog>
      </div>
    );
  }
}

ThirdDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};




// Map Redux state to component props
function mapStateToProps(state) {
  return {
   open:state.thirdDialogOpen
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
   close: () => dispatch({
                type: 'close',
                payload: {
                    choice: 5
                }
            }),
  }
}
var TD1=withStyles(styleSheet)(ThirdDialog);
export default connect(mapStateToProps, mapDispatchToProps)(TD1);