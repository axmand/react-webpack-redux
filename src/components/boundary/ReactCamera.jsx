import React,{ Component } from 'react'
import PropTypes from 'prop-types';

export class Camera extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      streamSrc: null
    }
    this.video = null
    
    //provide mirror effect for preview video
    this.style = {
      WebkitTransition: 'scaleX(-1)',
      transform: 'scaleX(-1)'
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

      if (!navigator.getUserMedia) reject('This camera is not supported by your browser!')

      const handleStream = stream => resolve(window.URL.createObjectURL(stream))
      const mediaConfig = {
        video: true,
        audio: false
      }

      //Access media input device, handle stream of media output
      navigator.getUserMedia(mediaConfig, handleStream, reject)
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
  width: 900,
  height: 500
}

export default Camera