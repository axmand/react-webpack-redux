/* whole page
--dialog
---dialogContent
----list
-----listItem  avatar
               +listItemText
               +button  icon+typography
               +button flat

index page--{userModule button}--index(user) page---{ImageDownload button}---ImageDownload page   <handleClick +open>
                                                    {logOut button}---loginIn page    <navLink>

*/

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//import UI
import { withStyles } from "material-ui/styles";
import Avatar from "material-ui/Avatar";
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from "material-ui/List";
import Dialog, { DialogContent } from "material-ui/Dialog";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Divider from "material-ui/Divider";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import { CircularProgress } from 'material-ui/Progress';
import green from 'material-ui/colors/green';

import RootReducer from "./../../redux/RootReducer";
import { NavLink } from "react-router-dom";
import uuidv4 from "uuid/v4";
//import icon
import AccountCircleIcon from "material-ui-icons/AccountCircle";
import Bluetooth from "material-ui-icons/Bluetooth";
import Devices from "material-ui-icons/Devices";
import PhonelinkOff from "material-ui-icons/PhonelinkOff";
import Photo from "material-ui-icons/Photo";

//import page
import appConfig from "../../redux/Config"
import BluetoothConnect from "./BluetoothConnect";


// inset css
const styles = theme => ({
  dialog: {
    width: "50%",
    height: "95%",
    marginTop: "3%",
    marginLeft: "7%",
    padding:0,
  },

  dialogImage: {
    width: "85%",
    height: "80%",
    marginTop: "3%",
    marginLeft: "10%"
  },

  listItem: {
    display: "flex",
    flexDirection: "column",
    justify: "space-between",
    padding: 0,
    width: `${window.innerHeight*0.08}px`,
    height:`${window.innerHeight*0.08}px`,
  },
  listItemIcon: {
    width: "64%",
    height:'64%',
    padding:'10% 0 0 0',
    margin: 0,
    color: "#C1C6C9"
  },
  listItemText: {
    padding: "0px",
    fontSize: "0.8em",
    color: "#455A64",
    fontFamily: "微软雅黑",
    fontWeight: "bold",
    justify: "center",
    align: "center",
    justifyContent: "center"
  },

  // specially for the three buttons in a row
  listItemUser: {
    display: "flex",
    flexDirection: "row",
    justify: "space-around",
    paddingLeft: "0px"
  },

  //用户头像大小固定
  avatar: {
    lineHeight: "2em",
    width:'50px',
    height:'50px',
    size: "100%",
    marginTop:'0',
  },

  button: {
    width: "200px",
    height: 30,
    fontFamily: "微软雅黑",
    fontWeight: "bold",
    fontSize: "32px",
    color: "#455A64",
    background: '#C1C6C9',
    borderRadius: "5px",
    border: 0,
    padding: 0
  },
  //specially for those mixed button
  buttonAttach: {
    display: "inline-block",
    lineHeight: "2em",
    fontWeight:'bold',
    justify: "center",
    justifyContent: "center"
  },

  // buttonLogout:{
  //   background:blue[100],
  //   // color:'white',
  //   borderRadius:'3px',
  //   border:0,
  //   padding:0,
  // },

  // buttonSecondaryAction: {
  //   width: "40px",
  //   height: "20px",

  //   border: 0,
  //   padding: 0,
  //   borderRadius: "3px",
  //   fontWeight: "bold"
  // },

  icon: {
    // width: "80px",
    // height: "80px",
    width: "30%",
    height: "30%",
    justify: "center"
  },

  typography: {
    fontFamily: "微软雅黑",
    fontSize: "1.2em",
    width: "100%",
    fontWeight: 'bold',
  },
  //specially for those descriptional(or definitional) typography
  labelUser: {
    // width: "110px",
    width: "100%",
    padding: 0,
    // fontSize: "32px",
    fontSize: "1.2em",
    fontWeight:'bold',
    lineHeight: "2em",
    color:'black', 
  },
  //specically for those state text
  userStateText: {
    background:'#455A64',
    borderRadius: "5px",
    justify: "center",
    justifyContent: "center",
    width: "100%",
    fontSize: "1.2em",
    textAlign: "center",
    padding: "5px 0px",
    color:'#C1C6C9',
  },
  navLink: {
    textDecoration: "none"
  },

  tableHead: {
    padding: 0
  },

  tableCellHead: {
    backgroundColor: '#455A64',
    backgroundClip: "text",
    borderRadius: "5px",
    justify: "center",
    justifyContent: "center",
    width: "30%",
    textAlign: "center",
    padding: "5px 0",
    fontSize: "2em",
    color: '#C1C6C9',
  },
  tableCellBody: {
    width: "40%",
    textAlign: "center",
    padding: "0",
    fontSize: "1.5em",
    lineHeight:'2em',
    border:'none',
    borderBottom:'dotted 1px #455A64',
    borderCollapse:'collapse',
  },
  usrInfo: {
    // width: '500px',
  },
  wrapperWithProgress: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-17%',
    marginLeft: '-8%',
  },
});

class UserModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openImage: false,
      openBluetooth: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleRequestCloseImage = this.handleRequestCloseImage.bind(this);
    this.handleClickExitProgram = this.handleClickExitProgram.bind(this);
  }

  handleClick = event => {
    this.setState({ open: true });
  };
  handleClickImage = event => {
    this.setState({ openImage: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };
  handleRequestCloseImage = () => {
    this.setState({ openImage: false });
  };

  handleClickExitProgram = () => {
    window.location.href="about:blank";
    window.close();
  };

  render() {
    const {
      classes,
      userAvatar,
      userName,
      userID,
      userCompany,
      userJob,
      lastLoginTime,
      handleClickBluetooth,
      handleClickCompassModule,
      bluetoothConnectModuleLoading,
      CompassModuleRunningState,
      CompassModuleLoading,
    } = this.props;
    const imageLists = [
      { imageName: "*****区域影像图1", imageSize: "105MB" },
      { imageName: "*****区域影像图2", imageSize: "1.25GB" },
      { imageName: "*****区域影像图3", imageSize: "345MB" },
      { imageName: "*****区域影像图4", imageSize: "289MB" },
      { imageName: "*****区域影像图5", imageSize: "4.21GB" },
      { imageName: "*****区域影像图6", imageSize: "335MB" },
      { imageName: "*****区域影像图7", imageSize: "156MB" },
      { imageName: "*****区域影像图8", imageSize: "2.24GB" },
      { imageName: "*****区域影像图9", imageSize: "3.56GB" }
    ];

    return (
      <div>
        <ListItem
          button
          disableGutters={true}
          className={classes.listItem}
          onClick={this.handleClick}
        >
          <ListItemIcon>
            <AccountCircleIcon className={classes.listItemIcon} />
          </ListItemIcon>
          <ListItemText
            primary="用户名"
            disableTypography={true}
            className={classes.listItemText}
          />
        </ListItem>

        <Dialog
          className={classes.dialog}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <DialogContent
            style={{ padding:0, }}
          >
            <List className={classes.usrInfo}>
              <ListItem style={{ lineHeight: "3em" }}>
                <ListItemAvatar style={{ lineHeight: "3em" }}>
                  <Avatar
                    sizes="100%"
                    className={classes.avatar}
                    alt="avatar"
                    src={userAvatar}
                  />
                </ListItemAvatar>
              </ListItem>

              <ListItem dense>
                <ListItemText
                  disableTypography
                  className={classes.labelUser}
                  primary="用户名"
                />
                <ListItemText
                  disableTypography
                  className={classes.userStateText}
                  primary={userName}
                />
              </ListItem>

              <ListItem dense>
                <ListItemText
                  disableTypography
                  className={classes.labelUser}
                  primary="用户ID"
                />
                <ListItemText
                  disableTypography
                  className={classes.userStateText}
                  primary={userID}
                />
              </ListItem>

              <ListItem dense>
                <ListItemText
                  disableTypography
                  className={classes.labelUser}
                  primary="单位"
                />
                <ListItemText
                  disableTypography
                  className={classes.userStateText}
                  primary={userCompany}
                />
              </ListItem>

              <ListItem dense>
                <ListItemText
                  disableTypography
                  className={classes.labelUser}
                  primary="职位"
                />
                <ListItemText
                  disableTypography
                  className={classes.userStateText}
                  primary={userJob}
                />
              </ListItem>

              {/* <ListItem dense>
                <ListItemText
                  disableTypography
                  className={classes.labelUser}
                  primary="上次登录时间"
                />
                <ListItemText
                  disableTypography
                  className={classes.userStateText}
                  primary={lastLoginTime}
                />
              </ListItem> */}

              <Divider />

              <ListItem
                className={classes.listItemUser}
                style={{ lineHeight: "5em" }}
              >
                <div className={classes.wrapperWithProgress}>
                  <Button
                    className={classes.buttonAttach}
                    onClick={handleClickBluetooth}
                  >
                    <Bluetooth className={classes.icon} />                  
                    <Typography className={classes.typography}>
                      蓝牙连接
                    </Typography>
                  </Button>
                  {bluetoothConnectModuleLoading && <CircularProgress size={48} className={classes.buttonProgress} />}
                </div>

                <div className={classes.wrapperWithProgress}>
                  <Button 
                    className={classes.buttonAttach}
                    onClick={handleClickCompassModule}
                  >
                    {CompassModuleRunningState? <Devices className={classes.icon} /> : <PhonelinkOff className={classes.icon} />}                 
                    {CompassModuleRunningState? <Typography className={classes.typography}>北斗模块断开 </Typography>: <Typography className={classes.typography}>北斗模块连接</Typography>} 
                  </Button>
                  {CompassModuleLoading && <CircularProgress size={52} className={classes.buttonProgress} />}
                </div>

                {/* <div className={classes.wrapperWithProgress}>
                  <Button
                    className={classes.buttonAttach}
                    onClick={this.handleClickImage}
                  >
                    <Photo className={classes.icon} />
                    <Typography className={classes.typography} bold>
                      影像下载
                    </Typography>
                  </Button>
                </div> */}
                
              </ListItem>

              <listItem style={{ lineHeight: "2em" }}> </listItem>
              <listItem> </listItem>

              <ListItem
                style={{
                  justifyContent: "flex-end",
                  paddingBottom: "0px",
                  marginBottom: "0px"
                }}
              >
                <NavLink className={classes.navLink} to="/">
                  <Button
                    style={{
                      background: '#455A64',
                      border: 0,
                      padding: "15px 25px",
                      borderRadius: "8px",
                      fontWeight: "bold",
                      fontSize: "1.5em",
                      color: '#C1C6C9',
                    }}
                  >
                    退 出 登 录
                  </Button>
                </NavLink>
                <Button
                  style={{
                    background: '#455A64',
                    border: 0,
                    padding: "15px 25px",
                    marginLeft: "20px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    fontSize: "1.5em",
                    color: '#C1C6C9',
                  }}
                  onClick={this.handleClickExitProgram}
                >
                    退 出 程 序
                  </Button>
              </ListItem>
            </List>
          </DialogContent>
        </Dialog>

        <Dialog
          fullScreen
          className={(classes.dialog, classes.dialogImage)}
          open={this.state.openImage}
          onRequestClose={this.handleRequestCloseImage}
        >
          <DialogContent>
            <Table>
              <TableHead className={classes.tableHead}>
                <TableRow className={classes.tableHead}>
                  <TableCell style={{width:"60%"}} className={classes.tableCellHead}>
                    影像名称
                  </TableCell>
                  <TableCell style={{width:"40%"}} className={classes.tableCellHead}>
                    影像大小
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                {imageLists.map(imageList => (
                  <TableRow key={uuidv4()}>
                    <TableCell style={{width:"60%"}}  className={classes.tableCellBody}>
                      {imageList.imageName}
                    </TableCell>
                    <TableCell numeric style={{width:"40%"}}  className={classes.tableCellBody}>
                      {imageList.imageSize}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>
        <BluetoothConnect />
      </div>
    );
  }
}

UserModule.propTypes = {
  handleClickBluetooth: PropTypes.func.isRequired,
};

//import reducer
const userReduce = (
  state = {
    userAvatar: "./avatar.png",
    userName: "武大珞珈",
    userID: "123456",
    userCompany: "南宁市国土测绘地理信息中心",
    userJob: "地籍测量员",
    lastLoginTime: "2017/08/24/21:38",
    bluetoothConnectModuleLoading: false,
    CompassModuleRunningState: false,
    CompassModuleLoading: false,
  },
  action
) => {
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case 'COMPASS_MODULE_RUNNING_STATE':
      newState.CompassModuleRunningState = !newState.CompassModuleRunningState;
      return { ...state, ...newState };
    case 'BLUETOOTH_CONNECT_MODULE_LOADING_STATE_SWITCH':
      newState.bluetoothConnectModuleLoading = !newState.bluetoothConnectModuleLoading;
      return { ...state, ...newState };
    case 'COMPASS_MODULE_LOADING_STATE_SWITCH':
       newState.CompassModuleLoading = !newState.CompassModuleLoading;
      return { ...state, ...newState };
    case 'LOGIN_SUCCESS':
      const userInfo = action.payload.data;
      newState.userName = userInfo.userName;
      newState.userID = userInfo.userId;
      newState.lastLoginTime = localStorage.getItem('latestLoginTime');
      return { ...state, ...newState };
    default:
      return { ...state };
  }

};
RootReducer.merge(userReduce);

//state?
const mapStateToProps = state => {
  const userState = state.userReduce;
  const loginState = state.loginReduce;

  return {
    userAvatar: userState.userAvatar,
    userName: loginState.username,
    userID: userState.userID,
    userCompany: userState.userCompany,
    userJob: userState.userJob,
    lastLoginTime: userState.lastLoginTime,
    bluetoothConnectModuleLoading: userState.bluetoothConnectModuleLoading,
    CompassModuleLoading: userState.CompassModuleLoading,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClickBluetooth: () => {
      // console.log("call handleClickBluetooth function ...");
      dispatch({
        type: "BLUETOOTH_CONNECT_MODULE_LOADING_STATE_SWITCH",
      });
      fetch(appConfig.fileServiceRootPath + "/bluetooth/connect/splist")
        .then(response => response.json())
        .then(json => {
          dispatch({
            type: "COM_BLUETOOTH_VIEW_SWITCH",
          });
          dispatch({
            type: "COM_BLUETOOTH_MODULE_GET",
            payload: json.data
          });
          dispatch({
            type: "BLUETOOTH_CONNECT_MODULE_LOADING_STATE_SWITCH",
          });
        })
        .catch(err => {
          console.log(err);
          dispatch({
            type: "STATUS_BAR_NOTIFICATION",
            payload: {
              notification: err,
            }
          });
          dispatch({
            type: "BLUETOOTH_CONNECT_MODULE_LOADING_STATE_SWITCH",
          });
        });
    },
    // 处理北斗模块连接的相关操作
    handleClickCompassModule: () => {
      // console.log("call handleClickCompassModule ...");
      dispatch({
        type: "COMPASS_MODULE_LOADING_STATE_SWITCH",
      });
      if(ownProps.CompassModuleRunningState)
      {
        fetch(appConfig.fileServiceRootPath + "/sp/closesp")
        .then(response => response.json())
        .then(json => {
          if (json.status === 500)
          {
            return Promise.reject(json.data)
          }
          
          if (json.status === 200)
          {
            dispatch({
              type: "COMPASS_MODULE_RUNNING_STATE",
              payload: json.data
            });
          }

          dispatch({
            type: "STATUS_BAR_NOTIFICATION",
            payload: {
              notification: json.data,
            }
          });
          dispatch({
            type: "COMPASS_MODULE_LOADING_STATE_SWITCH",
          });
        })
        .catch(err => {
          console.log(err);
          dispatch({
            type: "STATUS_BAR_NOTIFICATION",
            payload: {
              notification: err,
            }
          });
          dispatch({
            type: "COMPASS_MODULE_LOADING_STATE_SWITCH",
          });
        });
      }
      else
      {
        fetch(appConfig.fileServiceRootPath + "/sp/opensp")
        .then(response => response.json()
          .then(json => {
            if (response.ok) {
              return json
            } 
            else {
              return Promise.reject(json)
            }
          })
        )
        .then(json => {
          if (json.status === 500)
          {
            return Promise.reject(json.data)
          }
          
          if (json.status === 200)
          {
            dispatch({
              type: "COMPASS_MODULE_RUNNING_STATE",
              payload: json.data
            });
          }

          dispatch({
            type: "STATUS_BAR_NOTIFICATION",
            payload: {
              notification: json.data,
            }
          });
          dispatch({
            type: "COMPASS_MODULE_LOADING_STATE_SWITCH",
          });
        })
        .catch(err => {
          console.log(err);
          dispatch({
            type: "STATUS_BAR_NOTIFICATION",
            payload: {
              notification: err,
            }
          });
          dispatch({
            type: "COMPASS_MODULE_LOADING_STATE_SWITCH",
          });
        });
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserModule));
