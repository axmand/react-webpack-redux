/* whole page--dialog
    avatar,typography,div--line?,button--(icon+typography)
*/

import React , {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
//import UI
import {withStyles} from 'material-ui/styles';
import List,{ListItem,ListItemAvatar,ListItemText} from 'material-ui/List';
import Dialog,{DialogActions,DialogContent,DialogContentText} from 'material-ui/Dialog';
import Avatar from 'material-ui/avatar';
import Button from 'material-ui/Button';
import Typograghy from 'material-ui/Typography';
//import icon
import AccountCircle from 'material-ui-icons/AccountCircle';
import Bluetooth from 'material-ui-icons/Bluetooth';
import Devices from 'material-ui-icons/Devices';
import Photo from 'material-ui-icons/Photo';
//import color
import blue from 'material-ui/colors/blue';

const userInfo = ['用户名','ID','单位','职位'];
const loginInfo = ['上次登录时间','上次登陆地点'];
const styles = {
    avatar:{
        background: blue [100],
        color:blue[600],
    },
};

class UserManagement extends Component {
    handleRequestClose = () => {
        this.props.onRequestClose(this.props.selectedValue);
    };
    handleListItemClick = value => {
        this.props.onRequestClose(value);
    };

    render() {
        const {onRequestClose, selectedValue, ...other } = this.props;

        return (
          <Dialog onRequestClose={this.handleRequestClose} {...other}>
            <DialogTitle>UserManagement</DialogTitle>
          <div>
          <List>
            {userInfo.map(userInfo =>
              <ListItem button onClick={() => this.handleListItemClick(userInfo)} key={userInfo}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <AccountCircle />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={userInfo} />
              </ListItem>,
            )}
            {loginInfo.map(loginInfo =>
              <ListItem button onClick={() => this.handleListItemClick(loginInfo)} key={loginInfo}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <AccountCircle />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="loginInfo" + {loginInfo} />
              </ListItem>,
            )}
            <ListItem button onClick={() => this.handleListItemClick('addAccount')}>
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="add account" />
            </ListItem>
          </List>
        </div>
      </Dialog>
    );
  }
}

UserManagement.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

const UserManagementWrapped = withStyles(styles)(UserManagement);

class UserManagementDemo extends Component {
  state = {
    open: false,
    selectedValue: userInfo[1],
  };

  handleRequestClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    return (
      <div>
        <Typography type="subheading">
          Selected: {this.state.selectedValue}
        </Typography>
        <br />
        <Button onClick={() => this.setState({ open: true })}>Open simple dialog</Button>
        <UserManagementWrapped
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default UserManagementDemo;









