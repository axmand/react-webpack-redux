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

//设置组件样式
const styles = {
  list: {
    position: "absolute",
    top: "20%",
    right: "2.0833%",
    width: `${window.innerHeight * 0.05625}px`,
  },
  listitem: {
    flexDirection: "column",
    justifyContent: "center",
    padding: "0px",
    border: 0,
    background: "rgba(69, 90, 100, .6)",
    borderRadius: '12.5%',
    height: `${window.innerHeight * 0.05625}px`,
    width: `${window.innerHeight * 0.05625}px`,
  },
  icon: {
    color: "#fff",
    width: "80%",
    height: "80%"
  }
};

class MapToolBar extends Component {
  render() {
    const classes = this.props.classes;
    const { onClick } = this.props;

    return (
      <div>
        <List className={classes.list}>
          {/* 图层控制组件 */}
          <LayerControl />
          {/* 获取当前定位组件 */}
          <ListItem dense={true} />
          <ListItem
            button
            className={classes.listitem}
            disableGutters={true}
            onClick={() => onClick("get_location")}
          >
            <LocationOn className={classes.icon} />
          </ListItem>
          {/* 地图放大组件 */}
          <ListItem dense={true} />
          <ListItem
            button
            className={classes.listitem}
            disableGutters={true}
            onClick={() => onClick("zoom_in")}
          >
            <Add className={classes.icon} />
          </ListItem>
          {/* 地图缩小组件 */}
          <ListItem dense={true} />
          <ListItem
            button
            className={classes.listitem}
            disableGutters={true}
            onClick={() => onClick("zoom_out")}
          >
            <Remove className={classes.icon} />
          </ListItem>
          {/* 宗地信息查询组件 */}
          <ListItem dense={true} />
          <ListItem
            button
            className={classes.listitem}
            disableGutters={true}
            onClick={() => onClick("LAND_INFORMATION_QUERY")}
          >
            <Search className={classes.icon} />
          </ListItem>
          {/* 实时成图控制组件 */}
          <ListItem dense={true} />
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
