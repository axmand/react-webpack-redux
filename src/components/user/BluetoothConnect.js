import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//import UI
import { withStyles } from "material-ui/styles";
import Dialog, { DialogTitle, DialogContent } from "material-ui/Dialog";
import Input, { InputLabel } from "material-ui/Input";
import List, { ListItem } from "material-ui/List";
import { FormControl } from "material-ui/Form";
import Select from "material-ui/Select";
import Button from "material-ui/Button";

import blue from "material-ui/colors/blue";

import RootReducer from "./../../redux/RootReducer";

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
    justify: "center"
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
    lineHeight: "2em"
  },
  option: {
    display: "flex",
    color: "primary",
    width: "100px",
    height: "45px",
    marginLeft: "5%",
    justify: "center",
    justifyContent: "center",
    alignSelf: "center",
    lineHeight: "3em"
  },

  button: {
    display: "inline-block",
    lineHeight: "1.5em",
    fontSize: "1.5em",
    background: blue[200],
    color: "black",
    padding: "0 30px"
  }
};

class BluetoothConnect extends React.Component {
  state = {
    port: ""
  };

  handleChangeBluetooth = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const {
      classes,
      portLists,
      bluetoothSwitch,
      handleRequestCloseBluetooth
    } = this.props;

    return (
      <Dialog
        open={bluetoothSwitch}
        onRequestClose={handleRequestCloseBluetooth}
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
                value={this.state.port}
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
                <Button raised className={classes.button} color="primary">
                  断开
                </Button>
                <Button raised className={classes.button} color="primary">
                  连接
                </Button>
              </ListItem>
            </List>

            {/* <Button onclick={handlePortListConnect} color="primary">
            连接
          </Button>
          <Button onclick={handlePortListDisconnect} color="primary">
            取消
          </Button> */}
          </form>
        </DialogContent>
      </Dialog>
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
    bluetoothSwitch: bluetoothState.bluetoothSwitch
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleRequestCloseBluetooth: () => {
      dispatch({
        type: "COM_BLUETOOTH_VIEW_SWITCH"
      });
    },
    handlePortListConnect: () => {
      fetch("http://172.16.102.90:1338/bluetooth/connect/sp/{spname}")
        .then(response => response.json())
        .then(json => {
          console.log(json);
          dispatch({
            type: "handlePortListConnect",
            payload: json
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    handlePortListDisconnect: () => {
      fetch("http://172.16.102.90:1338/bluetooth/connect/closesp/{spname}", {
        method: "GET"
      })
        .then(response => response.json())
        .then(json => {
          dispatch({
            type: "handlePortListDisconnect"
          });
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
    bluetoothSwitch: false
  },
  action
) => {
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "COM_BLUETOOTH_VIEW_SWITCH":
      newState.bluetoothSwitch = !newState.bluetoothSwitch;
      return { ...state, ...newState };

    case "COM_BLUETOOTH_MODULE_GET":
      // console.log(action.payload)
      newState.portLists = action.payload
      return { ...state, ...newState };

    default:
      return { ...state, ...newState };
  }

  if (action.type === "handlePortListDisconnect") {
    return { ...state, ...newState };
  } else return state;
};
RootReducer.merge(BluetoothReducer);
