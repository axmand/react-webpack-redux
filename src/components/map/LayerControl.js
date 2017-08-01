import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import UI
import Menu, { MenuItem } from 'material-ui/Menu'
import List, { ListItem,ListItemText } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import ContentCopy from 'material-ui-icons/ContentCopy';


class LayerControl extends Component {
  constructor(props){
    super(props);
    this.state ={
      menuOpen:false,
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
         <IconButton  onClick={this.handleMenuOpen}>
            <ContentCopy 
            style={{
                color:'#000',
                width: '30px',
                height: '30px',
                margin: '0px',   
                background: 'rgba(255, 255, 255, .75)',//'white',
                borderRadius: 5,
            }}/>        
         </IconButton>
         <Menu
          anchorEl={this.state.anchorEl}
          open={this.state.menuOpen}       
          anchorOrigin={{
              horizontal:'right',
              vertical:'center',
          }}
        >
        <MenuItem dense button >
          <input type="checkbox"  checked={pointIsChecked} onClick={handlePointIsChecked} />
          <ListItemText primary={'point'} />
        </MenuItem>
        <MenuItem dense button >
          <input type="checkbox" checked={linetIsChecked} onClick={handleLineIsChecked} />
          <ListItemText primary={'line'} />
        </MenuItem>
        <MenuItem dense button >
          <input  type="checkbox" checked={polygonIsChecked}  onClick={handlePolygonIsChecked} />
          <ListItemText primary={'polygon'} />
        </MenuItem>
        <MenuItem dense button onClick={this.handleMenuOpen}>
          返回
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
const mapStateToProps = (state, ownProps) => {

const props=ownProps;
    return {
			pointIsChecked: state.pointIsChecked,
			linetIsChecked: state.linetIsChecked,
			polygonIsChecked: state.polygonIsChecked
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
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


export default connect(mapStateToProps, mapDispatchToProps)(LayerControl);