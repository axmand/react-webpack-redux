import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import ReactCamera from './ReactCamera.jsx'
import Button from 'material-ui/Button';
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
      photoItems,
      classes
    } = this.props
    
    return (
      <div>
  		<ReactCamera 
				ref={ node => camera = node }
				width={1650} 
				height={1000} />
  		<Button onClick={capture}>拍摄</Button>
  	</div>
    )
  }
}

CameraWrapper.propTypes = {
  photoItems: PropTypes.array.isRequired,
  capture:PropTypes.func.isRequired
};



//声明state和方法
const mapStateToProps = (state,ownProps) => {
  return {
    photoItems: state.BoundaryReduce.photoItems,
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
        /* data: string (base-64-jqeg)
        Process your data here*/
        console.log(data)
      })
      .catch(console.error)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( withStyles(styles,{name:'CameraWrapper'})(CameraWrapper));