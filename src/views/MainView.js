/**
 * 
 * 页面布局基页
 * @author yellow date 2017/7/23
 * 
 */

import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import PropTypes from 'prop-types'

import NavigationView from './NavigationView'
import MapView from './MapView'

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

const styleSheet = createStyleSheet('MainView', theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
}));

//前置存在login登录页，此页作为第二页
class MainView extends Component {

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <Router>
          <Grid container={true} spacing={0}>
            <Grid item xs={1}>
              <NavigationView />
            </Grid>
            <Grid item xs={11} >
              <Grid container direction='column' spacing={0}>
                <Grid item xl={12}>
                  <Paper>
                    <MapView />
                  </Paper>
                  <div style={{ position: 'fixed', bottom: '15px', marginLeft: '15px',fontSize:'16px',textShadow:'5px 2px 6px #aaa'}}>打印机已丢失连接.....</div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Router>
      </div>
    )
  }
}

MainView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(MainView);