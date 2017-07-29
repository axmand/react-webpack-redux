import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Menu, { MenuItem } from 'material-ui/Menu'
import List, { ListItem,ListItemText } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import ContentCopy from 'material-ui-icons/ContentCopy';

const styleSheet = createStyleSheet('LayerControl', theme => ({
  listitem: {
    flexDirection: 'column',
    justifyContent: 'center ',
  },
}))

class LayerControl extends Component {
  state = {
    anchorEl: undefined,
    open: false,
    checked: ['point'],
  }

   handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  }

  handleToggle = (event, value) => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    console.log(checked)
    console.log(newChecked)
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
       console.log(checked)
  };

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  render() {
    const classes = this.props.classes
  
    return (
      <div >
        <IconButton className={classes.button} onClick={this.handleClick}>
            <ContentCopy />        
        </IconButton>
        <Menu
          anchorEl={this.state.anchorEl}
          open={this.state.open}       
          anchorOrigin={{
              horizontal:'right',
              vertical:'center',
          }}
        >
        {['point','line','polygon'].map(value=>
        <MenuItem dense button key={value} >
            <Checkbox
                onClick={event => this.handleToggle(event, value)}
                checked={this.state.checked.indexOf(value) !== -1}
              />
              <ListItemText primary={`${value }`} />
        </MenuItem>
        )}
        <MenuItem onClick={this.handleRequestClose}>返回</MenuItem>
        </Menu>          
      </div>
    )
  } 
}

export default withStyles(styleSheet)(LayerControl)