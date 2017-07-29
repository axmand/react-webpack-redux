import React, { Component } from 'react';
import Button from 'material-ui/Button';
import RootReducer from './../../redux/RootReducer';
import { createStore } from 'redux';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';


  const InputDialog = ({ open }) => (

    <div>
        <Dialog open={open}>
          <DialogTitle>
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button  color="primary">
              Disagree
            </Button>
            <Button  color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  

export default InputDialog;