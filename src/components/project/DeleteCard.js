import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//ui
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
//图标
//组件

const styleSheet = createStyleSheet(theme => ({

}));

class  DelCard extends Component{

    render(){
      
        const classes = this.props.classes;
        const { onClick }= this.props;

        return(
            <div>
            </div>
        )
    }
}

// Map Redux state to component props
function mapStateToProps(state) {
  return {

  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {

  }
}

//connect
DelCard.propTypes = {

}

const DeleteCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

export default DeleteCard;