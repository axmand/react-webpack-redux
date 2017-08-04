import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
//UI
import Dialog,{ DialogActions, DialogContent, DialogContentText,DialogTitle } from 'material-ui/Dialog';
import Card, { CardActions, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
//图标
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add'
//img
import reptileImage from './test.jpg';
//自定义


const styleSheet = createStyleSheet('SelfCard', theme =>({
  card: {
    maxWidth: 300,
    maxHeight: 345
  },
  addicon:{
    width: '300px',
    height: '300px',
    padding: '14px 16px 15px',
    margin: '0px',
  }
}));

class SelfCard extends Component {

  state = {
    anchorEl: undefined,
    open: false,
    checkedA: true,
    checkedB: false,
    items: []
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  }
  
  handleOpen = () => {
    this.setState({ open: true });
  };

  addItem = () => {
    var itemArray = this.state.items;
    
    itemArray.push(
    {
      text: this.Element.value,
      key: Date.now()
    }
    );

    this.setState({
      items: itemArray
    });

    this.Element.value = "";
  };

  render(){
    const classes = this.props.classes;

    return (
    <div>
      <TodoItems entries={this.state.items}/>
     
      <IconButton onClick={this.handleClick} className={classes.addicon}>
         <AddIcon button/>
      </IconButton>

       <Dialog
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
       >
          <DialogTitle>
           请输入项目名称
          </DialogTitle>
          <DialogContent>
            <input type="text" ref={(a) => this.Element = a} placeholder="权利人+宗地代码等"/>
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
  );
  }
}

var TodoItems = React.createClass({
  render() {
    var todoEntries = this.props.entries;
    function createTasks(item) {
      return (
      <Card key={item.key} 
            style={{maxWidth:300,
                    maxHeight:345}}>
        <CardMedia>
          <img src={reptileImage} alt="Contemplative Reptile" />
        </CardMedia>
        <CardActions>
          <Checkbox />          
          <Button dense color="primary">
            {item.text}
          </Button>
        </CardActions>
      </Card>);
    }

    var listItems = todoEntries.map(createTasks);
    return (
      <ul className="theList">
        {listItems}
      </ul>
    );
  }
});

SelfCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(SelfCard);