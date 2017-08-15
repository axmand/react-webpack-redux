import React, {Component} from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'

import ChooseDialog from './ChooseDialog'
import Menu, { MenuItem } from 'material-ui/Menu'
import FirstDialog from './FirstDialog'
import SecondDialog from './SecondDialog'
import ThirdDialog from './ThirdDialog'
import ForthDialog from './ForthDialog'
import { Provider, connect } from 'react-redux'
import RootReducer from './../../redux/RootReducer';
import { createStore } from 'redux'
const styleSheet = createStyleSheet('ObligeeModule', theme => ({
 
}));
const DialogState={
  open: false,
  selectedValue: "",
  firstDialogOpen:false,
  secondDialogOpen:false,
  secondTabIndex:0,
  thirdDialogOpen:false,
  forthDialogOpen:false  
};
class ObligeeModule extends Component {

  // state = {
  //   anchorEl: undefined,
  //   open: false,
  //   selectedValue:"",
  //   firstDialogOpen:false,
  //   secondDialogOpen:false,
  //   secondTabIndex:0,
  //   thirdDialogOpen:false,
  //   forthDialogOpen:false
  // }



  render() {
    const classes = this.props.classes
  
    return (
              <Provider store={store}>  

      <div>
        


  
 
       
          <ChooseDialog projectName="项目二"/>
         

          <FirstDialog   />
          <SecondDialog   />
          <ThirdDialog  />
  <ForthDialog />
   
      </div>
       </Provider>  
    )
  }

}

export default withStyles(styleSheet)(ObligeeModule);

// Reducer
function obligeeReducer(state = DialogState, action) {
  
   
  switch (action.type) {
    case 'search':
      alert("属性查询");
    return state;
    
    case 'clickIcon':
    return Object.assign({}, state, {
        	open:true
      });
  case 'closeChoose':
  return Object.assign({}, state, {
        	open:false
      });
    case 'choose':
    switch(action.payload.choice)
    {
      case 1:return Object.assign({}, state, {
        open: false,
        	firstDialogOpen:true
      });

      case 2:return Object.assign({}, state, {
        open: false,
          secondDialogOpen:true,
          secondTabIndex:0
      });

      case 3:return Object.assign({}, state, {
        open: false,
          secondDialogOpen:true,
          secondTabIndex:1
      });

      case 4:return Object.assign({}, state, {
        open: false,
          secondDialogOpen:true,
          secondTabIndex:2
      });

      case 5:return Object.assign({}, state, {
        open: false,
        thirdDialogOpen:true
      });

      case 6:return Object.assign({}, state, {
        open: false,
        	forthDialogOpen:true
      });
    }
   
     case 'close':
  
   switch(action.payload.choice)
    {
      case 1:return Object.assign({}, state, {
        	firstDialogOpen:false
      });

      case 2:return Object.assign({}, state, {
        	secondDialogOpen:false
      });

      case 3:return Object.assign({}, state, {
        	secondDialogOpen:false
      });

      case 4:return Object.assign({}, state, {
        	secondDialogOpen:false
      });

      case 5:return Object.assign({}, state, {
        	thirdDialogOpen:false
      });

      case 6:return Object.assign({}, state, {
        	forthDialogOpen:false
      });
    }
    default:
      return state
  }
}

// Store
const store = createStore(obligeeReducer);

RootReducer.merge(obligeeReducer);