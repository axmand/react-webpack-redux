import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
//UI
import Button from 'material-ui/Button';
//图标
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
//img
//自定义
import AddCard from './AddCard'
//redux
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import RootReducer from './../../redux/RootReducer';

const styleSheet = createStyleSheet('SelfCard', theme =>({
  addicon:{
    width: '300px',
    height: '300px',
    padding: '14px 16px 15px',
    margin: '0px',
  }
}));

class SelfCard0 extends Component {

  state = {
    anchorEl: undefined,
    open: false,
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  render(){
    const classes = this.props.classes;

    return (
    <div>
      <IconButton onClick={this.handleClick} className={classes.addicon}>
        <AddIcon button/>
      </IconButton>
      <Provider store={store}> 
        <AddCard />
      </Provider> 
    </div>
  );
  }
}

SelfCard0.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(SelfCard0);

// reducer
function reducer(state = { show:false }, action) {
  const show = state.show
  switch (action.type) {
    case 'showAddCard':
      return { show:!show }
    default:
      return state
  }
}

// Store
const store = createStore(reducer);

RootReducer.merge(reducer);