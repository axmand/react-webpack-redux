import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import PersonIcon from 'material-ui-icons/Person';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';
import blue from 'material-ui/colors/blue';

import { connect } from 'react-redux';

const styles = {

};

class IdentityVerificationModule extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        open={true}
      >
        <DialogTitle>身份核实</DialogTitle>
        <div>
          
        </div>
      </Dialog>
    );
  }
}

IdentityVerificationModule.propTypes = {

};

const mapStateToProps = (state, ownProps) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    
	} 
}  		

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles,{name:'IdentityVerificationModule'})(IdentityVerificationModule));