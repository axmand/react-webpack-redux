import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { withStyles, createStyleSheet } from 'material-ui/styles'
import Paper from 'material-ui/Paper'

import Map from '../components/map/Map'
import Sketch from '../components/sketch/Sketch'

const styleSheet = createStyleSheet('MainViewPanel', theme => ({
  root: {
    flexGrow: 1,
  },
}));

class MapView extends Component {

  state = {
    index: 0,
  }

  handleChange = (event, index) => {
    this.setState({ index })
  }

  render() {  
		const classes = this.props.classes

    return (
      <div>
        <Route exact path="/" component={Map}/> 
        <Route path="/sketch" component={Sketch}/>          
      </div>
    )
  }
  
}

export default withStyles(styleSheet)(MapView);