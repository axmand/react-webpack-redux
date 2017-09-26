import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//import UI
import { withStyles } from "material-ui/styles";
import Dialog, {
  DialogActions,
  DialogTitle,
  DialogContent
} from "material-ui/Dialog";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl } from "material-ui/Form";
import Select from "material-ui/Select";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import Button from "material-ui/Button";

//import unique ID as key for map() function (or method?)
import uuidv4 from "uuid/v4";

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: "1em",
    minWidth: 120
  }
};
class BluetoothConnect extends React.Component {
  state = {
    port: ""
  };

  handleChangeBluetooth = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleRequestClose = () => {
    console.log("BluetoothConnect handleRequestClose ...");
    this.props.onRequestClose();
  };

  render() {
    const { classes } = this.props;
    const portLists = [
      { portNumber: "COM1" },
      { portNumber: "COM2" },
      { portNumber: "COM3" },
      { portNumber: "COM4" }
    ];

    console.log(this.props.open);

    return (
      <Dialog
        open={this.props.open}
        onRequestClose={this.handleRequestClose}
      >
        <DialogTitle>{"蓝牙连接"}</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="bluetooth-port">Port</InputLabel>
              <Select
                value={this.state.port}
                onChange={this.handleChangeBluetooth("port")}
                input={<Input id="bluetooth-port" />}
                native
              >
                <option value="" />
                {portLists.map(portList => (
                  <option value={portList.portNumber}>
                    {portList.portNumber}
                  </option>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onclick={this.handleRequestClose} color="primary">
            取消
          </Button>
          <Button onclick={this.handleRequestClose} color="primary">
            连接
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

BluetoothConnect.PropTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(BluetoothConnect);
