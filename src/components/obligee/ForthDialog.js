import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
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
import CommonAreaTable from './CommonAreaTable'

import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

const TabContainer = props =>
  <div style={{ padding: 20,overflow:"auto" }}>
    {props.children}
  </div>;

const styleSheet = {
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
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

// const styleSheet2 = createStyleSheet('BasicTabs', theme => ({
//   root: {
//     flexGrow: 1,
//     marginTop: theme.spacing.unit * 3,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

class ForthDialog extends Component {


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

            <h1><br></br>共有/共用宗地面积分摊表</h1>

            <Provider store={ObligeeTableStore}>

            <CommonAreaTable/>
            
                </Provider>
  
          </TabContainer>
        
        
             </div>
        </Dialog>
      </div>
    );
  }
}

ForthDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};




// Map Redux state to component props
function mapStateToProps(state) {
  return {
   open:state.forthDialogOpen
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
   close: () => dispatch({
                type: 'close',
                payload: {
                    choice: 6
                }
            }),
  }
}
var FD1=withStyles(styleSheet)(ForthDialog);

export default connect(mapStateToProps, mapDispatchToProps)(FD1);


// // Reducer
function reducer(state = {
  value: {"OwnPowerSide":"peter","UsePowerSide":"jack","ProcuratorName":"test", "FixedCount": "12块"},
 
  "FixedCode": [
      "011DBA",
      "011DBB",
      "011DBC",
      "011DBD"
  ],
  "LandOwnUseArea": [
      0.12212,
      0.11,
      11.2112,
      1112.31
  ],
  "LandUniqueArea": [
      22.2222,
      333.3333,
      55555.555,
      233.4444
  ],
  "CommonArea": [
      22.2222,
      333.3333,
      55555.555,
      233.4444
  ]



}, action) {
  
    let value = state.value;
  
    switch (action.type) {
  
      case 'change':
      var inputName=action.payload.inputName;
      
 
       var statenew=state;
       statenew[inputName]=action.payload.inputValue;
      
       
       return Object.assign({}, state, statenew);
  
     
  
      default:
        return state
    }
  }
  
  // Store
  const ObligeeTableStore = createStore(reducer);
  
  RootReducer.merge(reducer);