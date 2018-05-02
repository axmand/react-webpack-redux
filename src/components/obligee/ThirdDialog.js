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
//import projectData from './../../redux/RootData'
import appConfig from "../../redux/Config"

// import { createStore } from 'redux'
import { connect } from 'react-redux'
// import ObligeeTable1 from './ObligeeTable1'
// import ObligeeTable2 from './ObligeeTable2'
// import ObligeeTable3 from './ObligeeTable3'
import InputCell from './InputCell'
// import { Transitions } from 'material-ui/styles/transitions';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const TabContainer = props =>
  <div style={{ padding: 20,  overflowY: "auto" ,overflowX:"hidden"}}>
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
          <div style={{  overflowY: "auto" }}>
          
          <TabContainer >
            <h1><br></br>调查审核表</h1>
          

            <table className="mytable">
            <tr>
    <td width="200" height="118" rowSpan="2">权属调查记事</td>
    <td colSpan="4"><InputCell tableIndex="F6" name="PowerInvestigateRecord" title="权属调查记事" tips="填写权属调查记事"/></td>
  </tr>
  <tr>
   
    <td width="250">调查员</td>
    <td width="250"><InputCell tableIndex="F6" name="PowerInvestigator" title="调查员" tips="填写调查员"/></td>
    <td width="249">日期</td>
    <td width="250"><InputCell  tableIndex="F6" name="PowerInvestigateDate" title="调查日期" tips="填写调查日期"/></td>
  </tr>
  <tr>
    <td width="200" height="140" rowSpan="2">地籍测量记事</td>
    <td colSpan="4"><InputCell tableIndex="F6" name="SurveyRecord" title="地籍测量记事" tips="填写地籍测量记事"/></td>
  </tr>
  <tr>
   
    <td width="250">测量人</td>
    <td><InputCell tableIndex="F6" name="SurveyRecorder" title="测量人" tips="填写测量人"/></td>
    <td>日期</td>
    <td><InputCell tableIndex="F6" name="SurveyRecordDate" title="测量日期" tips="填写测量日期"/></td>
  </tr>
  <tr>
    <td width="200" height="161" rowSpan="2">地籍调查结果审核意见</td>
    <td colSpan="4"><InputCell tableIndex="F6" name="AuditOpinion" title="地籍调查结果审核意见" tips="填写地籍调查结果审核意见"/></td>

  </tr>
  <tr>
    <td width="250">审核人</td>
    <td><InputCell tableIndex="F6" name="Auditor" title="审核人" tips="填写审核人"/></td>
    <td>日期</td>
    <td><InputCell tableIndex="F6" name="AuditOpinionDate" title="审核日期" tips="填写审核日期"/></td>
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
    close: () =>{ dispatch({
      type: 'close',
      payload: {
        choice: 5
      }
    })
   
  
  },
  }
}
var TD1=withStyles(styleSheet)(ThirdDialog);
export default connect(mapStateToProps, mapDispatchToProps)(TD1);

