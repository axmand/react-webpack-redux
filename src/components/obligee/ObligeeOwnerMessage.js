import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const styleSheet = createStyleSheet('ObligeeOwnerMessage', theme => ({
  root: {
    width: '100%',
    maxWidth: 2000,
    background: theme.palette.background.paper,
  },
}));

function ObligeeOwnerMessage(props) {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <List>
        <ListItem button>
          <Avatar>
          </Avatar>
          <ListItemText primary="权利人姓名" secondary={props.NAME} />
        </ListItem>
        <ListItem button>
          <Avatar>
          </Avatar>
          <ListItemText primary="身份证号码" secondary={props.ID} />
        </ListItem>
      </List>
    </div>
  );
}

ObligeeOwnerMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  NAME: PropTypes.string.isRequired
};

export default withStyles(styleSheet)(ObligeeOwnerMessage);