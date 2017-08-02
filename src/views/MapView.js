import React, {Component} from 'react'

import { withStyles, createStyleSheet } from 'material-ui/styles'

import Map from '../components/map/Map'

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
		// const classes = this.props.classes

    return (
      <div>
        <Map />
      </div>
    )
  }
  
}

export default withStyles(styleSheet)(MapView);