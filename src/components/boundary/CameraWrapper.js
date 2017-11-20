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
				width={990} 
				height={550} />
        <br/>
  		<IconButton onClick={capture} style={{marginLeft:'450px',paddingBottom:'80px',width: '100px',}}> 
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
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    capture:()=>{
      camera.snapshot()
      .then(data => {
         dispatch({
         type: 'capture',
         payload: data
         })
        console.log(data)
      })
      .catch(console.error)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( withStyles(styles,{name:'CameraWrapper'})(CameraWrapper));