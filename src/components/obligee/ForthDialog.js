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
import CommonAreaTable from './CommonAreaTable'
import projectData from './../../redux/RootData'
import appConfig from "../../redux/Config"

import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

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
  dialog: {
    width: '840px',
    height: '600px',
    marginTop: "30px",
    marginLeft: "8%",
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

class ForthDialog extends Component {


  render() {
    const classes = this.props.classes;
        const { open,close } = this.props;

    return (
      <div>
        <Dialog
        className={classes.dialog}

          open={open}
          onRequestClose={close}
<<<<<<< HEAD
=======
          transition={Transition}
>>>>>>> 19ee0dc32aaeb663c4b565b75af660d2007f3fbc
        >
        <AppBar style ={{backgroundColor:"#455A64"}}>

             
            <Toolbar>
              <Typography type="title" color="inherit"  className={classes.flex}>
                 
              </Typography>
             
                 <IconButton color="contrast" onClick={close} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div style={{  overflowY: "auto" ,overflowX:"hidden"}}>
          
          <TabContainer >

            <h1><br></br>共有/共用宗地面积分摊表</h1>

            {/* <Provider store={ObligeeTableStore}> */}

            <CommonAreaTable tableIndex="F7"/>
            
                {/* </Provider> */}
  
          </TabContainer>
        
        
             </div>
        </Dialog>
      </div>
    );
  }
}

ForthDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};




// Map Redux state to component props
const mapStateToProps=(state)=> {
  return {
   open:state.obligeeReducer.forthDialogOpen
  }
}

// Map Redux actions to component props
const mapDispatchToProps=(dispatch)=> {
  return {
  

            close: () =>{ dispatch({
              type: 'close',
              payload: {
                choice: 6
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
var FD1=withStyles(styleSheet)(ForthDialog);

export default connect(mapStateToProps, mapDispatchToProps)(FD1);


