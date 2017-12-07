import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
// import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
// import List, { ListItem, ListItemText } from 'material-ui/List';
// import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
// import Menu, { MenuItem } from 'material-ui/Menu'

import Tabs, { Tab } from 'material-ui/Tabs';
// import Paper from 'material-ui/Paper';
// import Grid from 'material-ui/Grid';
// import RootReducer from './../../redux/RootReducer';
import projectData from './../../redux/RootData'
import appConfig from "../../redux/Config"

// import { createStore } from 'redux'
import { connect } from 'react-redux'
import ObligeeTable1 from './ObligeeTable1'
import ObligeeTable2 from './ObligeeTable2'
import ObligeeTable3 from './ObligeeTable3'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const TabContainer = props =>
  <div style={{ padding: 20 }}>
  
    {props.children}
  </div>;

const styleSheet = {
 
  flex: {
    flex: 1,
  },
   root: {
    flexGrow: 1,
    marginTop: 30,
  },
  
  dialog: {
    width: '900px',
    height: '600px',
    marginTop: 20,
    marginLeft: 30
  },
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};



class FirstDialog extends Component {
  state = {
    open: false,
    index: 0,
  };


  handleChange = (event, index) => {
    this.setState({ index });
  };


  render() {
    const classes = this.props.classes;
    const { 
      open, 
      close,
      // save 
    } = this.props;

    return (
      <div >
        <Dialog

        fullScreen
          open={open}
          onRequestClose={close}
          transition={Transition}
        >
          <AppBar style ={{backgroundColor:"#455A64"}}>

            <Toolbar>
              <Typography type="title" color="inherit" className={classes.flex}>


                <Tabs index={this.state.index} onChange={this.handleChange}>
                  <Tab label="权利信息" />
                  <Tab label="宗地信息" />
                  <Tab label="使用信息" />
                </Tabs>
             
              </Typography>

              <IconButton color="contrast" onClick={close} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div style={{  overflowY: "auto" ,overflowX:"hidden"}}>
          {/* <div style={{  overflowY: "auto"}}> */}
            {this.state.index === 0 &&
              <TabContainer className={classes.container}>

                <h1><br></br>宗地基本信息表</h1>

{/* <Provider store={ObligeeTableStore}> */}
                  <ObligeeTable1 />
{/* </Provider> */}

              </TabContainer>}
            {this.state.index === 1 &&
              <TabContainer>
                <h1 ><br></br>宗地基本信息表</h1>
                {/* <Provider store={ObligeeTableStore}> */}

                  <ObligeeTable2 />

                {/* </Provider> */}
              </TabContainer>}
            {this.state.index === 2 &&
              <TabContainer>
                <h1 ><br></br>宗地基本信息表</h1>
                {/* <Provider store={ObligeeTableStore}> */}

                  <ObligeeTable3 />

                {/* </Provider> */}

              </TabContainer>}
          </div>
        </Dialog>
      </div>
    );
  }
}

FirstDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};




// Map Redux state to component props
function mapStateToProps(state) {
  return {
    open: state.obligeeReducer.firstDialogOpen
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    close: () =>{ dispatch({
      type: 'close',
      payload: {
        choice: 1
      }
    })
    let JsonData = JSON.stringify([projectData.ProjectItem]);
    
          console.log(JsonData)
          fetch(appConfig.fileServiceRootPath + '//project/forms/post', 
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
 
    
  }
}
var FD1 = withStyles(styleSheet)(FirstDialog);
export default connect(mapStateToProps, mapDispatchToProps)(FD1);



