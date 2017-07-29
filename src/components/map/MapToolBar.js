/**
 * 
 */
import React from 'react';
import PropTypes from 'prop-types';
//ui
import { withStyles, createStyleSheet } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
//图标
import ContentCopy from 'material-ui-icons/ContentCopy';
import Flag from 'material-ui-icons/Flag';
import Add from 'material-ui-icons/Add';
import  Remove from 'material-ui-icons/Remove';
import LayerControl from './LayerControl';

const styleSheet = createStyleSheet('MapToolBar', theme => ({

  IconButton: {
      flexDirection: 'column',
      justifyContent: 'center ',
  },
}));

function MapToolBar({ onClick, complete,text}) {

  return (
    <div>
        <LayerControl/>
        <IconButton onClick={()=>onClick("get_location")}>
            <Flag  />
        </IconButton>
        <IconButton onClick={()=>onClick("zoom_in")}>
            <Add />
        </IconButton>
        <IconButton onClick={()=>onClick("zoom_out")}>
            <Remove />
        </IconButton>     
    </div>
  );
}

MapToolBar.propTypes = {
    onClick: PropTypes.func.isRequired,
    text:PropTypes.string.isRequired
}

export default withStyles(styleSheet)(MapToolBar);