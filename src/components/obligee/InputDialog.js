import React, { Component } from 'react';
import Button from 'material-ui/Button';
import RootReducer from './../../redux/RootReducer';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';



class InputDialog extends Component {
  state = {
    open: false,
 
  };
 
  
 render() {
    return (<div>
        <Dialog open={this.state.open}>
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
  }
}

function MyOnClick(){
            alert("test");
        };
 const mapReduce = (state = 0, action) => {
    if (action.type === "onMyListItemClick1") {
       
//如何修改InputDialog的开关状态。。。
    }
    
    return state;
};

RootReducer.merge(mapReduce);
export default InputDialog;