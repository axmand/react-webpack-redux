import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Dialog from "material-ui/Dialog";
import List, { ListItem, ListItemText } from "material-ui/List";
import Divider from "material-ui/Divider";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import CloseIcon from "material-ui-icons/Close";
import Slide from "material-ui/transitions/Slide";
import Menu, { MenuItem } from "material-ui/Menu";

import Tabs, { Tab } from "material-ui/Tabs";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import RootReducer from "./../../redux/RootReducer";
import projectData from './../../redux/RootData'

import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import BoundaryList from "./BoundaryList";
import BoundarySignature from "./BoundarySignature";
import BoundarySpecification from "./BoundarySpecification";
const TabContainer = props => (
  <div style={{ padding: 20, overflow: "auto" }}>{props.children}</div>
);

const styleSheet = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  paper: {
    padding: 16,
    textAlign: "center"
  },

  dialog: {
    width: "900px",
    height: "600px",
    marginTop: 20
    //marginLeft: 50
  }
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
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
    if (index == 0) this.props.changeTabIndex0();
    if (index == 1) this.props.changeTabIndex1();
    if (index == 2) this.props.changeTabIndex2();
  };

  render() {
    const classes = this.props.classes;
    const {
      open,
      close,
      tabIndex,
      changeTabIndex0,
      changeTabIndex1,
      changeTabIndex2
    } = this.props;

    return (
      <div>
        <Dialog
          //fullScreen
          open={open}
          onRequestClose={close}
          className={classes.dialog}
          transition={<Slide direction="up" />}
        >
          <AppBar style={{ backgroundColor: "#455A64" }}>
            <Toolbar>
              <Typography type="title" color="inherit" className={classes.flex}>
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
          {tabIndex === 0 && (
            <TabContainer>
              <h1>
                <br />界址标示表
              </h1>

              {/* <Provider store={store}>   */}

              <BoundaryList tableIndex="F2" />

              {/* </Provider>   */}
            </TabContainer>
          )}
          {tabIndex === 1 && (
            <TabContainer>
              <h1>
                <br />界址签章表
              </h1>
              {/* <Provider store={store}> */}
              <BoundarySignature tableIndex="F3" />
              {/* </Provider> */}
            </TabContainer>
          )}
          {tabIndex === 2 && (
            <TabContainer>
              <h1>
                <br />界址说明表
              </h1>

              {/* <Provider store={store}>   */}

              <BoundarySpecification tableIndex="F5" />
              {/* </Provider>   */}
            </TabContainer>
          )}
        </Dialog>
      </div>
    );
  }
}

SecondDialog.propTypes = {
  tabIndex: PropTypes.number.isRequired
};

//export default withStyles(styleSheet)(SecondDialog);

// Map Redux state to component props
const mapStateToProps = state => {
  return {
    open: state.obligeeReducer.secondDialogOpen,
    tabIndex: state.obligeeReducer.secondTabIndex
  };
};

// Map Redux actions to component props
const mapDispatchToProps = dispatch => {
  return {
    close: () =>{ dispatch({
      type: 'close',
      payload: {
        choice: 2
      }
    })
    let JsonData = JSON.stringify([projectData.ProjectItem]);
    
          console.log(JsonData)
          fetch('http://172.16.102.90:1338//project/forms/post', 
          { 
          method: 'POST', 
          // headers: {
          //   //  "Access-Control-Allow-Origin": "*",
          //   // 'Content-Type': 'x-www-form-urlencoded;charset=UTF-8',
          //   // 'Accept': 'application/json',
          //   'Content-Type': 'application/json',
          //   //  'Content-Type': 'text/plain', 
          // }, 
          // body: params(JsonData) 
          body: JsonData
          })
        .then(response => response.json())
        .then( json => {
          // dispatch({
          //   type: 'handleOutput',
          //   payload: json,
          // })
          console.log(json)})
          .catch(err => {
            console.log(err)
          })
  
  
  },

    changeTabIndex0: key =>
      dispatch({
        type: "choose",
        payload: {
          choice: 2
        }
      }),
    changeTabIndex1: key =>
      dispatch({
        type: "choose",
        payload: {
          choice: 3
        }
      }),

    changeTabIndex2: key =>
      dispatch({
        type: "choose",
        payload: {
          choice: 4
        }
      })
  };
};

var SD1 = withStyles(styleSheet)(SecondDialog);
export default connect(mapStateToProps, mapDispatchToProps)(SD1);

// // Reducer
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

//RootReducer.merge(reducer);
