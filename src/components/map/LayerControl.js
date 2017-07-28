import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Menu, { MenuItem } from 'material-ui/Menu'
import List, { ListItem,ListItemText } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import ContentCopy from 'material-ui-icons/ContentCopy';

const styleSheet = createStyleSheet('LayerControl', theme => ({
  listitem: {
    flexDirection: 'column',
    justifyContent: 'center ',
  },
}))

function LayerControl({onClick,layername,layerchecked}){
  return(
    <div>
      <IconButton>
            <ContentCopy />        
        </IconButton>
        <Menu>
          <MenuItem onClick={()=>onClick("point")}>
          <Checkbox/>
              <ListItemText primary="point" />
          </MenuItem>
          <MenuItem onClick={()=>onClick("line")}>
          <Checkbox/>
              <ListItemText primary="line" />
          </MenuItem>
        </Menu>
    </div>
  )
}
LayerControl.propTypes = {
    onClick: PropTypes.func.isRequired,
    layername:PropTypes.string.isRequired,
    layerchecked:PropTypes.bool.isRequired
}
export default withStyles(styleSheet)(LayerControl);