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
        const { onMyListItemClick1,onMyListItemClick2 } = this.props;
        return (
          <div>
      <List>
       <MyListItem NAME="姓名" name="peter" onClick={onMyListItemClick1}/>
       <MyListItem NAME="身份证号码" name="00001" onClick={onMyListItemClick2}/>
      </List>
      <InputDialog  open={store.getState()}
     />
      </div>
    )
}
}


const reducer = (state =false, action) => {
  switch (action.type) {
    case 'onMyListItemClick1': return true;
    default: return state;
  }
};
const store = createStore(reducer);

/*const render = () => {
  ReactDOM.render(
    <InputDialog
      open={store.getState()}
     
    />,
    document.getElementById('root')
  );
};

render();*/
RootReducer.merge(reducer);
store.subscribe(ObligeeOwnerMessage.props.onMyListItemClick1);
// const mapReduce = (state = 0, action) => {
//     if (action.type === "onMyListItemClick1") {
        
    
//     }
//     if (action.type === "onMyListItemClick2") {
       
       
//     }
//     return state;
// }

// RootReducer.merge(mapReduce);
/**
 * 
 * @param {*} state 
 * @param {*} ownProps 
 */
// const mapStateToProps = (state, ownProps) => {

//     const props=ownProps;

//     return {
//         text: ownProps.ownProps
//     }
// }
// /**
//  * 只对顶层view可见
//  * @param {*} dispatch 
//  * @param {*} ownProps 
//  */
// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {

//         onClick: () => {
//             dispatch({
//                 type: 'menuClick2',
//                 payload: {
//                     hhh: 2
//                 }
//             })
//         },
//         onMyListItemClick1: () => {
//             dispatch({
//                 type: 'onMyListItemClick1',
//                 payload: {
//                     hhh: 2
//                 }
//             })
//         },
// onMyListItemClick2: () => {
//             dispatch({
//                 type: 'onMyListItemClick2',
//                 payload: {
//                     hhh: 2
//                 }
//             })
//         },
//         onMenuItemClick: (text) => {
//             dispatch({
//                 type: 'menuClick',
//                 payload: {
//                     command: text
//                 }
//             });
//         }

//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ObligeeOwnerMessage);
export default ObligeeOwnerMessage;
