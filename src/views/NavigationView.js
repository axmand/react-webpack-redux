import React, {Component} from 'react'
import { withStyles } from 'material-ui/styles'

import UserModule from '../components/user'
import ProjectModule from '../components/project'
import InvestigationModule from '../components/investigation'
import BoundaryModule from '../components/boundary'
import SketchModule from '../components/sketch'
import ObligeeModule from '../components/obligee'
import PrintModule from '../components/print'
import OutputModule from '../components/output'

import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
//redux
import { connect } from 'react-redux'


const styles = {
  root: {
    width: '100%',
    height:`${window.innerHeight}px`,
    backgroundColor: '#455A64',
    opacity: '0.95',
  },
  divider:{
    height:`${window.innerHeight*0.02}px`,
    backgroundColor: '#455A64',
    opacity: '0.95',
  }
}

class NavigationPanel extends Component {

  render() {
    const { 
      projectData,
      haveSaved,
      CompassModuleRunningState,
      classes
    } = this.props
  
    return (
      <div className={classes.root}>
        <List>
          <UserModule CompassModuleRunningState={CompassModuleRunningState}/>
          <Divider className={classes.divider} />
            <ProjectModule />
            <InvestigationModule />
            <BoundaryModule BoundaryData = {projectData} sketchHaveSaved={haveSaved}/>
            <SketchModule SketchModule = {projectData} sketchHaveSaved={haveSaved}/>
            <ObligeeModule ObligeeData={projectData} />
            <PrintModule PrintData={ projectData } sketchHaveSaved={haveSaved}/>
            <OutputModule  OutputData={ projectData } sketchHaveSaved={haveSaved}/>
        </List>
      </div>
    )
  }
  
}

const mapStateToProps = (state, ownProps) => {
  return {
    projectData: state.ProjectReduce.projectData,
    haveSaved:state.sketchReduce.haveSaved,
    CompassModuleRunningState: state.userReduce.CompassModuleRunningState,
  }
}

export default connect(mapStateToProps)(withStyles(styles, { name: 'NavigationPanel' })(NavigationPanel));