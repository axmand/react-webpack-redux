import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
//UI
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import Button from 'material-ui/Button';
//图标
import RestoreIcon from 'material-ui-icons/Restore';
import FavoriteIcon from 'material-ui-icons/Favorite';
import LocationOnIcon from 'material-ui-icons/LocationOn';

const styleSheet = createStyleSheet('SelfButton0', {
  root: {
    width: 10,
  },
});

const SelfButton0 =({ onTouch, complete, text ,value})=>{
    return( 
      <div className={classes.root}>
        <BottomNavigation value={value} onChange={this.handleChange} >
          <BottomNavigationButton label="编辑" />
        </BottomNavigation>
        <Button onClick={()=>onTouch(text)}>完成</Button>
        <Button>删除</Button>
      </div>
    )
};

SelfButton0.propTypes = {
  classes: PropTypes.object.isRequired,
  onTouch: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default withStyles(styleSheet)(SelfButton0);