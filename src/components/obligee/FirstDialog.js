import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
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

import  InputCell from './InputCell'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

const TabContainer = props =>
  <div style={{ padding: 20 }}>
    {props.children}
  </div>;

const styleSheet = createStyleSheet('FirstDialog', {
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
  table :{
    width: "100%",
    border:1,
    cellSpacing:1 
  }

});

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styleSheet2 = createStyleSheet('BasicTabs', theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
}));

class FirstDialog extends Component {
  state = {
    open: false,
    index: 0,
  };
 

  handleChange = (event, index) => {
    this.setState({ index });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const classes = this.props.classes;
    return (
      <div>
           <MenuItem onClick={this.handleOpen}>权籍调查表</MenuItem>
 
        <Dialog
          fullScreen
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          transition={<Slide direction="up" />}
        >
          <AppBar className={classes.appBar}>
             
            <Toolbar>
               <Typography type="title" color="inherit" className={classes.flex}>
                 <Tabs index={this.state.index} onChange={this.handleChange}>
            <Tab label="权利信息" />
            <Tab label="宗地信息" />
            <Tab label="使用信息" />
          </Tabs>
              </Typography>
              <Button color="contrast" onClick={this.handleRequestClose}>
                 <IconButton color="contrast" onClick={this.handleRequestClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              </Button>
              
              
             
            </Toolbar>
          </AppBar>
        {this.state.index === 0 &&
          <TabContainer>
<div>
<table  border= "1" cellSpacing="0" cellPadding="0" width="100%">
  <tbody>
  <tr>
    <td colSpan="18"><p ><strong>宗地基本信息表 </strong></p></td>
  </tr>
  <tr>
    <td width="9%" rowSpan="5"><p >权利人<strong> </strong></p></td>
    <td width="17%"><p >所有权 </p></td>
    <td colSpan="16"><p >/ </p></td>
  </tr>
  <tr>
    <td width="17%" rowSpan="4"><p >使用权 </p></td>
    <td colSpan="5" rowSpan="4"><p >xxxxxxxxxxxxx</p></td>
    <td colSpan="7"><p >权利人类型 </p></td>
    <td colSpan="4"><p >企业 </p></td>
  </tr>
  <tr>
    <td colSpan="7"><p >证件种类 </p></td>
    <td colSpan="4"><p >营业执照 </p></td>
  </tr>
  <tr>
    <td colSpan="7"><p >证件号 </p></td>
    <td colSpan="4"><p >xxxxxxx</p></td>
  </tr>
  <tr>
    <td colSpan="7"><p >通讯地址 </p></td>
    <td colSpan="4"><p >&nbsp;</p></td>
  </tr>
  <tr>
    <td colSpan="2"><p >权利类型 </p></td>
    <td colSpan="4"><p >国有建设用地使用权 </p></td>
    <td colSpan="5"><p >权利性质 </p></td>
    <td colSpan="3"><p >出让 </p></td>
    <td colSpan="3"><p >土地权属来源证明材料 </p></td>
    <td width="23%"><p >&nbsp;</p></td>
  </tr>
  <tr>
    <td colSpan="2"><p >坐落 </p></td>
    <td colSpan="16"><p >南宁市五象新区云村路南侧、英岭路东侧 </p></td>
  </tr>
  <tr>
    <td colSpan="2" rowSpan="2"><p >法定代表人 <br />
      或负责人姓名 </p></td>
    <td width="13%" rowSpan="2"><p >赵勇 </p></td>
    <td colSpan="5"><p >证件种类 </p></td>
    <td colSpan="7"><p >身份证 </p></td>
    <td width="10%" rowSpan="2"><p >电话 </p></td>
    <td colSpan="2" rowSpan="2"><p >&nbsp;</p></td>
  </tr>
  <tr>
    <td colSpan="5"><p >证件号 </p></td>
    <td colSpan="7"><p >xxxxxxxxxxxxxxx</p></td>
  </tr>
  <tr>
    <td colSpan="2" rowSpan="2"><p >代理人姓名 </p></td>
    <td width="13%" rowSpan="2"><p >&nbsp;</p></td>
    <td colSpan="5"><p >证件种类 </p></td>
    <td colSpan="7"><p >&nbsp;</p></td>
    <td width="10%" rowSpan="2"><p >电话 </p></td>
    <td colSpan="2" rowSpan="2"><p >&nbsp;</p></td>
  </tr>
  <tr>
    <td colSpan="5"><p >证件号 </p></td>
    <td colSpan="7"><p >&nbsp;</p></td>
  </tr>
  <tr>
    <td colSpan="2"><p >权利设定方式<u> </u></p></td>
    <td colSpan="16"><p >地表 </p></td>
  </tr>
  <tr>
    <td colSpan="2"><p >国民经济行业 <br />
      分类代码 </p></td>
    <td colSpan="16"><p >&nbsp;</p></td>
  </tr>
  <tr>
    <td colSpan="2"><p >预编宗地代码 </p></td>
    <td colSpan="8"><p >&nbsp;</p></td>
    <td colSpan="3"><p >宗地代码 </p></td>
    <td colSpan="5"><p >450108001206GB00137</p></td>
  </tr>
  <tr>
    <td colSpan="2"><p >不动产单元号 </p></td>
    <td colSpan="16"><p >450108001206GB00137W00000000</p></td>
  </tr>
  <tr>
    <td colSpan="2" rowSpan="2"><p >所在图幅号 </p></td>
    <td colSpan="3"><p >比例尺 </p></td>
    <td colSpan="13"><p >1:500</p></td>
  </tr>
  <tr>
    <td colSpan="3"><p >图幅号 </p></td>
    <td colSpan="13"><p >5100053700,5102553700</p></td>
  </tr>

  </tbody>
</table>
  </div>
          {/* <Provider store={store}> 
    <InputCell />
   </Provider>  */}
            {/* <InputDialog Title="权利人姓名" Tip="此处填写权利人姓名" DefaultValue="Peter"/>
           <InputDialog Title="通信地址" Tip="此处填写权利人通信地址" DefaultValue="武汉市洪山区珞瑜路129号"/>
         <InputDialog Title="权利人身份证号码" Tip="此处填写权利人身份证号码" DefaultValue="100000001"/> */}
          </TabContainer>}
        {this.state.index === 1 &&
          <TabContainer>
            {'Item Two'}
          </TabContainer>}
        {this.state.index === 2 &&
          <TabContainer>
            {'Item Three'}
          </TabContainer>}
        </Dialog>
      </div>
    );
  }
}

FirstDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(FirstDialog);


// Reducer
function reducer(state = { value:"peter",show:false }, action) {
  const value = state.value
   const show = state.show
  switch (action.type) {
    case 'showInputDialog':
      return { value:value,show:!show }
    
    case 'completeInput':
     return { value:action.payload.inputValue,show:!show }
      
    default:
      return state
  }
}

// Store
const store = createStore(reducer);

RootReducer.merge(reducer);