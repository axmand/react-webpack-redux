import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import ReactCamera from './ReactCamera.jsx'
import PhotoCameraIcon from 'material-ui-icons/PhotoCamera';
import IconButton from 'material-ui/IconButton';
//redux
import {connect} from 'react-redux'

const styles = {
  box:{ 
  }
};

let camera

class CameraWrapper extends Component {
  
  constructor(props) {
    super(props);
    camera =null
  }

  render() {
    const {
      capture,
    } = this.props
    
    return (
      <div>
  		<ReactCamera 
				ref={ node => camera = node }
				width={896} 
				height={672} 
        />
        <br/>
  		<IconButton onClick={capture} style={{marginLeft:'600px',paddingBottom:'80px',width: '100px',}}> 
        <PhotoCameraIcon/>
      </IconButton>
  	</div>
    )
  }
}

CameraWrapper.propTypes = {
  capture:PropTypes.func.isRequired
};



//声明state和方法
const mapStateToProps = (state,ownProps) => {
  return {
    PhotoItemTest: state.BoundaryReduce.PhotoItemTest,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
          console.log(ownProps)
  return {
    capture:()=>{
      camera.snapshot()
      .then(data => {
         dispatch({
         type: 'capture',
         payload: {data:data,ownProps:ownProps}
         })
         dispatch({
         type: 'capture2projectData',
         payload: {data:data,ownProps:ownProps}
         })        
      })
      .catch(console.error)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( withStyles(styles,{name:'CameraWrapper'})(CameraWrapper));