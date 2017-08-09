import React, { Component } from 'react';
import PropTypes from 'prop-types';
//UI
import Card, { CardActions, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
//图标
//img
import reptileImage from './test.jpg';
//Redux
import { connect } from 'react-redux';

class AddCard extends Component {
  
  render(){
		const { 
			BoxisChecked,
			handleBoxisChecked,
    } = this.props
    
    let todoEntries = this.props.entries;
    
    function  CreateTasks(item) {
      return (
      <Card key={item.key} style={{maxWidth:300,maxHeight:345}}>
        <CardMedia>
          <img src={reptileImage} alt="Contemplative Reptile" />
        </CardMedia>  
        <CardActions>
          <Checkbox checked={BoxisChecked} onClick={handleBoxisChecked}/>
          <Button color="primary">{item.text.inputValue}</Button>
        </CardActions>
      </Card>);
    } 
    
    let listItems = todoEntries.map(CreateTasks);
   
    return(
      <div>
        {listItems}
      </div>
    )
  }
}

AddCard.propTypes = {
  entries: PropTypes.array.isRequired,
  BoxisChecked:PropTypes.bool.isRequired,
  handleBoxisChecked:PropTypes.func.isRequired,
};

const mapStateToProps = (state,ownProps) => {
    return {
			BoxisChecked: state.CheckBoxReduce.BoxisChecked,
    }
}

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
      handleBoxisChecked:()=>{
        dispatch({
          type:'handleBoxisChecked'
				})
			},
		} 
}  	

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);

