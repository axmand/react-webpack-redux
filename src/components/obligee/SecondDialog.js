import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
// import Button from "material-ui/Button";
import Dialog from "material-ui/Dialog";
// import List, { ListItem, ListItemText } from "material-ui/List";
// import Divider from "material-ui/Divider";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import CloseIcon from "material-ui-icons/Close";
import Slide from "material-ui/transitions/Slide";
// import Menu, { MenuItem } from "material-ui/Menu";

import Tabs, { Tab } from "material-ui/Tabs";
// import Paper from "material-ui/Paper";
// import Grid from "material-ui/Grid";
// import RootReducer from "./../../redux/RootReducer";
//import projectData from './../../redux/RootData'
import appConfig from "../../redux/Config"

// import { createStore } from "redux";
import { connect } from "react-redux";
import BoundaryList from "./BoundaryList";
import BoundarySignature from "./BoundarySignature";
import BoundarySpecification from "./BoundarySpecification";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

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
    if (index === 0) this.props.changeTabIndex0();
    if (index === 1) this.props.changeTabIndex1();
    if (index === 2) this.props.changeTabIndex2();
  };

  render() {
    const classes = this.props.classes;
    const {
      open,
      close,
      tabIndex,
      // changeTabIndex0,
      // changeTabIndex1,
      // changeTabIndex2
    } = this.props;
//封装三个界址表
    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onRequestClose={close}
         
          transition={Transition}
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
const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    close: () =>{ dispatch({
      type: 'close',
      payload: {
        choice: 2
      }
    });
    dispatch({
      type: 'TableData2projectData',
      payload: ownProps
    });
    
  
  
  },

    changeTabIndex0: key =>
      dispatch({
        type: "choose",
        payload: {
          choice: 2,
          data:ownProps.obligeeData
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