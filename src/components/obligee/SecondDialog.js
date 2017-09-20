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
import BoundaryList from './BoundaryList'
import BoundarySignature from './BoundarySignature'
import BoundarySpecification from './BoundarySpecification'
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

class SecondDialog extends Component {


  handleChange = (event, index) => {
    if(index==0)
      this.props.changeTabIndex0();
     if(index==1)
       this.props.changeTabIndex1();
      if(index==2)
       this.props.changeTabIndex2();
  };



  render() {
    //const classes = this.props.classes;
        const { open,close,tabIndex,changeTabIndex0, changeTabIndex1,changeTabIndex2,classes} = this.props;

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
                 <Tabs index={tabIndex} onChange={this.handleChange}>
            <Tab label="界址标示表" />
            <Tab label="界址签章表" />
            <Tab label="界址说明表" />
          </Tabs>
              </Typography>
             
                 <IconButton color="contrast" onClick={close} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        {tabIndex === 0 &&
          <TabContainer >
             

            <h1 ><br></br>界址标示表</h1>

 <Provider store={store}>  
  
 <BoundaryList />
  
    </Provider>  

          </TabContainer>}
        {tabIndex === 1 &&
          <TabContainer>
           
              <h1 ><br></br>界址签章表</h1>
              <Provider store={store}>
   <BoundarySignature/>
   </Provider>
          </TabContainer>}
        {tabIndex === 2 &&
          <TabContainer>
            
              <h1 ><br></br>界址说明表</h1>

              <Provider store={store}>  
  
              <BoundarySpecification />  
    </Provider>  
            
          </TabContainer>}
        </Dialog>
      </div>
    );
  }
}

SecondDialog.propTypes = {
  
  tabIndex: PropTypes.number.isRequired,
};

//export default withStyles(styleSheet)(SecondDialog);


// Map Redux state to component props
function mapStateToProps(state) {
  return {
   open:state.secondDialogOpen,
   tabIndex:state.secondTabIndex
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
   close: () => dispatch({
                type: 'close',
                payload: {
                    choice: 2,
                    tab:this.tabIndex
                }
            }),
  
 changeTabIndex0: (key) => dispatch({
                type: 'choose',
                payload: {
                    choice: 2
                }
            }),
   changeTabIndex1: (key) => dispatch({
                type: 'choose',
                payload: {
                    choice: 3
                }
            }),

    changeTabIndex2: (key) => dispatch({
                type: 'choose',
                payload: {
                    choice: 4
                }
            }),
  
  }
}

var SD1=withStyles(styleSheet)(SecondDialog);
export default connect(mapStateToProps, mapDispatchToProps)(SD1);


// Reducer
function reducer(state = {
  "PowerInvestigateRecord": "阿瑟将军啊当时就觉得啊抗静电架空啊手机导航系啊是的吉萨还多久啊是和撒谎觉得好看和",
  "PowerInvestigator": "罗志祥",
  "PowerInvestigateDate": "2009-22-21",
  "SurveyRecord": "实打实大苏打实打实大苏打撒大苏打",
  "SurveyRecorder": "李天乐",
  "SurveyRecordDate": "2120-22-11",
  "AuditOpinion": "是顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶",
  "Auditor": "科技大厦",
  "AuditOpinionDate": "2008-22-21",

  
    "StartPointCodeList": [
        "011DBA2",
        "011DBB",
        "011DBC",
        "011DBD"
    ],
    "InnerPointCodeList": [
        "011LLL",
        "011OOO",
        "011VVV",
        "011UUU"
    ],
    "EndPointCodeList": [
        "011DBB",
        "011DBC",
        "011DBD",
        "011DBE"
    ],
    
    "LandPointCodeList": [
      "Google",
      "Runoob",
      "Taobao",
      "sasasas"
  ],
  "LandPointTypeList": [
      0,
      2,
      3,
      2
  ],
  "LandPointDistance": [
      212.212,
      545.212,
      22.31
  ],
  "LandBoundaryType": [
      2,
      1,
      7
  ],
  "LandBoundaryLocation": [
      1,
      0,
      2
  ],
  "LandBoundaryExplain": [
      "啦啦啦啦",
      "啊啊啊",
      "鲁鲁萨撒"
  ],
  "BoundaryPointExplain": "南宁市国土测绘地理信息中啊阿斯顿撒旦啊是打工皇帝沙发国际化啊规划鬼斧神工就空格键公司的感觉是感觉啊高房价撒个心",
  "MainBoundaryDirectionExplain": "所有权方名称是顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶打到阿萨 大师大师哒的啊哒大师哒"


}, action) {
  
   
  let value = state.value;
  
    switch (action.type) {
  
      case 'change':
      var inputName=action.payload.inputName;
      
 
       var statenew=state;
       statenew[inputName]=action.payload.inputValue;
      
       
       return Object.assign({}, state, statenew);


  case 'changetest':
   console.log("clicked "+action.payload.row+" "+action.payload.col);

    var newValue=state[action.payload.type];
    var type=action.payload.type;
    newValue[action.payload.row]=action.payload.col;
    return  Object.assign({}, state, {
    
      type:newValue
  });;
  case 'ZoomToPoint':
  console.log("clicked "+action.payload.pointName);

   return state;
  
      default:
        return state
    }
}

// Store
const store = createStore(reducer);

RootReducer.merge(reducer);