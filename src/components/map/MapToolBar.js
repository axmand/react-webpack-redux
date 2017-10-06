/**
 * 
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
//ui
import { withStyles } from "material-ui/styles";
import List, { ListItem } from "material-ui/List";
//图标
import LocationOn from "material-ui-icons/LocationOn";
import Add from "material-ui-icons/Add";
import Remove from "material-ui-icons/Remove";
import Search from "material-ui-icons/Search";
//组件
import LayerControl from "./LayerControl";
import RealtimeMapping from "./RealtimeMapping";

const styles = {
  list: {
    position: "absolute",
    top: "20%",
    right: "2.0833%",
    width: "3.5%"
  },
  listitem: {
    flexDirection: "column",
    justifyContent: "center",
    padding: "0px",
    border: 0,
    background: "rgba(69, 90, 100, .6)",
    borderRadius: '12.5%',
  },
  icon: {
    color: "#fff",
    width: "100%",
    height: "100%"
  }
};

class MapToolBar extends Component {
  render() {
    const classes = this.props.classes;
    const { onClick } = this.props;

    return (
      <div>
        <List className={classes.list}>
          <LayerControl />
          <ListItem dense={true} />
          <ListItem
            button
            className={classes.listitem}
            disableGutters={true}
            onClick={() => onClick("get_location")}
          >
            <LocationOn className={classes.icon} />
          </ListItem>
          <ListItem dense={true} />
          <ListItem
            button
            className={classes.listitem}
            disableGutters={true}
            onClick={() => onClick("zoom_in")}
          >
            <Add className={classes.icon} />
          </ListItem>
          <ListItem dense={true} />
          <ListItem
            button
            className={classes.listitem}
            disableGutters={true}
            onClick={() => onClick("zoom_out")}
          >
            <Remove className={classes.icon} />
          </ListItem>
          <ListItem dense={true} />
          {/* <ListItem
            button
            className={classes.listitem}
            disableGutters={true}
            onClick={() => onClick("zoom_out")}
          >
            <Search className={classes.icon} />
          </ListItem>
          <ListItem dense={true} /> */}
          <RealtimeMapping />
        </List>
      </div>
    );
  }
}

MapToolBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { name: "MapToolBar" })(MapToolBar);
