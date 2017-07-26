import React, {Component} from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles';

import UserModule from '../components/user'
import ProjectModule from '../components/project'
import ObligeeModule from '../components/obligee'
import InvestigationModule from '../components/investigation'
import SketchModule from '../components/sketch'
import PrintModule from '../components/print'

import List from 'material-ui/List';
import Divider from 'material-ui/Divider';

const styleSheet = createStyleSheet('NavigationPanel', theme => ({
  root: {
    width: '100%',
  },
}));

class NavigationPanel extends Component {

  render() {
    const classes = this.props.classes;
  
    return (
      <div className={classes.root}>
        <List>
          <UserModule />
          <Divider light />
          <ProjectModule />
          <ObligeeModule />
          <InvestigationModule />
          <SketchModule />
          <PrintModule />
        </List>
      </div>
    )
  }
  
}

export default withStyles(styleSheet)(NavigationPanel);