import React, {Component} from 'react'
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import FontAwesome from 'react-fontawesome'
// import MapIcon from 'material-ui-icons/Map';

const styleSheet = {
  listitem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center ',
  },
  listItemText: {
    lineHeight: '32px',
    padding: '2px',
    color: '#ffffff',
  },
}

class SketchModule extends Component {

  render() {
    const {
      classes,
      onClick,
    } = this.props
  
    return (
      <ListItem button className={classes.listitem} disableGutters={true} onClick={onClick}>
        <ListItemIcon>
          <FontAwesome
            name='edit'
            size='2x'
            style={{
              width: '32px',
              height: '32px',
              margin: '0px',
              padding: '2px',
              color: '#C1C6C9',
            }}
          />
        </ListItemIcon>            
        <ListItemText
          primary="草图"
          disableTypography={true}
          className={classes.listItemText}
        />                         
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

export default withStyles(styleSheet,{name:'SketchModule'})(connect(mapStateToProps, mapDispatchToProps)(SketchModule))