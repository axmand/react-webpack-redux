import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog, { 
  DialogActions,
  DialogContent,
  DialogTitle, 
  } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import { connect } from 'react-redux';

import WaitingModule from "../universe/WaitingModule"
import appConfig from '../../redux/Config'

const styles = {
  dialog: {
    width: '100%',
  },
  dialogTitle: {
    backgroundColor: '#455A64',
    fontSize: '2em',
    color: '#ffffff',
    fontFamily: "微软雅黑",
    fontWeight: 'bold',
  },
};

class IdentityVerificationModule extends Component {

  render() {
    const {
      classes,
      IDCardNumber,
      IDCardName,
      identityVerificationNotification,
      idVerificationDisplayState,
      handleChange,      
      handleIdentityVerificationQuery,
      handleCloseIdentityVerificationModule,
    } = this.props;

    return (
      <div>
        <Dialog
          open={idVerificationDisplayState}
          onRequestClose={handleCloseIdentityVerificationModule}
        >
          <DialogTitle
            className={classes.dialogTitle}
            disableTypography
            style={{
              width: `${window.innerWidth}px`,
            }}
          >
            身份核实
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="normal"
              id="identityVerificationInputIDNumber"
              label="公民身份号码"
              fullWidth
              value={IDCardNumber}
              onChange={handleChange('IDCardNumber')}
            />
            <TextField
              required
              margin="normal"
              id="identityVerificationInputName"
              label="姓名"
              helperText={identityVerificationNotification}
              fullWidth
              value={IDCardName}
              onChange={handleChange('IDCardName')}
            />
          </DialogContent>
          <DialogActions>
            <Button raised onClick={handleIdentityVerificationQuery}>
              提交查询
            </Button>
          </DialogActions>         
        </Dialog>
        <WaitingModule />
      </div>
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
    identityVerificationNotification: investigationState.identityVerificationNotification,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleChange: props => event => {
      dispatch({
        type: "CHANGE_INPUT_VALUE_IDENTITY_VERIFICATION",
        payload: {
          targetID: props,
          targetValue: event.target.value
        }
      });
    },
    handleIdentityVerificationQuery: () => {

      dispatch({
        type: "OPEN_WAITING_MODULE",
      });

      const IdentityVerificationRequestDetails = {
        'personid': ownProps.IDCardNumber,
        'personname': ownProps.IDCardName,
      };
      let IdentityVerificationRequesFormBodyPost = [];
      
      for (let property in IdentityVerificationRequestDetails) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(IdentityVerificationRequestDetails[property]);
        IdentityVerificationRequesFormBodyPost.push(encodedKey + "=" + encodedValue);
      }
      
      const IdentityVerificationRequestBodyPost = IdentityVerificationRequesFormBodyPost.join("&");
      const IdentityVerificationRequestURL = appConfig.idValidationInterfaceRootPath + "/CheckPersonValid?" + IdentityVerificationRequestBodyPost;

      console.log(IdentityVerificationRequestURL)


      fetch(IdentityVerificationRequestURL, {
        method: "POST",
        mode: "cors",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
      })
        .then(response => {
          return response.json()
            .then(json => {
              if (response.ok) {
                return json
              } 
              else {
                return Promise.reject(json)
              }
            })
        })
        .then(json => {
          
          // console.log(json);

          dispatch({
            type: "CLOSE_WAITING_MODULE",
          });
          dispatch({
            type: "IDENTITY_VERIFICATION_QUERY_SUCCESS",
            payload: {
              identityVerificationQueryResult: json,
              data: IdentityVerificationRequestDetails,
            }
          });          
        })
        .catch(err => {

          // console.log(err);

          dispatch({
            type: "CLOSE_WAITING_MODULE",
          });
          dispatch({
            type: "IDENTITY_VERIFICATION_QUERY_FAILURE",
            payload: {
              data: err,
            }
          });
        });
    },
    handleCloseIdentityVerificationModule: () => {
      dispatch({
        type: "CLOSE_IDENTITY_VERIFICATION_MODULE"
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles,{name:'IdentityVerificationModule'})(IdentityVerificationModule));
