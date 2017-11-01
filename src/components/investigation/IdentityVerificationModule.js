import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import { connect } from 'react-redux';

const styles = {

};

class IdentityVerificationModule extends Component {

  render() {
    const {
      idVerificationDisplayState,
      handleCloseIdentityVerificationModule,
      handleIdentityVerificationQuery,
    } = this.props;

    return (
      <Dialog
        open={idVerificationDisplayState}
        onRequestClose={handleCloseIdentityVerificationModule}
      >
        <DialogTitle>身份核实</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="identityVerificationInputIDNumber"
            label="公民身份号码"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="identityVerificationInputName"
            label="姓名"
            fullWidth
          />
          <Button raised onClick={handleIdentityVerificationQuery}>
            提交查询
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

IdentityVerificationModule.propTypes = {
  handleCloseIdentityVerificationModule: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const investigationState = state.investigationReduce;
  return {
    idVerificationDisplayState: investigationState.idVerificationDisplayState,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleCloseIdentityVerificationModule: () => {
      dispatch({
        type: "CLOSE_IDENTITY_VERIFICATION_MODULE"
      })
    },
    handleIdentityVerificationQuery: () => {
      dispatch({
        type: "Identity_Verification_Query"
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles,{name:'IdentityVerificationModule'})(IdentityVerificationModule));
