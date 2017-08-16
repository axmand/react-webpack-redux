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


import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import ObligeeTable1 from './ObligeeTable1'
import ObligeeTable2 from './ObligeeTable2'
import ObligeeTable3 from './ObligeeTable3'
const TabContainer = props =>
  <div style={{ padding: 20,overflow:"auto" }}>
    {props.children}
  </div>;

// const styleSheet = createStyleSheet('FirstDialog', {
//   appBar: {
//     position: 'relative',
//   },
//   flex: {
//     flex: 1,
//   },
//    root: {
//     flexGrow: 1,
//     marginTop: 30,
//   },
//   paper: {
//     padding: 16,
//     textAlign: 'center',
   
//   },
// });

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

class FirstDialog extends Component {
  state = {
    open: false,
    index: 0,
  };
 

  handleChange = (event, index) => {
    this.setState({ index });
  };

  // handleOpen = () => {
  //   this.setState({ open: true });
  // };

  // handleClose = value => {
  //   this.props.firstDialogClose(value);
  // };

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
               <Typography type="title" color="inherit">
                 <Tabs index={this.state.index} onChange={this.handleChange}>
            <Tab label="权利信息" />
            <Tab label="宗地信息" />
            <Tab label="使用信息" />
          </Tabs>
              </Typography>
             
                 <IconButton color="contrast" onClick={close} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div>
        {this.state.index === 0 &&
          <TabContainer >

            <h1><br></br>宗地基本信息表</h1>

  <Provider store={ObligeeTableStore}>   
  
 <ObligeeTable1/>
  
     </Provider>   

          </TabContainer>}
        {this.state.index === 1 &&
          <TabContainer>
              <h1 ><br></br>宗地基本信息表</h1>
    <Provider store={ObligeeTableStore}>   
  
 <ObligeeTable2 />
  
     </Provider>  
          </TabContainer>}
        {this.state.index === 2 &&
          <TabContainer>
              <h1 ><br></br>宗地基本信息表</h1>
               <Provider store={ObligeeTableStore}>   
  
 <ObligeeTable3 />
  
     </Provider>  
        
          </TabContainer>}
             </div>
        </Dialog>
      </div>
    );
  }
}

FirstDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};




// Map Redux state to component props
function mapStateToProps(state) {
  return {
   open:state.firstDialogOpen
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
   close: () => dispatch({
                type: 'close',
                payload: {
                    choice: 1
                }
            }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstDialog);

// // Reducer
function reducer(state = { Owner:"peter",User:"jack" }, action) {
  
   
  switch (action.type) {
  
    case 'changeOwner':
   
    return Object.assign({}, state, {
        	Owner: action.payload.inputValue
      });

    case 'changeUser':
    return Object.assign({}, state, {
        	User: action.payload.inputValue
      });
   
    default:
      return state
  }
}

// Store
const ObligeeTableStore = createStore(reducer);

RootReducer.merge(reducer);