import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//import UI
import { withStyles } from "material-ui/styles";
import Dialog, {
  DialogTitle,
  DialogContent,
} from "material-ui/Dialog";
import Input, { InputLabel } from "material-ui/Input";
import List, { ListItem } from "material-ui/List";
import { 
  FormControl,
  FormHelperText 
 } from "material-ui/Form";
import Select from "material-ui/Select";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";

import RootReducer from "../../redux/RootReducer";

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

  dialogCompass: {
    width: "70%",
    height: "30%",
    marginTop: "25%",
    marginLeft: "15%"
  },

  textField:{
    height:'64px',
    fontSize:'1.2em'
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
let IPRTK="";
let portRTK="";
let originNode="";
let usernameRTK="";
let passwordRTK="";

class CompassConnect extends React.Component {

  state = {
    IP_RTK:"",
    port_RTK:"",
    origin_Node:"",
    username_RTK:"",
    password_RTK:"",
    COM_Port:""
  };
  handleChangeBluetooth = name => event => {
    this.setState({ [name]: event.target.value });

    if(name==="COM_Port"){
      COMPort = event.target.value;
    }
    // console.log("/bluetooth/connect/RTK/");
  };

  render() {
    const {
      classes,
      portLists,
      CompassSwitch,
      // handleRequestCloseBluetooth,
      handleCompassConnect,
      handleCompassDisConnect,
      // portConnectStateShow,
      handleRequestCloseCompassSwitch,
      // bluetoothConnectAlertShow,
      // handleClickBluetoothConnectAlert,
      // handleRequestCloseBluetoothConnectAlert,
      bluetoothConnectNotification,
    } = this.props;

    //console.log(portLists);

    return (
      <div>
        <Dialog
          open={CompassSwitch}
          onRequestClose={handleRequestCloseCompassSwitch}
          className={classes.dialogCompass}
        >
          <DialogTitle disableTypography className={classes.title}>
            {"北斗模块连接"}
          </DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl fullWidth className={classes.formControl}>                
                <InputLabel className={ classes.port } htmlFor="bluetooth-port">Port</InputLabel>
                <Select
                  value={this.state.COM_Port}
                  onChange={this.handleChangeBluetooth("COM_Port")}
                  input={<Input id="bluetooth-port" />}
                  native
                  className={classes.select}
                >
                  <option value="" />
                  {portLists.map(portList => (
                    <option key={portList} value={portList} className={classes.option}>
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
                    onClick={handleCompassDisConnect}
                  >
                    断开
                  </Button>
                  <Button
                    raised
                    className={classes.button}
                    color="primary"
                    onClick={handleCompassConnect}
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

CompassConnect.PropTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const CompassState = state.CompassReducer;
  return {
    portLists: CompassState.portLists,
    CompassSwitch:CompassState.CompassSwitch,
    portConnectStateShow: CompassState.portConnectStateShow,
    bluetoothConnectAlertShow: CompassState.bluetoothConnectAlertShow,
    bluetoothConnectNotification:CompassState.bluetoothConnectNotification,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    handleRequestCloseCompassSwitch: () => {
      dispatch({
        type: "COM_COMPASS_SWITCH"
      });
    }, 

    handleCompassConnect: () => {
      console.log("handleCOMPortConnect Triggerd ...");
      // console.log(COMPort);
      // dispatch({
      //   type: "OPEN_WAITING_MODULE",
      // });
      const COMPortSelected = COMPort

      const CompassConnectURLBase =
      appConfig.fileServiceRootPath + "/sp/opensp";
      const CompassConnectURL = CompassConnectURLBase + COMPortSelected;
      console.log(CompassConnectURL);
      fetch(CompassConnectURL)
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

          if (json.status === 201)
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
     
        // fetch(RTKBlutoothConnectURL, {
      //   method: "GET"
      // })
      //   .then(response => {
      //     if (response.ok) {
      //       return response.json()
      //     } 
      //     else {
      //       return Promise.reject({
      //         status: response.status,
      //         statusText: response.statusText
      //       })
      //     }
      //   })
      //   .then(json => {
      //     console.log(json);
      //     // 处理不同HTTP状态码下的对应操作
      //     if (json.status === 500)
      //     {
      //       dispatch({
      //         type: "COM_BLUETOOTH_MODULE_CONNECT",
      //         payload: {
      //           notification: "RTK同平板蓝牙连接信号受阻，无法获取COM端口！！！",
      //         }
      //       });
      //       // 在状态栏显示调试信息
      //       dispatch({
      //         type: "STATUS_BAR_NOTIFICATION",
      //         payload: {
      //           notification: json,
      //         }
      //       });
      //       dispatch({
      //         type: "CLOSE_WAITING_MODULE",
      //       });
      //     };

      //     if (json.status === 200)
      //     {
      //       dispatch({
      //         type: "COM_BLUETOOTH_MODULE_CONNECT",
      //         payload: {
      //           notification: "RTK蓝牙已连接！",
      //         }
      //       });
            
      //       let CORS_URL="/bluetooth/connect/RTK/"+IPRTK+":"+portRTK+"/"+originNode+"/"+usernameRTK+"/"+passwordRTK;
      //       console.log(CORS_URL);
      //       fetch(appConfig.fileServiceRootPath + CORS_URL, {
      //         method: "GET"
      //       })
      //         .then(response => {
      //           if (response.ok) {
      //             return response.json()
      //           } 
      //           else {
      //             return Promise.reject({
      //               status: response.status,
      //               statusText: response.statusText
      //             })
      //           }
      //         })
      //         .then(json => {
      //           console.log(json);
      //           // 处理不同HTTP状态码下的对应操作
      //           if (json.status === 500)
      //           {
      //             dispatch({
      //               type: "COM_BLUETOOTH_MODULE_CONNECT",
      //               payload: {
      //                 notification: "RTK同CORS站连接信号受阻或信息输入有误，无法获取差分数据！！！",
      //               }
      //             });
      //           };
      
      //           if (json.status === 200)
      //           {
      //             dispatch({
      //               type: "COM_BLUETOOTH_MODULE_CONNECT",
      //               payload: {
      //                 notification: "RTK同CORS站已建立连接！",
      //               }
      //             });
      //           };
      //           // 在状态栏显示调试信息
      //           dispatch({
      //             type: "STATUS_BAR_NOTIFICATION",
      //             payload: {
      //               notification: json,
      //             }
      //           });
      //           dispatch({
      //             type: "CLOSE_WAITING_MODULE",
      //           });
      //         })
      //       .catch(err => {
      //         console.log(err);
      //         dispatch({
      //           type: "STATUS_BAR_NOTIFICATION",
      //           payload: {
      //             notification: err,
      //           }
      //         });
      //         dispatch({
      //           type: "CLOSE_WAITING_MODULE",
      //         });
      //       });
      //     };
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     dispatch({
      //       type: "STATUS_BAR_NOTIFICATION",
      //       payload: {
      //         notification: err,
      //       }
      //     });
      //     dispatch({
      //       type: "CLOSE_WAITING_MODULE",
      //     });
      //   });       
    },

    handleCompassDisConnect: () => {
      console.log("handleCompassDisConnect Triggerd ...");
      console.log(COMPort);

      // dispatch({
      //   type: "OPEN_WAITING_MODULE",
      // });

      const COMPortSelected = COMPort
      console.log(COMPortSelected);

      const CompassDisconnectURLBase =
      appConfig.fileServiceRootPath + "/sp/closesp";
      // const CompassDisconnectURL =
      // CompassDisconnectURLBase + COMPortSelected;
      // console.log(CompassDisconnectURL);
      fetch(CompassDisconnectURLBase)
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

      // fetch(CompassDisconnectURL, {
      //   method: "GET"
      // })
      //   .then(response => {
      //     console.log(response)
      //     if (response.ok) {
      //       return response.json()
      //     } 
      //     else {
      //       return Promise.reject({
      //         status: response.status,
      //         statusText: response.statusText
      //       })
      //     }
      //   })
      //   .then(json => {
      //     console.log(json);
      //     // 处理不同HTTP状态码下的对应操作
      //     if (json.status === 500)
      //     {
      //       dispatch({
      //         type: "COM_BLUETOOTH_MODULE_DISCONNECT",
      //         payload: {
      //           notification: "断开RTK蓝牙连接失败！！！",
      //         }
      //       });
      //     };

      //     if (json.status === 200)
      //     {
      //       dispatch({
      //         type: "COM_BLUETOOTH_MODULE_DISCONNECT",
      //         payload: {
      //           notification: "已断开RTK蓝牙连接",
      //         }
      //       });
      //     };
      //     dispatch({
      //       type: "CLOSE_WAITING_MODULE",
      //     });
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     dispatch({
      //       type: "STATUS_BAR_NOTIFICATION",
      //       payload: {
      //         notification: err,
      //       }
      //     });
      //     dispatch({
      //       type: "CLOSE_WAITING_MODULE",
      //     });
      //   });
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(CompassConnect)
);

//reducer
const CompassReducer = (
  state = {
    portLists: ["COM1", "COM2", "COM3", "COM4"],
    CompassSwitch:false,
    portConnectStateShow: false,
    bluetoothConnectAlertShow: false,
    bluetoothConnectNotification: '',
    IPRTK:"",
    portRTK:"",
    usernameRTK:"",
    passwordRTK:"",
  },
  action
) => {
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    // case "CHANGE_INPUT_VALUE_RTK":
    //   if (action.payload.targetID === 'IPRTK')
    //     newState.IPRTK = action.payload.targetValue; 
    //   if (action.payload.targetID === 'portRTK')
    //     newState.portRTK = action.payload.targetValue; 
    //   return {...state, ...newState}
    //   if (action.payload.targetID === 'usernameRTK')
    //     newState.usernameRTK = action.payload.targetValue; 
    //     return {...state, ...newState}
    //   if (action.payload.targetID === 'passwordRTK')
    //     newState.passwordRTK = action.payload.targetValue; 
    //     return {...state, ...newState}
    case 'COMPASS_MODULE_RUNNING_STATE':
      newState.CompassModuleRunningState = !newState.CompassModuleRunningState;
      return { ...state, ...newState };
    
    case 'COMPASS_MODULE_LOADING_STATE_SWITCH':
      newState.CompassModuleLoading = !newState.CompassModuleLoading;
      return { ...state, ...newState };
   
    case "COM_COMPASS_SWITCH":
      newState.CompassSwitch = !newState.CompassSwitch;
      return { ...state, ...newState };

    case "BLUETOOTH_STATE_SHOW":
      newState.portConnectStateShow = !newState.portConnectStateShow;
      return { ...state, ...newState };

    case "COM_BLUETOOTH_MODULE_GET":
      //console.log(action.payload)
      let newPortListsStr = action.payload;
      // console.log(newPortListsStr)
      // console.log(JSON.parse(newPortListsStr))
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
    //   return { ...state, ...newState };

    default:
      return { ...state, ...newState };
  }
};
RootReducer.merge(CompassReducer);


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