import React,{ Component } from 'react'
import PropTypes from 'prop-types';

var exArray = []; //存储设备源ID 

export class Camera extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      streamSrc: null
    }
    this.video = null
    
    //provide mirror effect for preview video
    this.style = {
      // WebkitTransition: 'scaleX(-1)',
      // transform: 'scaleX(-1)',
      marginLeft: '200px'
    }

    this.initializeCam = this.initializeCam.bind(this)
    this.snapshot = this.snapshot.bind(this)
  }

  componentWillMount() {
    this.initializeCam()
      .then(streamSrc => this.setState({...this.state, streamSrc }))
      .catch(alert)
  }

  initializeCam() {
    return new Promise((resolve, reject) => {
    
      //Provide fallback for web browser
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia

      // var exArray = []; //存储设备源ID 

      navigator.mediaDevices.enumerateDevices().then(function(devices) {
        devices.forEach(function(device) {
          console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
          if (device.kind === "videoinput") {exArray.push(device.deviceId);}  

        let cameraJson2 = [];
        let cameraJson = {
          optional: []
        };
        let sourceid0 = {
          sourceId: ""
        }
        sourceid0.sourceId = exArray[1];
        cameraJson2.push(sourceid0);
        cameraJson.optional = cameraJson2;
        let mediaConfig = { audio: false, video: cameraJson}
  
        //Access media input device, handle stream of media output
        navigator.mediaDevices.getUserMedia(mediaConfig)
        .then(function(mediaStream) {
            var video = document.querySelector('video');
            video.src = window.URL.createObjectURL(mediaStream);
            video.onloadedmetadata = function(e) {
            // Do something with the video here.
            video.play();};})
        .catch(function(err) { console.log(err.name); })
        })
        })    
      })
  }

  snapshot() {
    const { width, height } = this.props
    return new Promise((resolve, reject) => {
      try {
        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d');

        //provide mirror effect for captured image
        ctx.translate(width, 0)
        ctx.scale(-1, 1)
        ctx.drawImage(this.video, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg'))
      } catch (e) {
        reject(e)
      }
    })
  }

  render() {
    const { width, height, classNames } = this.props
    const { streamSrc } = this.state
    return (
      <video 
        className={classNames}
        style={this.style}
        ref={video => this.video = video}
        width={width}
        height={height} 
        src={streamSrc}
        autoPlay
      />
    )
  }
}

Camera.displayName = 'Camera'

Camera.propTypes = {
  classNames: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
}

Camera.defaultProps = {
  width: 990,
  height: 550
}

export default Camera