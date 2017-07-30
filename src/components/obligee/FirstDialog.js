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

import InputDialog  from './InputDialog';
//import  Counter from './test'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

const TabContainer = props =>
  <div style={{ padding: 20 }}>
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

class FirstDialog extends Component {
  state = {
    open: false,
    index: 0,
  };
 

  handleChange = (event, index) => {
    this.setState({ index });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const classes = this.props.classes;
    return (
      <div>
           <MenuItem onClick={this.handleOpen}>权籍调查表</MenuItem>
 
        <Dialog
          fullScreen
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          transition={<Slide direction="up" />}
        >
          <AppBar className={classes.appBar}>
             
            <Toolbar>
               <Typography type="title" color="inherit" className={classes.flex}>
                 <Tabs index={this.state.index} onChange={this.handleChange}>
            <Tab label="权利信息" />
            <Tab label="宗地信息" />
            <Tab label="使用信息" />
          </Tabs>
              </Typography>
              <Button color="contrast" onClick={this.handleRequestClose}>
                 <IconButton color="contrast" onClick={this.handleRequestClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              </Button>
              
              
             
            </Toolbar>
          </AppBar>
        {this.state.index === 0 &&
          <TabContainer>
         <Provider store={store}>
    <App />
  </Provider>,
            {/* <InputDialog Title="权利人姓名" Tip="此处填写权利人姓名" DefaultValue="Peter"/>
           <InputDialog Title="通信地址" Tip="此处填写权利人通信地址" DefaultValue="武汉市洪山区珞瑜路129号"/>
         <InputDialog Title="权利人身份证号码" Tip="此处填写权利人身份证号码" DefaultValue="100000001"/> */}
          </TabContainer>}
        {this.state.index === 1 &&
          <TabContainer>
            {'Item Two'}
          </TabContainer>}
        {this.state.index === 2 &&
          <TabContainer>
            {'Item Three'}
          </TabContainer>}
        </Dialog>
      </div>
    );
  }
}

FirstDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(FirstDialog);


// Action
const increaseAction = { type: 'increase' }

// Reducer
function counter(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 1 }
    default:
      return state
  }
}

// Store
const store = createStore(counter)

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}

// Connected Component
 


 class Counter extends Component {
  render() {
    const { value, onIncreaseClick } = this.props
    return (
      <div>
        <p>{value}</p>
        <button onClick={onIncreaseClick}>Increase</button>
      </div>
    )
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired
}
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)