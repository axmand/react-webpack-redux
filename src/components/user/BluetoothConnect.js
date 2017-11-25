import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//import UI
import { withStyles } from "material-ui/styles";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogContentText
} from "material-ui/Dialog";
import Input, { InputLabel } from "material-ui/Input";
import List, { ListItem } from "material-ui/List";
import { 
  FormControl,
  FormHelperText 
 } from "material-ui/Form";
import Select from "material-ui/Select";
import Button from "material-ui/Button";

import RootReducer from "./../../redux/RootReducer";

import Snackbar from "material-ui/Snackbar";
import IconButton from "material-ui/IconButton";
import CloseIcon from "material-ui-icons/Close";

import appConfig from "../../redux/Config"

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginLeft:'7%',
    marginTop:'10%',
  },
  formControl: {
    // margin: "1em",
    // width: "100%",
    // height: "30%",
    // lineHeight: "3em"
  },
  title: {
    display: "flex",
    fontSize: "2em",
    fontWeight: "bold",
    background: '#455A64',
    // padding: "1.2em",
    justifyContent: "space-around",
    justify: "space-around",
    letterSpacing: "1em",
    paddingRight:0,
    
  },
  label: {
    fontSize: "1.5em",
    lineHeight: "2em",
    width: "100px",
    height: "32px",
    margin: 0
  },

  dialogBluetooth: {
    width: "70%",
    height: "30%",
    marginTop: "25%",
    marginLeft: "15%"
  },

  select: {
    // width: "100%",
    // height: "4em",
    // marginLeft: "5%",
    // textAlign: "center",
    // lineHeight: "2em"
  },
  option: {
    display: "flex",
    color: "primary",
    width: "80%",
    height: "2em",
    marginLeft: "5%",
    textAlign: "center",
    lineHeight: "3em"
  },

  button: {
    display: "inline-block",
    lineHeight: "1.5em",
    fontSize: "1.5em",
    fontWeight:'bold',
    background: '#455A64',
    color: "#C1C6C9",
    padding: "0 30px",
    paddingRight: "20px",
    letterSpacing: "10px",

  },

  port:{
    fontSize:'1.5em',
    fontWeight:'bold',

  },

  root: {
    width: "1920px",
    height: "1280px"
  }
};

let COMPort = "";

class BluetoothConnect extends React.Component {
  handleChangeBluetooth = name => event => {
    this.setState({ [name]: event.target.value });
    COMPort = event.target.value;
    // console.log(COMPort);
  };

  render() {
    const {
      classes,
      portLists,
      bluetoothSwitch,
      handleRequestCloseBluetooth,
      handleCOMPortConnect,
      handleCOMPortDisconnect,
      portConnectStateShow,
      handleRequestCloseBluetoothSwitch,
      // bluetoothConnectAlertShow,
      handleClickBluetoothConnectAlert,
      // handleRequestCloseBluetoothConnectAlert,
      bluetoothConnectNotification,
    } = this.props;

    //console.log(portLists);

    return (
      <div>
        <Dialog
          open={bluetoothSwitch}
          onRequestClose={handleRequestCloseBluetoothSwitch}
          className={classes.dialogBluetooth}
        >
          <DialogTitle disableTypography className={classes.title}>
            {"蓝牙连接"}
          </DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel className={ classes.port } htmlFor="bluetooth-port">Port</InputLabel>
                <Select
                  value={COMPort}
                  onChange={this.handleChangeBluetooth("port")}
                  input={<Input id="bluetooth-port" />}
                  native
                  className={classes.select}
                >
                  <option value="" />
                  {portLists.map(portList => (
                    <option value={portList} className={classes.option}>
                      {portList}
                    </option>
                  ))}
                </Select>
                <FormHelperText>{bluetoothConnectNotification}</FormHelperText>
              </FormControl>

              <List>
                <ListItem style={{ justifyContent: "space-around" }}>
                  <Button
                    raised
                    className={classes.button}
                    color="primary"
                    onClick={handleCOMPortDisconnect}
                  >
                    断开
                  </Button>
                  <Button
                    raised
                    className={classes.button}
                    color="primary"
                    onClick={handleCOMPortConnect}
                  >
                    连接
                  </Button>
                </ListItem>
              </List>
            </form>
          </DialogContent>
        </Dialog>

      </div>
    );
  }
}

BluetoothConnect.PropTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const bluetoothState = state.BluetoothReducer;
  return {
    portLists: bluetoothState.portLists,
    bluetoothSwitch: bluetoothState.bluetoothSwitch,
    portConnectStateShow: bluetoothState.portConnectStateShow,
    bluetoothConnectAlertShow: bluetoothState.bluetoothConnectAlertShow,
    bluetoothConnectNotification: bluetoothState.bluetoothConnectNotification,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleRequestCloseBluetoothSwitch: () => {
      dispatch({
        type: "COM_BLUETOOTH_VIEW_SWITCH"
      });
    },

    handleRequestCloseBluetoothStateShow: () => {
      dispatch({
        type: "BLUETOOTH_STATE_SHOW"
      });
    },

    handleCOMPortConnect: () => {
      console.log("handleCOMPortConnect Triggerd ...");
      // console.log(COMPort);
      dispatch({
        type: "OPEN_WAITING_MODULE",
      });

      // const COMPortSelected = COMPort.slice(
      //   COMPort.indexOf("(") + 1,
      //   COMPort.indexOf(")")
      // );
      // console.log(COMPortSelected);

      const COMPortSelected = COMPort

      const RTKBlutoothConnectURLBase =
      appConfig.fileServiceRootPath + "/bluetooth/connect/sp/";
      const RTKBlutoothConnectURL = RTKBlutoothConnectURLBase + COMPortSelected;
      console.log(RTKBlutoothConnectURL);

      fetch(RTKBlutoothConnectURL, {
        method: "GET"
      })
        .then(response => {
          if (response.ok) {
            return response.json()
          } 
          else {
            return Promise.reject({
              status: response.status,
              statusText: response.statusText
            })
          }
        })
        .then(json => {
          console.log(json);
          // 处理不同HTTP状态码下的对应操作
          if (json.status === 500)
          {
            dispatch({
              type: "COM_BLUETOOTH_MODULE_CONNECT",
              payload: {
                notification: "RTK同平板蓝牙连接信号受阻，无法获取COM端口！！！",
              }
            });
          };

          if (json.status === 200)
          {
            dispatch({
              type: "COM_BLUETOOTH_MODULE_CONNECT",
              payload: {
                notification: "RTK蓝牙已连接！",
              }
            });

            console.log(appConfig.fileServiceRootPath + appConfig.CORSConnectionInterface)
            fetch(appConfig.fileServiceRootPath + appConfig.CORSConnectionInterface, {
              method: "GET"
            })
              .then(response => {
                if (response.ok) {
                  return response.json()
                } 
                else {
                  return Promise.reject({
                    status: response.status,
                    statusText: response.statusText
                  })
                }
              })
              .then(json => {
                console.log(json);
                // 处理不同HTTP状态码下的对应操作
                if (json.status === 500)
                {
                  dispatch({
                    type: "COM_BLUETOOTH_MODULE_CONNECT",
                    payload: {
                      notification: "RTK同CORS站连接信号受阻，无法获取差分数据！！！",
                    }
                  });
                };
      
                if (json.status === 200)
                {
                  dispatch({
                    type: "COM_BLUETOOTH_MODULE_CONNECT",
                    payload: {
                      notification: "RTK同CORS站已建立连接！",
                    }
                  });
                };
                // 在状态栏显示调试信息
                dispatch({
                  type: "STATUS_BAR_NOTIFICATION",
                  payload: {
                    notification: json,
                  }
                });
                dispatch({
                  type: "CLOSE_WAITING_MODULE",
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
                type: "CLOSE_WAITING_MODULE",
              });
            });
          };
          // 在状态栏显示调试信息
          dispatch({
            type: "STATUS_BAR_NOTIFICATION",
            payload: {
              notification: json,
            }
          });
          // dispatch({
          //   type: "CLOSE_WAITING_MODULE",
          // });
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
            type: "CLOSE_WAITING_MODULE",
          });
        });       
    },
    
    handleCOMPortDisconnect: () => {
      console.log("handleCOMPortDisconnect Triggerd ...");
      console.log(COMPort);

      dispatch({
        type: "OPEN_WAITING_MODULE",
      });

      const COMPortSelected = COMPort
      // const COMPortSelected = COMPort.slice(
      //   COMPort.indexOf("(") + 1,
      //   COMPort.indexOf(")")
      // );
      console.log(COMPortSelected);

      const RTKBlutoothDisconnectURLBase =
        appConfig.fileServiceRootPath + "/bluetooth/connect/closesp/";
      const RTKBlutoothDisconnectURL =
        RTKBlutoothDisconnectURLBase + COMPortSelected;
      console.log(RTKBlutoothDisconnectURL);

      fetch(RTKBlutoothDisconnectURL, {
        method: "GET"
      })
        .then(response => {
          console.log(response)
          if (response.ok) {
            return response.json()
          } 
          else {
            return Promise.reject({
              status: response.status,
              statusText: response.statusText
            })
          }
        })
        .then(json => {
          console.log(json);
          // 处理不同HTTP状态码下的对应操作
          if (json.status === 500)
          {
            dispatch({
              type: "COM_BLUETOOTH_MODULE_DISCONNECT",
              payload: {
                notification: "断开RTK蓝牙连接失败！！！",
              }
            });
          };

          if (json.status === 200)
          {
            dispatch({
              type: "COM_BLUETOOTH_MODULE_DISCONNECT",
              payload: {
                notification: "已断开RTK蓝牙连接",
              }
            });
          };
          dispatch({
            type: "CLOSE_WAITING_MODULE",
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
            type: "CLOSE_WAITING_MODULE",
          });
        });
    },
    // handleRequestCloseBluetoothConnectAlert: () => {
    //   dispatch({
    //     type: "COM_BLUETOOTH_CONNECT_ALERT_SWITCH"
    //   });
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(BluetoothConnect)
);

//reducer
const BluetoothReducer = (
  state = {
    portLists: ["COM1", "COM2", "COM3", "COM4"],
    bluetoothSwitch: false,
    portConnectStateShow: false,
    bluetoothConnectAlertShow: false,
    bluetoothConnectNotification: '',
  },
  action
) => {
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "COM_BLUETOOTH_VIEW_SWITCH":
      newState.bluetoothSwitch = !newState.bluetoothSwitch;
      return { ...state, ...newState };

    case "BLUETOOTH_STATE_SHOW":
      newState.portConnectStateShow = !newState.portConnectStateShow;
      return { ...state, ...newState };

    case "COM_BLUETOOTH_MODULE_GET":
      //console.log(action.payload)
      let newPortListsStr = action.payload;
      console.log(newPortListsStr)
      console.log(JSON.parse(newPortListsStr))
      // newPortListsStr = newPortListsStr.slice(
      //   newPortListsStr.indexOf("[") + 1,
      //   newPortListsStr.indexOf("]")
      // );
      // const newPortLists = newPortListsStr.split(',');
      newState.portLists = JSON.parse(newPortListsStr);
      return { ...state, ...newState };

    case "COM_BLUETOOTH_MODULE_CONNECT":
      // console.log(action.payload)
      // newState.bluetoothConnectAlertShow = !newState.bluetoothConnectAlertShow;
      newState.bluetoothConnectNotification = action.payload.notification
      return { ...state, ...newState };

    case "COM_BLUETOOTH_MODULE_DISCONNECT":
      // newState.bluetoothConnectAlertShow = !newState.bluetoothConnectAlertShow;
      newState.bluetoothConnectNotification = action.payload.notification
      return { ...state, ...newState };

    // case "COM_BLUETOOTH_CONNECT_ALERT_SWITCH":
    //   newState.bluetoothConnectAlertShow = !newState.bluetoothConnectAlertShow;
      return { ...state, ...newState };

    default:
      return { ...state, ...newState };
  }
};
RootReducer.merge(BluetoothReducer);


// {/* <Dialog
//   open={bluetoothConnectAlertShow}
//   onRequestClose={handleRequestCloseBluetoothConnectAlert}
//   style={{
//     background: '#455A64',
//     color: "#C1C6C9",
//     textAlign: "center",
//     justifyContent: "center",
//     justify: "center"
//   }}
// >
//   <DialogContent>
//     <DialogContentText>
//       bluetooth status has been changed
//     </DialogContentText>
//   </DialogContent>
// </Dialog> */}