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
    fontSize: '24px',
    lineHeight: '40px',
    color: '#ffffff',
    fontFamily: "微软雅黑",
    fontWeight: 'bold',
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
            size='4x'
            style={{
              width: '64px',
              height: '64px',
              margin: '0px',
              color: '#C1C6C9',
            }}
          />
        </ListItemIcon>            
        <ListItemText
          primary="绘制草图"
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