import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import UI
import { withStyles } from 'material-ui/styles';
import Menu, { MenuItem } from 'material-ui/Menu'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import ContentCopy from 'material-ui-icons/ContentCopy';

const styles ={
  listitem: {
    width: '50px',
    height: '50px',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '5px 5px 5px', 
    border: 0,    
    background: 'rgba(255, 255, 255, .75)',
    borderRadius: 5,
    },
}


class LayerControl extends Component {
  constructor(props){
    super(props);
    this.state ={
      menuOpen:false,
      anchorEl:undefined
    }
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
  }
  handleMenuOpen(event){
      this.setState({
         menuOpen: !this.state.menuOpen,
         anchorEl: event.currentTarget 
        });
  }
   

  render(){ 
    const classes=this.props.classes;
		const { 
			pointIsChecked,
			linetIsChecked,
			polygonIsChecked,
			handlePointIsChecked,
			handleLineIsChecked,
		 handlePolygonIsChecked,
		} = this.props

    return(
		<div>
      <ListItem button className={classes.listitem} disableGutters={true}  onClick={this.handleMenuOpen}>
        <ListItemIcon 
          style={{
            color:'#000',
            width: '24px',
            height: '24px',
            margin: '0px',              
          }}
        >
          <ContentCopy  />
        </ListItemIcon>
      </ListItem>
      <Menu
        className={classes.menu}
        anchorEl={this.state.anchorEl}
        open={this.state.menuOpen}       
      >
        <MenuItem className={classes.menuitem}>
          <input type="checkbox"  checked={pointIsChecked} onClick={handlePointIsChecked} />
          <ListItemText primary={'界址点'} />
        </MenuItem>
        <MenuItem className={classes.menuitem}>
          <input type="checkbox" checked={linetIsChecked} onClick={handleLineIsChecked} />
          <ListItemText primary={'界址线'} />
        </MenuItem>
        <MenuItem className={classes.menuitem}>
          <input  type="checkbox" checked={polygonIsChecked}  onClick={handlePolygonIsChecked} />
          <ListItemText primary={'宗地'} />
        </MenuItem>
        <MenuItem onClick={this.handleMenuOpen} className={classes.menuitem}>
          <ListItemText primary={'返回'} />
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
			pointIsChecked:PropTypes.bool.isRequired,
			linetIsChecked:PropTypes.bool.isRequired,
			polygonIsChecked:PropTypes.bool.isRequired,
			handlePointIsChecked:PropTypes.func.isRequired,
			handleLineIsChecked:PropTypes.func.isRequired,
		  handlePolygonIsChecked:PropTypes.func.isRequired
}
		
/**
 * 
 * @param {*} state 
 * @param {*} ownProps 
 */
const mapStateToProps = (state) => {

  const layerControlState=state.layerControlReduce;

    return {
			pointIsChecked: layerControlState.pointIsChecked,
			linetIsChecked: layerControlState.linetIsChecked,
			polygonIsChecked: layerControlState.polygonIsChecked
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
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
			}
		} 
}  		


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LayerControl))
