import React, {Component} from 'react'
import { connect } from 'react-redux';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import MapIcon from 'material-ui-icons/Map';

const styleSheet = createStyleSheet('SketchModule', theme => ({
  listitem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center ',
  },
  listitemicon: {
    width: '50%',
    height: '50%',
    margin: '0px',
  },
}));

class SketchModule extends Component {

  render() {
    const {
      classes,
      onClick,
    } = this.props
  
    return (
      <ListItem button className={classes.listitem} disableGutters={true} onClick={onClick}>
        <ListItemIcon className={classes.listitemicon}>
          <MapIcon />
        </ListItemIcon>            
        <ListItemText primary="草图" />                         
      </ListItem>
    )
  }
}

const mapStateToProps = ( state ) => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {
    return {
      onClick: () => {
          dispatch({
              type: 'MAP_SKETCH_VIEW_SWITCH',
          })
      },
    }
}

export default withStyles(styleSheet)(connect(mapStateToProps, mapDispatchToProps)(SketchModule))