import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//import UI
import { withStyles } from "material-ui/styles";
import Popover from "material-ui/Popover";
import { MenuItem } from "material-ui/Menu";
import { ListItem, ListItemText } from "material-ui/List";
import Checkbox from "material-ui/Checkbox";

import LayersIcon from "material-ui-icons/Layers";

const styles = {
  // root:{    
  //   height: `${window.innerHeight * 0.05625}px`,
  //   width: `${window.innerHeight * 0.05625}px`,
  // },
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
  },
  menu: {
    // top: '88px !important',
    // left: '824px !important',
    background: "rgba(69, 90, 100, .6)",
    width: "8%",
  },
  menuitem: {
    height: '30%',
    fontSize: "100%",
    paddingTop: "5%",
    paddingBottom: "5%",
    justifyContent: 'center ',
    background: "rgba(69, 90, 100, .6)",
  },
  checkbox: {
    height: '30%',
    width: '30%',
  },
  listItemText: {
    fontSize: "1em",
    color: "#fff",
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  checked: {
    color: "#B3D9D9"
  }
};

class LayerControl extends Component {
  // constructor(props){
  //   super(props);
  //   this.state ={
  //     menuOpen: false,
  //     anchorEl: null,
  //     anchorOriginVertical: 'top',
  //     anchorOriginHorizontal: 'left',
  //     transformOriginVertical: 'top',
  //     transformOriginHorizontal: 'right',
  //   }
  //   this.handleMenuOpen = this.handleMenuOpen.bind(this);
  // }

  state = {
    menuOpen: false,
    anchorEl: null,
    anchorOriginVertical: "top",
    anchorOriginHorizontal: "left",
    transformOriginVertical: "top",
    transformOriginHorizontal: "right"
  };

  handleMenuOpen = () => {
    this.setState({
      menuOpen: true,
      anchorEl: findDOMNode(this.button)
    });
    // console.log(this.state)
  };

  handleRequestClose = () => {
    this.setState({
      menuOpen: false
    });
  };

  button = null;

  render() {
    const classes = this.props.classes;
    const {
      topographicMapIsChecked,
      tianDiTuIsChecked,
      pointIsChecked,
      lineIsChecked,
      jzxIsChecked,
      polygonIsChecked,
      labelIsChecked,
      handleTopographicMapIsChecked,
      handleTianDiTuIsIsChecked,
      handlePointIsChecked,
      handleLineIsChecked,
      handleJZXIsChecked,
      handlePolygonIsChecked,
      handleLabelIsChecked
    } = this.props;
    const {
      menuOpen,
      anchorEl,
      anchorOriginVertical,
      anchorOriginHorizontal,
      transformOriginVertical,
      transformOriginHorizontal
    } = this.state;

    return (
      <div className={classes.root}>
        <ListItem
          ref={node => {
            this.button = node;
          }}
          button
          className={classes.listitem}
          disableGutters={true}
          onClick={this.handleMenuOpen}
        >
          <LayersIcon className={classes.icon} />
        </ListItem>
        <Popover
          anchorEl={anchorEl}
          open={menuOpen}
          onRequestClose={this.handleRequestClose}
          anchorOrigin={{
            vertical: anchorOriginVertical,
            horizontal: anchorOriginHorizontal
          }}
          transformOrigin={{
            vertical: transformOriginVertical,
            horizontal: transformOriginHorizontal
          }}
          className={classes.menu}
        >
          <MenuItem className={classes.menuitem}>
            <Checkbox
              classes={{ checked: classes.checked }}
              checked={true}
              disabled={true}
              className={classes.checkbox}
            />
            <ListItemText
              primary={"影像图层"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </MenuItem>

          <MenuItem className={classes.menuitem}>
            <Checkbox
              classes={{ checked: classes.checked }}
              checked={topographicMapIsChecked}
              onChange={handleTopographicMapIsChecked}
              className={classes.checkbox}
            />
            <ListItemText
              primary={"地形图层"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </MenuItem>

          <MenuItem className={classes.menuitem}>
            <Checkbox
              classes={{ checked: classes.checked }}
              checked={tianDiTuIsChecked}
              onChange={handleTianDiTuIsIsChecked}
              className={classes.checkbox}
            />
            <ListItemText
              primary={"天地图层"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </MenuItem>

          <MenuItem className={classes.menuitem}>
            <Checkbox
              classes={{ checked: classes.checked }}
              checked={pointIsChecked}
              onChange={handlePointIsChecked}
              className={classes.checkbox}
            />
            <ListItemText
              primary={"界址点层"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </MenuItem>

          <MenuItem className={classes.menuitem}>
            <Checkbox
              classes={{ checked: classes.checked }}
              checked={lineIsChecked}
              onChange={handleLineIsChecked}
              className={classes.checkbox}
            />
            <ListItemText
              primary={"四至图层"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </MenuItem>

          <MenuItem className={classes.menuitem}>
            <Checkbox
              classes={{ checked: classes.checked }}
              checked={jzxIsChecked}
              onChange={handleJZXIsChecked}
              className={classes.checkbox}
            />
            <ListItemText
              primary={"界址线层"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </MenuItem>

          <MenuItem className={classes.menuitem}>
            <Checkbox
              classes={{ checked: classes.checked }}
              checked={polygonIsChecked}
              onChange={handlePolygonIsChecked}
              className={classes.checkbox}
            />
            <ListItemText
              primary={"宗地图层"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </MenuItem>

          <MenuItem className={classes.menuitem}>
            <Checkbox
              classes={{ checked: classes.checked }}
              checked={labelIsChecked}
              onChange={handleLabelIsChecked}
              className={classes.checkbox}
            />
            <ListItemText
              primary={"注记图层"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </MenuItem>
        </Popover>
      </div>
    );
  }
}
/**
 * 限定组件的一些属性
 */
LayerControl.PropTypes = {
  classes: PropTypes.object.isRequired,
  topographicMapIsChecked: PropTypes.bool.isRequired,
  tianDiTuIsChecked: PropTypes.bool.isRequired,
  pointIsChecked: PropTypes.bool.isRequired,
  lineIsChecked: PropTypes.bool.isRequired,
  jzxIsChecked:PropTypes.bool.isRequired,
  polygonIsChecked: PropTypes.bool.isRequired,
  labelIsChecked: PropTypes.bool.isRequired,
  handleTopographicMapIsChecked: PropTypes.func.isRequired,
  handleTianDiTuIsIsChecked: PropTypes.func.isRequired,
  handlePointIsChecked: PropTypes.func.isRequired,
  handleLineIsChecked: PropTypes.func.isRequired,
  handleJZXIsChecked:PropTypes.func.isRequired,
  handlePolygonIsChecked: PropTypes.func.isRequired,
  handleLabelIsChecked: PropTypes.func.isRequired
};

/**
 * 
 * @param {*} state 
 * @param {*} ownProps 
 */
const mapStateToProps = state => {
  const layerControlState = state.layerControlReduce;

  return {
    handleTopographicMapIsChecked:
    layerControlState.handleTopographicMapIsChecked,
    tianDiTuIsChecked: layerControlState.tianDiTuIsChecked,
    pointIsChecked: layerControlState.pointIsChecked,
    lineIsChecked: layerControlState.lineIsChecked,
    jzxIsChecked:layerControlState.jzxIsChecked,
    polygonIsChecked: layerControlState.polygonIsChecked,
    labelIsChecked: layerControlState.labelIsChecked
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleTopographicMapIsChecked: () => {
      dispatch({
        type: "handleTopographicMapIsChecked"
      });
    },
    handleTianDiTuIsIsChecked: () => {
      dispatch({
        type: "handleTianDiTuIsIsChecked"
      });
    },
    handlePointIsChecked: () => {
      dispatch({
        type: "handlePointIsChecked"
      });
    },
    handleLineIsChecked: () => {
      dispatch({
        type: "handleLineIsChecked"
      });
    },
    handleJZXIsChecked: () => {
      dispatch({
        type: "handleJZXIsChecked"
      });
    },
    handlePolygonIsChecked: () => {
      dispatch({
        type: "handlePolygonIsChecked"
      });
    },
    handleLabelIsChecked: () => {
      dispatch({
        type: "handleLabelIsChecked"
      });
    }
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(LayerControl)
);

// <MenuItem className={classes.menuitem} disableGutters={true}>
//   <CheckBox
//     classes={{ checked: classes.checked }}
//     checked={true}
//     disabled={true}
//   />
//   <ListItemText
//     primary={"影像图"}
//     disableTypography={true}
//     className={classes.listItemText}
//   />
// </MenuItem>

// <MenuItem className={classes.menuitem} disableGutters={true}>
//   <CheckBox
//     classes={{ checked: classes.checked }}
//     checked={topographicMapIsChecked}
//     onChange={handleTopographicMapIsChecked}
//   />
//   <ListItemText
//     primary={"地形图"}
//     disableTypography={true}
//     className={classes.listItemText}
//   />
// </MenuItem>

// <MenuItem className={classes.menuitem} disableGutters={true}>
//   <CheckBox
//     classes={{ checked: classes.checked }}
//     checked={tianDiTuIsChecked}
//     onChange={handleTianDiTuIsIsChecked}
//   />
//   <ListItemText
//     primary={"天地图"}
//     disableTypography={true}
//     className={classes.listItemText}
//   />
// </MenuItem>

// <MenuItem className={classes.menuitem} disableGutters={true}>
//   <CheckBox
//     classes={{ checked: classes.checked }}
//     checked={pointIsChecked}
//     onChange={handlePointIsChecked}
//   />
//   <ListItemText
//     primary={"界址点"}
//     disableTypography={true}
//     className={classes.listItemText}
//   />
// </MenuItem>

// <MenuItem className={classes.menuitem} disableGutters={true}>
//   <CheckBox
//     classes={{ checked: classes.checked }}
//     checked={lineIsChecked}
//     onChange={handleLineIsChecked}
//   />
//   <ListItemText
//     primary={"四至"}
//     disableTypography={true}
//     className={classes.listItemText}
//   />
// </MenuItem>

// <MenuItem className={classes.menuitem} disableGutters={true}>
//   <CheckBox
//     classes={{ checked: classes.checked }}
//     checked={polygonIsChecked}
//     onChange={handlePolygonIsChecked}
//   />
//   <ListItemText
//     primary={"宗地"}
//     disableTypography={true}
//     className={classes.listItemText}
//   />
// </MenuItem>

// <MenuItem className={classes.menuitem} disableGutters={true}>
//   <CheckBox
//     classes={{ checked: classes.checked }}
//     checked={labelIsChecked}
//     onChange={handleLabelIsChecked}
//   />
//   <ListItemText
//     primary={"注记"}
//     disableTypography={true}
//     className={classes.listItemText}
//   />
// </MenuItem>

// <FormGroup>
//   <FormControlLabel
//     control={
//       <Checkbox
//         classes={{ checked: classes.checked }}
//         checked={true}
//         value="RemoteSensingImage"
//       />
//     }
//     disabled={true}
//     label="影像图"
//     disableTypography={true}
//     className={classes.formControlLabel}
//   />
//   <FormControlLabel
//     control={
//       <Checkbox
//         classes={{ checked: classes.checked }}
//         checked={topographicMapIsChecked}
//         onChange={handleTopographicMapIsChecked}
//       />
//     }
//     label="地形图"
//   />
//   <FormControlLabel
//     control={
//       <Checkbox
//         classes={{ checked: classes.checked }}
//         checked={tianDiTuIsChecked}
//         onChange={handleTianDiTuIsIsChecked}
//         value="TianDiTu"
//       />
//     }
//     label="天地图"
//   />
//   <FormControlLabel
//     control={
//       <Checkbox
//         classes={{ checked: classes.checked }}
//         checked={pointIsChecked}
//         onChange={handlePointIsChecked}
//         value="BoundaryMark"
//       />
//     }
//     label="界址点"
//   />
//   <FormControlLabel
//     control={
//       <Checkbox
//         classes={{ checked: classes.checked }}
//         checked={lineIsChecked}
//         onChange={handleLineIsChecked}
//         value="SiZhi"
//       />
//     }
//     label="四至"
//   />
//   <FormControlLabel
//     control={
//       <Checkbox
//         classes={{ checked: classes.checked }}
//         checked={polygonIsChecked}
//         onChange={handlePolygonIsChecked}
//         value="LandParcel"
//       />
//     }
//     label="宗地"
//   />
//   <FormControlLabel
//     control={
//       <Checkbox
//         classes={{ checked: classes.checked }}
//         checked={labelIsChecked}
//         onChange={handleLabelIsChecked}
//         value="Notation"
//       />
//     }
//     label="注记"
//   />
// </FormGroup>
