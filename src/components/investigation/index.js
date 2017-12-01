import React, {Component} from 'react'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux';

import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import ContactsIcon from 'material-ui-icons/Contacts';
// import FontAwesome from 'react-fontawesome'
// import DevicesIcon from 'material-ui-icons/Devices'
import Menu, { MenuItem } from 'material-ui/Menu'

import IdentityVerificationModule from './IdentityVerificationModule'
import LandInfoQueryModule from './LandInfoQueryModule'
import RootReducer from '../../redux/RootReducer';

const styles = {
  listitem: {
    flexDirection: 'column',
    justifyContent: 'center ',
    // paddingTop: "15%",
    // paddingBottom: "15%",
  },
  listItemIcon: {
    width: "40%",
    height: "40%",
    margin: 0,
    color: "#C1C6C9"
  },
  listItemText: {
    fontSize: '1em',
    color: '#ffffff',
    fontFamily: "微软雅黑",
    fontWeight: 'bold',
    padding: '0px',
  },
}

class InvestigationModule extends Component {

  state = {
    anchorEl: undefined,
    open: false,
  }

   handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  render() {
    const {
      classes,
      IDCardNumber,
      IDCardName,
      OwnPowerSide,
      ParcelCode,
      TuDiZhengShuHao,
      TuDiZuoLuo,
      handleOpenIdentityVerificationModule,
    } = this.props
  
    return (
      <div>
        <ListItem button className={classes.listitem} disableGutters={true} onClick={this.handleClick}>
          <ListItemIcon>
            <ContactsIcon className={classes.listItemIcon}/>
          </ListItemIcon>            
          <ListItemText
            primary="调查取证"
            disableTypography={true}
            className={classes.listItemText}
          />
        </ListItem>
        <Menu
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={this.handleRequestClose}>照片</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>音频</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>指纹</MenuItem>
          <MenuItem onClick={handleOpenIdentityVerificationModule}>身份证</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>其他证明文件</MenuItem>
        </Menu>
        <IdentityVerificationModule
          IDCardNumber={IDCardNumber}
          IDCardName={IDCardName}
        />
        <LandInfoQueryModule 
          OwnPowerSide={OwnPowerSide}
          ParcelCode={ParcelCode}
          TuDiZhengShuHao={TuDiZhengShuHao}
          TuDiZuoLuo={TuDiZuoLuo}
        />
      </div>
    )
  } 
}

const mapStateToProps = (state) => {
  const investigationState = state.investigationReduce;
  return {
    IDCardNumber: investigationState.IDCardNumber,
    IDCardName: investigationState.IDCardName,
    OwnPowerSide: investigationState.OwnPowerSide,
    ParcelCode: investigationState.ParcelCode,
    TuDiZhengShuHao: investigationState.TuDiZhengShuHao,
    TuDiZuoLuo: investigationState.TuDiZuoLuo,
    investigationMenuDisplayState: investigationState.investigationMenuDisplayState,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleOpenIdentityVerificationModule: () => {
      dispatch({
        type: "OPEN_IDENTITY_VERIFICATION_MODULE"
      })
    }
	} 
}  	

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles,{name:'InvestigationModule'})(InvestigationModule));

const investigationReduce = (
  state = {
    IDCardNumber: '',
    IDCardName: '',
    OwnPowerSide: '',
    ParcelCode: '',
    TuDiZhengShuHao: '',
    TuDiZuoLuo: '',
    identityVerificationNotification: '',
    landInfoQueryNotification: '',
    landInfoQueryResultZD: [],
    landInfoQueryResultQLR: [],
    investigationMenuDisplayState: false,
    idVerificationDisplayState: false,
    landInfoQueryDisplayState: false,
  }, action) => {
  let newState = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case 'OPEN_IDENTITY_VERIFICATION_MODULE':
      newState.idVerificationDisplayState = true;
      return { ...state, ...newState };
    
    case 'CLOSE_IDENTITY_VERIFICATION_MODULE':
      newState.idVerificationDisplayState = false;
      return { ...state, ...newState };

    case 'CHANGE_INPUT_VALUE_IDENTITY_VERIFICATION':
      if (action.payload.targetID === 'IDCardNumber')
        newState.IDCardNumber = action.payload.targetValue; 
      if (action.payload.targetID === 'IDCardName')
        newState.IDCardName = action.payload.targetValue; 
      return {...state, ...newState}

    case 'IDENTITY_VERIFICATION_QUERY_SUCCESS':
      if (action.payload.identityVerificationQueryResult === true)
        newState.identityVerificationNotification = "验证成功！"
      if (action.payload.identityVerificationQueryResult === false)
        newState.identityVerificationNotification = "公民身份证号码和姓名与数据库记录不符！"
      return {...state, ...newState}

    case 'menuClick':
      if (action.payload.command === "LAND_INFORMATION_QUERY")
        newState.landInfoQueryDisplayState = true
      return {...state, ...newState};
 
    case 'CLOSE_LAND_INFORMATION_QUERY_MODULE':
      newState.landInfoQueryDisplayState = false
      return {...state, ...newState};
 
    case 'CHANGE_INPUT_VALUE_IDENTITY_VERIFICATION':
      if (action.payload.targetID === 'IDCardNumber')
        newState.IDCardNumber = action.payload.targetValue; 
      if (action.payload.targetID === 'IDCardName')
        newState.IDCardName = action.payload.targetValue; 
      return {...state, ...newState};
      
    case 'CHANGE_INPUT_VALUE_LAND_INFORMATION_QUERY':
      // console.log("Trigger CHANGE_INPUT_VALUE_LAND_INFORMATION_QUERY redux ...")
      if (action.payload.targetID === 'OwnPowerSide')
        newState.OwnPowerSide = action.payload.targetValue; 
      if (action.payload.targetID === 'ParcelCode')
        newState.ParcelCode = action.payload.targetValue; 
      if (action.payload.targetID === 'TuDiZhengShuHao')
        newState.TuDiZhengShuHao = action.payload.targetValue; 
      if (action.payload.targetID === 'TuDiZuoLuo')
        newState.TuDiZuoLuo = action.payload.targetValue; 
      return {...state, ...newState};
 
    case 'LAND_INFORMATION_QUERY_SUCCESS':
      // console.log(action.payload)
      newState.landInfoQueryResultZD = action.payload.ZD;
      newState.landInfoQueryResultQLR = action.payload.QLR;
      return {...state, ...newState};
    
    default:
      return { ...state};
  }

}
RootReducer.merge(investigationReduce);