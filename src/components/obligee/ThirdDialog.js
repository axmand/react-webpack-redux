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
import InputCell from './InputCell'
const TabContainer = props =>
  <div style={{ padding: 20,overflow:"auto" }}>
    {props.children}
  </div>;

const styleSheet ={
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
            {/* <Provider store={store}> */}

            <table className="mytable">
 
  <tr>
    <td width="108" rowSpan="2"><p >权属调查记事 </p></td>
    <td width="496" valign="top"><InputCell tableIndex="f6" name="PowerInvestigateRecord" title="权属调查记事" tips="填写权属调查记事"/></td>
  </tr>
  <tr>
    <td width="496" valign="bottom"><p>调查员：<InputCell tableIndex="f6" name="PowerInvestigator" title="调查员" tips="填写调查员"/>日期<InputCell  tableIndex="f6" name="PowerInvestigateDate" title="调查日期" tips="填写调查日期"/></p></td>
  </tr>
  <tr>
    <td width="108" rowSpan="2"><p >地籍测量记事 </p></td>
    <td width="496" valign="top"><InputCell tableIndex="f6" name="SurveyRecord" title="地籍测量记事" tips="填写地籍测量记事"/></td>
  </tr>
  <tr>
    <td width="496" valign="bottom"><p>测量人:<InputCell tableIndex="f6" name="SurveyRecorder" title="测量人" tips="填写测量人"/>日期<InputCell tableIndex="f6" name="SurveyRecordDate" title="测量日期" tips="填写测量日期"/></p></td>
  </tr>
  <tr>
    <td width="108" rowSpan="2"><p >地籍调查结果审核意见 </p></td>
    <td width="496" valign="top"><InputCell tableIndex="f6" name="AuditOpinion" title="地籍调查结果审核意见" tips="填写地籍调查结果审核意见"/></td>
  </tr>
  <tr>
    <td width="496" valign="bottom"><p >审核人：<InputCell tableIndex="f6" name="Auditor" title="审核人" tips="填写审核人"/>日期：<InputCell tableIndex="f6" name="AuditOpinionDate" title="审核日期" tips="填写审核日期"/></p></td>
  </tr>
</table>
{/* </Provider> */}
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
const mapStateToProps=(state)=> {
  return {
   open:state.obligeeReducer.thirdDialogOpen
  }
}

// Map Redux actions to component props
const mapDispatchToProps=(dispatch) =>{
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

// Reducer
// function reducer(state = {
 

// }, action) {
  
   
//   let value = state.value;
  
//     switch (action.type) {
  
//       case 'change':
//       var inputName=action.payload.inputName;
      
 
//        var statenew=state;
//        statenew[inputName]=action.payload.inputValue;
      
       
//        return Object.assign({}, state, statenew);


//   case 'changetest':
//    console.log("clicked "+action.payload.row+" "+action.payload.col);

//     var newValue=state[action.payload.type];
//     var type=action.payload.type;
//     newValue[action.payload.row]=action.payload.col;
//     return  Object.assign({}, state, {
    
//       type:newValue
//   });;
//   case 'ZoomToPoint':
//   console.log("clicked "+action.payload.pointName);

//    return state;
  
//       default:
//         return state
//     }
// }

// // Store
// const store = createStore(reducer);

// RootReducer.merge(reducer);