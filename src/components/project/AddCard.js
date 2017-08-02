import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
//UI
import Dialog,{ DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
//图标
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add'
//img
import reptileImage from './test.jpg';

//Redux state
function mapStateToProps(state) {
  return {
    AddcardShow:state.show
  }
}
//Redux actions
function mapDispatchToProps(dispatch) {
  return {
    onShowClick: () => dispatch(showAddCard),
  }
}

const styleSheet = createStyleSheet('AddCard', {
  card: {
    maxWidth: 345,
    maxHeight: 345
  },
});

function  CreateTasks(item) {
      return (
      <Card key={item.key}
            style={{maxWidth:345,
                    maxHeight:345}}>
        <CardMedia>
          <img src={reptileImage} alt="Contemplative Reptile" />
        </CardMedia>
        <CardActions>
          <Button dense color="primary">
            {item.text}
          </Button>
        </CardActions>
      </Card>);
}

class AddCard extends Component {
 
  constructor() {
    super();
    this.state = {
    anchorEl: undefined,
    open: false,
    items: []
    };
  }

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  }
  
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleChange = () => {
    this.setState({ text: this.target.value });
  };

  addItem = () => {
    var itemArray = this.state.items;
    
    itemArray.push(
    {
      text: this._inputElement.value,
      key: Date.now()
    }
    );

    this.setState({
      items: itemArray
    });

    this._inputElement.value = "";

  };

  render(){

    const { AddcardShow,onShowClick } = this.props;
   
    const todoEntries = this.props.entries;
    const listItems = todoEntries.map(CreateTasks);
   
    return(
      <div>
      
      <ul className="theList">
        {listItems};
      </ul>
      
      <Dialog
          open={this.handleOpen}
          onRequestClose={this.handleRequestClose}
       >
          <DialogContent>
            <DialogContentText>
              请输入项目名称
            </DialogContentText>
            <input type="text" ref={(a) => this._inputElement = a} placeholder="权利人+宗地代码等"/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="default">
              取消
            </Button>
            <Button  type="submit" onClick={this.addItem} color="primary">
              确认
            </Button>
          </DialogActions>
       </Dialog>
      </div>
    )
  }

}


AddCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(AddCard);