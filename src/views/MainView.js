/**
 * 
 * 页面布局基页
 * @author yellow date 2017/7/23
 * 
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import NavigationView from './NavigationView'
import MapView from './MapView'

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
  },
}

//前置存在login登录页，此页作为第二页
class MainView extends Component {

  render() {
    const classes = this.props.classes;

    return (
      <Grid container spacing={0} className={classes.root}>
        <Grid item xs={1}>
          <NavigationView />
        </Grid>
        <Grid item xs={11} >
          <MapView />
          <div style={{ position: 'fixed', zIndex: '999999', bottom: '15px', marginLeft: '15px',fontSize:'16px',textShadow:'5px 2px 6px #aaa'}}>打印机已丢失连接.....</div>
        </Grid>
      </Grid>    
    )
  }
}

MainView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainView);