import React, {Component} from 'react'
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import MapIcon from 'material-ui-icons/Map';
// import FontAwesome from 'react-fontawesome'
// import MapIcon from 'material-ui-icons/Map';

const styleSheet = {
  listitem: {
    flexDirection: 'column',
    justifyContent: 'center ',
    // paddingTop: "15%",
    // paddingBottom: "15%",
  },
  listItemIcon: {
    width: "40%",
    height: "40%",
    margin: 0,
    color: "#C1C6C9"
  },
  listItemText: {
    fontSize: '1em',
    color: '#ffffff',
    fontFamily: "微软雅黑",
    fontWeight: 'bold',
    padding: '0px',
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
          <MapIcon className={classes.listItemIcon}/>
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