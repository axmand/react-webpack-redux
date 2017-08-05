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
import BoundaryList from './BoundaryList'
const TabContainer = props =>
  <div style={{ padding: 20,overflow:"auto" }}>
    {props.children}
  </div>;

const styleSheet = createStyleSheet('SecondDialog', {
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

class SecondDialog extends Component {
  state = {
    open: false,
    index: 0,
  };
 

  handleChange = (event, index) => {
    this.setState({ index });
  };



  handleClose = value => {
    this.props.secondDialogClose(value);
  };
   componentWillReceiveProps=()=>{
     
     this.setState({index:this.props.changeTabIndex});
     
     console.log(this.state);
    };

//    componentDidMount=()=>{
     
//      this.setState({index:this.props.changeTabIndex});
//      console.log(this.state);
//     };
// shouldComponentUpdate=()=>{
     
//      this.setState({index:this.props.changeTabIndex});
//      console.log(this.state);
//      return true;
//     };
  render() {
    const classes = this.props.classes;
        const { open,secondDialogClose,changeTabIndex } = this.props;
console.log(this.state.index);
    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onRequestClose={() =>this.handleClose("界址标示表")}
          transition={<Slide direction="up" />}
        >
          <AppBar className={classes.appBar}>
             
            <Toolbar>
               <Typography type="title" color="inherit" className={classes.flex}>
                 <Tabs index={this.state.index} onChange={this.handleChange}>
            <Tab label="界址标示表" />
            <Tab label="界址签章表" />
            <Tab label="界址说明表" />
          </Tabs>
              </Typography>
             
                 <IconButton color="contrast" onClick={() =>this.handleClose("界址标示表")} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        {this.state.index === 0 &&
          <TabContainer >
            <h1 >界址标示表</h1>

 <Provider store={store}>  
  
 <BoundaryList />
  
    </Provider>  

          </TabContainer>}
        {this.state.index === 1 &&
          <TabContainer>
              <h1 >界址签章表</h1>
  
          </TabContainer>}
        {this.state.index === 2 &&
          <TabContainer>
              <h1 >界址说明表</h1>
              
          </TabContainer>}
        </Dialog>
      </div>
    );
  }
}

SecondDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  changeTabIndex: PropTypes.number.isRequired,
};

export default withStyles(styleSheet)(SecondDialog);


// Reducer
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
const store = createStore(reducer);

RootReducer.merge(reducer);