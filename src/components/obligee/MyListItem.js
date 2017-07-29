import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';




   const MyListItem = ({ NAME,name,onClick}) => {
    return (
    
        <ListItem button>
         
          <ListItemText primary={NAME} secondary={name} onClick={onClick}/>
        </ListItem>
        
    )
}


export default MyListItem;