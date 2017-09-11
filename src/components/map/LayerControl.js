import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import UI
import { withStyles } from 'material-ui/styles';
import Menu, { MenuItem } from 'material-ui/Menu'
import { ListItem, ListItemText } from 'material-ui/List'
import CheckBox from 'material-ui/Checkbox'
import ContentCopy from 'material-ui-icons/ContentCopy';
const styles ={
  listitem: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '60px',
      padding: '0px',
      border: 0,    
      background: 'rgba(0, 0, 0, .6)',
      borderRadius: 5,
    },
  menu: {
    top: '88px !important',
    left: '824px !important',
    background: 'rgba(0, 0, 0, .6)',
    width: '120px',
  },
  listItemText: {
    padding: '0px',
    color:'#b3b3b3'
  },
  checked:{
    color:'#B3D9D9'
  }
}


class LayerControl extends Component {
  constructor(props){
    super(props);
    this.state ={
      menuOpen: false,
      anchorEl: undefined
    }
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
  }

  handleMenuOpen(event){
      this.setState({
         menuOpen: true,
         anchorEl: event.currentTarget 
        });
  }

  handleRequestClose = () => {
    this.setState({ menuOpen: false });
  };   

  render(){ 
    const classes=this.props.classes;
		const {
      topographicMapIsChecked,
      tianDiTuIsChecked,
			pointIsChecked,
			lineIsChecked,
      polygonIsChecked,
      labelIsChecked,
      handleTopographicMapIsChecked,
      handleTianDiTuIsIsChecked,
			handlePointIsChecked,
			handleLineIsChecked,
      handlePolygonIsChecked,
      handleLabelIsChecked
		} = this.props

    return(
      <div>
        <ListItem button className={classes.listitem} disableGutters={true}  onClick={this.handleMenuOpen}>
            <ContentCopy style={{
            color:'#b3b3b3',
            width:'40px',
            height:'40px'
          }}/>
        </ListItem>
        <Menu
          className={classes.menu}
          anchorEl={this.state.anchorEl}
          open={this.state.menuOpen}
          onRequestClose={this.handleRequestClose}
        >
          <MenuItem className={classes.menuitem} disableGutters={true}>
            <CheckBox 
              classes={{checked:classes.checked}}
              checked={true} 
              disabled={true} 
            />
            <ListItemText primary={'影像图'} disableTypography={true} className={classes.listItemText} />
          </MenuItem>

          <MenuItem className={classes.menuitem} disableGutters={true}>
            <CheckBox
              classes={{checked:classes.checked}}            
              checked={topographicMapIsChecked} 
              onChange={handleTopographicMapIsChecked} 
            />
            <ListItemText  primary={'地形图'}  disableTypography={true}  className={classes.listItemText} />
          </MenuItem>

          <MenuItem className={classes.menuitem} disableGutters={true}>
            <CheckBox             
              classes={{checked:classes.checked}}
              checked={tianDiTuIsChecked} 
              onChange={handleTianDiTuIsIsChecked} 
            />
            <ListItemText  primary={'天地图'}  disableTypography={true} className={classes.listItemText} />
          </MenuItem>

          <MenuItem className={classes.menuitem} disableGutters={true}>
            <CheckBox
              classes={{checked:classes.checked}} 
              checked={pointIsChecked} 
              onChange={handlePointIsChecked} 
            />
            <ListItemText primary={'界址点'} disableTypography={true} className={classes.listItemText} />
          </MenuItem>

          <MenuItem className={classes.menuitem} disableGutters={true}>
            <CheckBox 
              classes={{checked:classes.checked}}
              checked={lineIsChecked} 
              onChange={handleLineIsChecked} 
            />
            <ListItemText  primary={'四至'}  disableTypography={true} className={classes.listItemText} />
          </MenuItem>

          <MenuItem className={classes.menuitem} disableGutters={true}>
            <CheckBox 
              classes={{checked:classes.checked}} 
              checked={polygonIsChecked}  
              onChange={handlePolygonIsChecked} 
          />
            <ListItemText  primary={'宗地'}  disableTypography={true} className={classes.listItemText} />
          </MenuItem>

          <MenuItem className={classes.menuitem} disableGutters={true}>
            <CheckBox 
              classes={{checked:classes.checked}}
              checked={labelIsChecked} 
              onChange={handleLabelIsChecked} 
          />
            <ListItemText  primary={'注记'}  disableTypography={true} className={classes.listItemText} />
          </MenuItem>
        </Menu>
      </div>
    )
  }
}
/**
 * 限定组件的一些属性
 */
LayerControl.PropTypes={
      classes: PropTypes.object.isRequired,
      topographicMapIsChecked:PropTypes.bool.isRequired,
			tianDiTuIsChecked:PropTypes.bool.isRequired,
			pointIsChecked:PropTypes.bool.isRequired,
			lineIsChecked:PropTypes.bool.isRequired,
      polygonIsChecked:PropTypes.bool.isRequired,
      labelIsChecked:PropTypes.bool.isRequired,
      handleTopographicMapIsChecked:PropTypes.func.isRequired,
			handleTianDiTuIsIsChecked:PropTypes.func.isRequired,
			handlePointIsChecked:PropTypes.func.isRequired,
			handleLineIsChecked:PropTypes.func.isRequired,
      handlePolygonIsChecked:PropTypes.func.isRequired,
      handleLabelIsChecked:PropTypes.func.isRequired,
}
		
/**
 * 
 * @param {*} state 
 * @param {*} ownProps 
 */
const mapStateToProps = (state) => {

  const layerControlState=state.layerControlReduce;

    return {
      handleTopographicMapIsChecked: layerControlState.handleTopographicMapIsChecked,
			tianDiTuIsChecked: layerControlState.tianDiTuIsChecked,
			pointIsChecked: layerControlState.pointIsChecked,
			lineIsChecked: layerControlState.lineIsChecked,
      polygonIsChecked: layerControlState.polygonIsChecked,
      labelIsChecked:layerControlState.labelIsChecked
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
      handleTopographicMapIsChecked:()=>{
        dispatch({
          type:'handleTopographicMapIsChecked'
				})
			},
			handleTianDiTuIsIsChecked:()=>{
        dispatch({
          type:'handleTianDiTuIsIsChecked'
				})
			},
      handlePointIsChecked:()=>{
        dispatch({
          type:'handlePointIsChecked'
				})
			},
			handleLineIsChecked:()=>{
        dispatch({
          type:'handleLineIsChecked'
				})
			},
			handlePolygonIsChecked:()=>{
        dispatch({
          type:'handlePolygonIsChecked'
				})
      },
      handleLabelIsChecked:()=>{
        dispatch({
          type:'handleLabelIsChecked'
				})
			}
		} 
}  		


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LayerControl))
