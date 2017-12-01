import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog, { 
  DialogActions,
  DialogContent,
  DialogTitle, 
  } from 'material-ui/Dialog';
import Table, { 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow 
} from 'material-ui/Table';
import Grid from 'material-ui/Grid';
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

class LandInfoQueryModule extends Component {

  render() {
    const {
      classes,
      OwnPowerSide,
      ParcelCode,
      TuDiZhengShuHao,
      TuDiZuoLuo,
      landInfoQueryResultZDList,
      // landInfoQueryNotification,
      landInfoQueryDisplayState,
      handleChange,      
      handleLandInfoQuery,
      handleCloseLandInfoQueryModule,
    } = this.props;

    return (
      <div>
        <Dialog
          fullScreen
          open={landInfoQueryDisplayState}
          onRequestClose={handleCloseLandInfoQueryModule}
        >
          <DialogTitle
            className={classes.dialogTitle}
            disableTypography
          >
            宗地信息查询
          </DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item>
                    <TextField
                      autoFocus
                      required
                      margin="normal"
                      id="landInfoQueryInputOwnPowerSide"
                      label="权利人名称"
                      fullWidth
                      value={OwnPowerSide}
                      onChange={handleChange('OwnPowerSide')}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      required
                      margin="normal"
                      id="landInfoQueryInputParcelCode"
                      label="宗地代码"
                      fullWidth
                      value={ParcelCode}
                      onChange={handleChange('ParcelCode')}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      required
                      margin="normal"
                      id="landInfoQueryInput"
                      label="土地证书号"
                      fullWidth
                      value={TuDiZhengShuHao}
                      onChange={handleChange('TuDiZhengShuHao')}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      required
                      margin="normal"
                      id="landInfoQueryInputLocation"
                      label="土地坐落"
                      fullWidth
                      value={TuDiZuoLuo}
                      onChange={handleChange('TuDiZuoLuo')}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>宗地代码</TableCell>
                      <TableCell>宗地特征码</TableCell>
                      <TableCell>权利性质</TableCell>
                      <TableCell>坐落</TableCell>
                      <TableCell>用途</TableCell>
                      <TableCell>权利人名称</TableCell>
                      <TableCell>不动产权证号</TableCell>
                      <TableCell>GLLX</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {landInfoQueryResultZDList.map(n => {
                      return (
                        <TableRow key={n._attrList.FEATUREGUID}>
                          <TableCell>{n._attrList.ZDDM}</TableCell>
                          <TableCell>{n._attrList.ZDTZMNAME}</TableCell>
                          <TableCell>{n._attrList.QLXZNAME}</TableCell>
                          <TableCell>{n._attrList.ZL}</TableCell>
                          <TableCell>{n._attrList.YTNAME}</TableCell>
                          <TableCell>{n._qlrList[0].QLRMC}</TableCell>
                          <TableCell>{n._qlrList[0].BDCQZH}</TableCell>
                          <TableCell>{n._qlrList[0].GLLX}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button raised onClick={handleLandInfoQuery}>
              提交查询
            </Button>
            <Button raised onClick={handleCloseLandInfoQueryModule}>
              退出查询
            </Button>
          </DialogActions>         
        </Dialog>
        <WaitingModule />
      </div>
    );
  }
}

LandInfoQueryModule.propTypes = {
  handleLandInfoQuery: PropTypes.func.isRequired,
  handleCloseLandInfoQueryModule: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const investigationState = state.investigationReduce;
  return {
    landInfoQueryDisplayState: investigationState.landInfoQueryDisplayState,
    landInfoQueryResultZDList: investigationState.landInfoQueryResultZDList,
    landInfoQueryNotification: investigationState.landInfoQueryNotification,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleChange: props => event => {
      // console.log("Trigger handleChange fun ...")
      dispatch({
        type: "CHANGE_INPUT_VALUE_LAND_INFORMATION_QUERY",
        payload: {
          targetID: props,
          targetValue: event.target.value
        }
      });
    },
    handleLandInfoQuery: () => {

      dispatch({
        type: "OPEN_WAITING_MODULE",
      });

      const QueryLandInfoRequestDetails = {
        // 'strQLR': ownProps.OwnPowerSide,
        'strQLR': "雷秀珍",
        'strZDDM': ownProps.ParcelCode,
        // 'strZDDM': '450108001012GB00293',
        'strTDZSH': ownProps.TuDiZhengShuHao,
        'strZL': ownProps.TuDiZuoLuo,
      };
      

      const LandInfoQueryURL =
      appConfig.affairsInterfaceRootPath + "/SSBdcWebService/ServicePad.asmx/QueryLandInfo";
      fetch(LandInfoQueryURL, {
        method: "POST",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',          
        },
        body: JSON.stringify(QueryLandInfoRequestDetails)
      })
        .then(response => {
          console.log(response)
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
          console.log(json);
          const payloadJSON = JSON.parse(json.d)
          dispatch({
            type: "LAND_INFORMATION_QUERY_SUCCESS",
            payload: payloadJSON._zdList
          });
          dispatch({
            type: "STATUS_BAR_NOTIFICATION",
            payload: {
              notification: "本次查询成功",
            }
          });
          dispatch({
            type: "CLOSE_WAITING_MODULE"
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
            type: "CLOSE_WAITING_MODULE"
          })
        })
    },
    handleCloseLandInfoQueryModule: () => {
      dispatch({
        type: "CLOSE_LAND_INFORMATION_QUERY_MODULE"
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles,{name:'LandInfoQueryModule'})(LandInfoQueryModule));
