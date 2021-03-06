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
// import Tabs, { Tab } from 'material-ui/Tabs';
// import Paper from 'material-ui/Paper';
// import Grid from 'material-ui/Grid';
// import RootReducer from './../../redux/RootReducer';
import CommonAreaTable from './CommonAreaTable'
//import projectData from './../../redux/RootData'
import appConfig from "../../redux/Config"

// import { createStore } from 'redux'
import { connect } from 'react-redux'

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


class ForthDialog extends Component {
//用于封装共有独有土地信息

  render() {
    const classes = this.props.classes;
        const { open,close } = this.props;

    return (
      <div>
        <Dialog
        fullScreen

          open={open}
          onRequestClose={close}
          transition={Transition}
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


            <CommonAreaTable tableIndex="F7"/>
            
  
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
const mapDispatchToProps=(dispatch,ownProps)=> {
  return {
  

            close: () =>{ dispatch({
              type: 'close',
              payload: {
                choice: 6
              }
            });
                dispatch({
      type: 'TableData2projectData',
      payload: ownProps
    });
           
          },
  }
}
var FD1=withStyles(styleSheet)(ForthDialog);

export default connect(mapStateToProps, mapDispatchToProps)(FD1);


