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
  <div style={{ padding: 20,overflow:"auto" }}>
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
    //this.setState({ open: false });
    //this.props.open=false;
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const classes = this.props.classes;
        const { open,firstDialogClose } = this.props;

    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onRequestClose={firstDialogClose}
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
              <Button color="contrast" onClick={firstDialogClose}>
                 <IconButton color="contrast" onClick={firstDialogClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              </Button>
              
              
             
            </Toolbar>
          </AppBar>
        {this.state.index === 0 &&
          <TabContainer >
            <h1 >宗地基本信息表</h1>

<Provider store={store}> 
  
  <table className="mytable">
    
    <tbody >

  <tr>
   
    <td width="9%" rowSpan="5"><InputCell /></td> 
    <td width="18%"><p >所有权 </p></td>
    <td width="72%" colSpan="16"><p >/ </p></td>
  </tr>
  <tr>
    <td width="18%" rowSpan="4"><p >使用权 </p></td>
    <td width="21%" colSpan="5" rowSpan="4"><p >xxxxxxxxxxxxx</p></td>
    <td width="23%" colSpan="7"><p >权利人类型 </p></td>
    <td width="27%" colSpan="4"><p >企业 </p></td>
  </tr>
  <tr>
    <td width="23%" colSpan="7"><p >证件种类 </p></td>
    <td width="27%" colSpan="4"><p >营业执照 </p></td>
  </tr>
  <tr>
    <td width="23%" colSpan="7"><p >证件号 </p></td>
    <td width="27%" colSpan="4"><p >xxxxxxx</p></td>
  </tr>
  <tr>
    <td width="23%" colSpan="7"><p >通讯地址 </p></td>
    <td width="27%" colSpan="4"><p >&nbsp;</p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >权利类型 </p></td>
    <td width="14%" colSpan="4"><p >国有建设用地使用权 </p></td>
    <td width="15%" colSpan="5"><p >权利性质 </p></td>
    <td width="14%" colSpan="3"><p >出让 </p></td>
    <td width="12%" colSpan="3"><p >土地权属来源证明材料 </p></td>
    <td width="14%"><p >&nbsp;</p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >坐落 </p></td>
    <td width="72%" colSpan="16"><p >南宁市五象新区云村路南侧、英岭路东侧 </p></td>
  </tr>
 <tr>
    <td width="27%" colSpan="2" rowSpan="2"><p >法定代表人 <br />
      或负责人姓名 </p></td>
    <td width="11%" rowSpan="2"><p >赵勇 </p></td>
    <td width="11%" colSpan="5"><p >证件种类 </p></td>
    <td width="23%" colSpan="7"><p >身份证 </p></td>
    <td width="7%" rowSpan="2"><p >电话 </p></td>
    <td width="17%" colSpan="2" rowSpan="2"><p >&nbsp;</p></td>
  </tr>
  <tr>
    <td width="11%" colSpan="5"><p >证件号 </p></td>
    <td width="23%" colSpan="7"><p >xxxxxxxxxxxxxxx</p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2" rowSpan="2"><p >代理人姓名 </p></td>
    <td width="11%" rowSpan="2"><p >&nbsp;</p></td>
    <td width="11%" colSpan="5"><p >证件种类 </p></td>
    <td width="23%" colSpan="7"><p >&nbsp;</p></td>
    <td width="7%" rowSpan="2"><p >电话 </p></td>
    <td width="17%" colSpan="2" rowSpan="2"><p >&nbsp;</p></td>
  </tr>
  <tr>
    <td width="11%" colSpan="5"><p >证件号 </p></td>
    <td width="23%" colSpan="7"><p >&nbsp;</p></td>
  </tr>
  
   </tbody>
</table>
  
   </Provider> 

          </TabContainer>}
        {this.state.index === 1 &&
          <TabContainer>
              <h1 >宗地基本信息表</h1>
  <table className="mytable">
     
    <tbody >
  <tr>
    <td width="27%" colSpan="2"><p >权利设定方式<u> </u></p></td>
    <td width="72%" colSpan="16"><p >地表 </p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >国民经济行业 <br />
      分类代码 </p></td>
    <td width="72%" colSpan="16"><p >&nbsp;</p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >预编宗地代码 </p></td>
    <td width="25%" colSpan="8"><p >&nbsp;</p></td>
    <td width="14%" colSpan="3"><p >宗地代码 </p></td>
    <td width="32%" colSpan="5"><p >450108001206GB00137</p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >不动产单元号 </p></td>
    <td width="72%" colSpan="16"><p >450108001206GB00137W00000000</p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2" rowSpan="2"><p >所在图幅号 </p></td>
    <td width="13%" colSpan="3"><p >比例尺 </p></td>
    <td width="59%" colSpan="13"><p >1:500</p></td>
  </tr>
  <tr>
    <td width="13%" colSpan="3"><p >图幅号 </p></td>
    <td width="59%" colSpan="13"><p >5100053700,5102553700</p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2" rowSpan="4"><p >宗地四至 </p></td>
    <td width="72%" colSpan="16"><p >北：011DBL-011DBG云村路 </p></td>
  </tr>
  <tr>
    <td width="72%" colSpan="16"><p >东：011DBG-011DBQ南宁市国圳投资有限公司 </p></td>
  </tr>
  <tr>
    <td width="72%" colSpan="16"><p >南：011DBQ-011DBP国有土地 </p></td>
  </tr>
  <tr>
    <td width="72%" colSpan="16"><p >西：011DBP-011DBL英岭路 </p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >等级 </p></td>
    <td width="24%" colSpan="7"><p >&nbsp;</p></td>
    <td width="22%" colSpan="6"><p >价格（元） </p></td>
    <td width="25%" colSpan="3"><p >&nbsp;</p></td>
  </tr>
 
   </tbody>
</table>
          </TabContainer>}
        {this.state.index === 2 &&
          <TabContainer>
              <h1 >宗地基本信息表</h1>
             <table className="mytable">
     
    <tbody >

  <tr>
    <td width="27%" colSpan="2" rowSpan="2"><p >批准用途 </p></td>
    <td width="24%" colSpan="7"><p >工业用地 </p></td>
    <td width="14%" colSpan="3" rowSpan="2"><p >实际用途 </p></td>
    <td width="33%" colSpan="6"><p >工业用地 </p></td>
  </tr>
  <tr>
    <td width="12%" colSpan="2"><p >地类编码 </p></td>
    <td width="12%" colSpan="5"><p >061</p></td>
    <td width="18%" colSpan="5"><p >地类编码 </p></td>
    <td width="14%"><p >061</p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2" rowSpan="2"><p >批准面积（m2） </p></td>
    <td width="12%" colSpan="2" rowSpan="2"><p >13110.17</p></td>
    <td width="12%" colSpan="5" rowSpan="2"><p >宗地面积（m2） </p></td>
    <td width="14%" colSpan="3" rowSpan="2"><p >13110.17</p></td>
    <td width="18%" colSpan="5"><p >建筑占地 <br />
      总面积(m2) </p></td>
    <td width="14%"><p >&nbsp;</p></td>
  </tr>
  <tr>
    <td width="18%" colSpan="5"><p >建筑总面积(m2) </p></td>
    <td width="14%"><p >&nbsp;</p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >土地使用期限 </p></td>
    <td width="72%" colSpan="16"><p >2016年11月01日起2066年11月01日止 </p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >共有／共用权利人 <br />
      情况 </p></td>
    <td width="72%" colSpan="16"><p>&nbsp;</p></td>
  </tr>
  <tr>
    <td width="27%" colSpan="2"><p >说明 </p></td>
    <td width="72%" colSpan="16"><p >&nbsp;</p></td>
  </tr> 
   </tbody>
</table>
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