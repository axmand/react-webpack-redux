import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import MyListItem from './MyListItem.js';
import RootReducer from './../../redux/RootReducer';
import { connect } from 'react-redux';
import InputDialog from './InputDialog'
import { createStore } from 'redux';

class ObligeeOwnerMessage extends Component {
   
 render() {
        const { open,onMyListItemCLOSE,onMyListItemOPEN } = this.props
        return (
          <div>
             <InputDialog  open={open} close={onMyListItemCLOSE}  />
            <List>
              <MyListItem NAME="姓名" name="peter" onClick={onMyListItemOPEN}/>
              
            </List>
      </div>
    )
}


}


const reducer = (state ={ open: false }, action) => {
  switch (action.type) {
    case 'onMyListItemOPEN': 
    {
      console.log("onMyListItemOPEN");
      
       return {open:true};
    }
     case 'onMyListItemCLOSE': 
    {
      console.log("onMyListItemCLOSE");
      return {open:false};
    }
    default: return {open:false};
  }
};
const store = createStore(reducer);


RootReducer.merge(reducer);

function mapStateToProps(state) {
  return {
    open: state.open
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onMyListItemCLOSE:  () => store.dispatch({type: 'onMyListItemCLOSE'}),
     onMyListItemOPEN: () => store.dispatch({type: 'onMyListItemOPEN'})
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(ObligeeOwnerMessage);
