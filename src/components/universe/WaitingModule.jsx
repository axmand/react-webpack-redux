import React from 'react';
import { connect } from "react-redux";
import RootReducer from "../../redux/RootReducer";
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import { CircularProgress } from 'material-ui/Progress';
import teal from 'material-ui/colors/teal';

const styles = theme => ({
  modulWrapper: {

  },
  progress: {
    backgroundColor: 'rgba(0, 0, 0, 0.54)',
  },
});

class WaitingModule extends React.Component {
 
   render() {
    
      const {
        classes,
        waitingModuleDisplayState,
        handleRequestCloseWaitingModule,
      } = this.props

      return (
        <Dialog 
          className={classes.modulWrapper}
          open={waitingModuleDisplayState} 
          onRequestClose={handleRequestCloseWaitingModule}
        >
            <CircularProgress className={classes.progress} style={{ color: teal[900] }} size={64} thickness={3.6} />
        </Dialog>
      )
   }
 }
 
 WaitingModule.displayName = 'WaitingModule'
 
 WaitingModule.propTypes = {
  waitingModuleDisplayState: PropTypes.bool,
 }

 const mapStateToProps = state => {
  const waitingModuleState = state.waitingModuleReduce;
  return {
    waitingModuleDisplayState: waitingModuleState.waitingModuleDisplayState,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleRequestCloseWaitingModule: () => {
      
    }
  }
}

//加入reducer
const waitingModuleReduce = (state = {
  waitingModuleDisplayState: false,
}, action) => {

  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    //
    case 'OPEN_WAITING_MODULE':
      newState.waitingModuleDisplayState = true; 
      return {...state, ...newState}
    case 'CLOSE_WAITING_MODULE':
      newState.waitingModuleDisplayState = false; 
      return {...state, ...newState}

    
    default:
      return state;
  }
  
};

RootReducer.merge(waitingModuleReduce);

export default withStyles(styles, { name: "WaitingModule" })(connect(mapStateToProps, mapDispatchToProps)(WaitingModule));