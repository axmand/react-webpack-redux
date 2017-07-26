import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import { withStyles, createStyleSheet } from 'material-ui/styles'
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper'
import Tabs, { Tab } from 'material-ui/Tabs'
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';

const styleSheet = createStyleSheet('Sketch', theme => ({
  root: {
    flexGrow: 1,
  },
  tab: {    
    padding: '0px',    
  },
  label: {
    fontSize: '20px',
  },
  button: {
    margin: theme.spacing.unit,
  },
}));

class Sketch extends Component {

  state = {
    index: 0,
  }

  handleChange = (event, index) => {
    this.setState({ index })
  }

  render() {  
		const classes = this.props.classes

    return (
      <Grid container direction='column' gutter={0}>
        <Grid item xs={12}>
          <Grid container gutter={0}>
            <Grid item xs={11}>
              <Tabs          
                index={this.state.index}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab 
                  classes={{
                    label: this.props.classes.label
                  }} 
                  label="草图编辑" 
                />
                <Tab
                  classes={{
                    label: this.props.classes.label
                  }}           
                  label="专题图编辑" 
                />       
              </Tabs>
            </Grid>
            <Grid item xs={1}>
              <Link to="/">
                <IconButton className={classes.button} aria-label="Delete">
                  <ClearIcon />
                </IconButton>
              </Link>          
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            123133
          </Paper>        
        </Grid>
      </Grid>
    )
  }
  
}

export default withStyles(styleSheet)(Sketch);