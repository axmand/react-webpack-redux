import React, {Component} from 'react'
import { withStyles } from 'material-ui/styles'

import UserModule from '../components/user'
import ProjectModule from '../components/project'
import InvestigationModule from '../components/investigation'
import BoundaryModule from '../components/boundary'
import ObligeeModule from '../components/obligee'

import SketchModule from '../components/sketch'
import PrintModule from '../components/print'

import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

const styles = {
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#455A64',
    opacity: '0.95',
  },
}

class NavigationPanel extends Component {

  render() {
    const classes = this.props.classes;
  
    return (
      <div className={classes.root}>
        <List>
          <UserModule />
          <Divider light />
          <ListItem />
          <ProjectModule />
          <ListItem />
          <InvestigationModule />
          <ListItem />
          <BoundaryModule />
          <ListItem />
          <SketchModule />
          <ListItem />
          <ObligeeModule />
          <ListItem />
          <PrintModule />
          <ListItem />
          <PrintModule />
          <ListItem />
        </List>
      </div>
    )
  }
  
}

export default withStyles(styles)(NavigationPanel);