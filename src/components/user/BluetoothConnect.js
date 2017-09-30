import React, { Component } from "react";
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
import { FormControl } from "material-ui/Form";
import Select from "material-ui/Select";
import Button from "material-ui/Button";

import blue from "material-ui/colors/blue";
import grey from "material-ui/colors/grey";

import RootReducer from "./../../redux/RootReducer";

import Snackbar from "material-ui/Snackbar";
import IconButton from "material-ui/IconButton";
import CloseIcon from "material-ui-icons/Close";

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  formControl: {
    margin: "1em",
    width: "800px",
    height: "150px",
    lineHeight: "3em"
  },
  title: {
    display: "flex",
    fontSize: "32px",
    fontWeight: "bold",
    background: blue[300],
    padding: "16px",
    justifyContent: "center",
    justify: "center",
    letterSpacing: "30px"
  },
  label: {
    fontSize: "24px",
    lineHeight: "2em",
    width: "100px",
    height: "32px",
    margin: 0
  },

  dialogBluetooth: {
    width: "800px",
    height: "30%",
    marginTop: "25%",
    marginLeft: "45%"
  },

  select: {
    width: "80%",
    height: "50px",
    marginLeft: "10%",
    textAlign: "center",
    lineHeight: "2em"
  },
  option: {
    display: "flex",
    color: "primary",
    width: "100px",
    height: "45px",
    marginLeft: "5%",
    textAlign: "center",
    lineHeight: "3em"
  },

  button: {
    display: "inline-block",
    lineHeight: "1.5em",
    fontSize: "1.5em",
    background: blue[200],
    color: "black",
    padding: "0 30px",
    paddingRight: "20px",
    letterSpacing: "10px"
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

  handleClickBluetoothConnectAlert = () => {
    this.setState({ bluetoothConnectAlertShow: true });
  };

  handleRequestCloseBluetoothConnectAlert = () => {
    this.setState({ bluetoothConnectAlertShow: false });
  };

  render() {
    const {
      classes,
      COMPort,
      portLists,
      bluetoothSwitch,
      handleRequestCloseBluetooth,
      handleCOMPortConnect,
      handleCOMPortDisconnect,
      portConnectStateShow,
      handleRequestCloseBluetoothSwitch,
      bluetoothConnectAlertShow,
      handleClickBluetoothConnectAlert,
      handleRequestCloseBluetoothConnectAlert
    } = this.props;

    console.log(portConnectStateShow);

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
                <InputLabel htmlFor="bluetooth-port">Port</InputLabel>
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
        {/* <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={portConnectStateShow}
          onRequestClose={handleRequestCloseBluetoothStateShow}
          SnackbarContentProps={{ "aria-describedby": "message-id" }}
          message={<span id="message-id">bluetooth has been connected</span>}
          action={
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={handleRequestCloseBluetoothStateShow}
            >
              <CloseIcon />
            </IconButton>
          }

        /> */}

        <Dialog
          open={bluetoothConnectAlertShow}
          onRequestClose={handleRequestCloseBluetoothConnectAlert}
          style={{
            background: grey[500],
            color: "white",
            textAlign: "center",
            justifyContent: "center",
            justify: "center"
          }}
        >
          <DialogContent>
            <DialogContentText>
              bluetooth status has been changed
            </DialogContentText>
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
    bluetoothConnectAlertShow: bluetoothState.bluetoothConnectAlertShow
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
      console.log(COMPort);

      const COMPortSelected = COMPort.slice(
        COMPort.indexOf("(") + 1,
        COMPort.indexOf(")")
      );
      console.log(COMPortSelected);

      const RTKBlutoothConnectURLBase =
        "http://172.16.102.90:1338/bluetooth/connect/sp/";
      const RTKBlutoothConnectURL = RTKBlutoothConnectURLBase + COMPortSelected;
      console.log(RTKBlutoothConnectURL);

      fetch(RTKBlutoothConnectURL, {
        method: "GET"
      })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          dispatch({
            type: "COM_BLUETOOTH_MODULE_CONNECT"
          });
        });

      bluetoothConnectAlertShow: true;
    },
    handleCOMPortDisconnect: () => {
      console.log("handleCOMPortDisconnect Triggerd ...");
      console.log(COMPort);

      const COMPortSelected = COMPort.slice(
        COMPort.indexOf("(") + 1,
        COMPort.indexOf(")")
      );
      console.log(COMPortSelected);

      const RTKBlutoothDisconnectURLBase =
        "http://172.16.102.90:1338/bluetooth/connect/closesp/";
      const RTKBlutoothDisconnectURL =
        RTKBlutoothDisconnectURLBase + COMPortSelected;
      console.log(RTKBlutoothDisconnectURL);

      fetch(RTKBlutoothDisconnectURL, {
        method: "GET"
      })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          dispatch({
            type: "COM_BLUETOOTH_MODULE_DISCONNECT"
          });
        });
    },
    handleRequestCloseBluetoothConnectAlert: () => {
      dispatch({
        type: "COM_BLUETOOTH_CONNECT_ALERT_SWITCH"
      });
    }
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
    bluetoothConnectAlertShow: false
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
      // console.log(action.payload)
      newState.portLists = action.payload;
      return { ...state, ...newState };

    case "COM_BLUETOOTH_MODULE_CONNECT":
      // console.log(action.payload)
      newState.bluetoothConnectAlertShow = !newState.bluetoothConnectAlertShow;
      return { ...state, ...newState };

    case "COM_BLUETOOTH_MODULE_DISCONNECT":
      newState.bluetoothConnectAlertShow = !newState.bluetoothConnectAlertShow;
      return { ...state, ...newState };

    case "COM_BLUETOOTH_CONNECT_ALERT_SWITCH":
      newState.bluetoothConnectAlertShow = !newState.bluetoothConnectAlertShow;
      return { ...state, ...newState };

    default:
      return { ...state, ...newState };
  }
};
RootReducer.merge(BluetoothReducer);
