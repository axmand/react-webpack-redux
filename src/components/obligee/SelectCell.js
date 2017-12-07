import React from 'react'
import PropTypes from 'prop-types'
// import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Dialog, {
  DialogActions,
  DialogContent,
  // DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import List, { ListItem, ListItemText } from 'material-ui/List'
// import { withStyles } from 'material-ui/styles';
import Menu, { MenuItem } from 'material-ui/Menu';

// Map Redux state to component props
function mapStateToProps(state,ownProps) {
  const key =ownProps.name;
  let obj = {};
  obj['key2'] = key;
  // obj[key] = state.value[key];
  obj[key] = state.ObContentReducer[ownProps.tableIndex][key];
  return obj;
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
//修改命令 修改的字段名 修改字段的值
    onCompleteInput: (inputData,name,tableID) => {

      dispatch({
        type: "change", 
        payload: {
          inputValue: inputData,
          inputName: name,
          tableID:tableID
        }
      });
    }
  }
}

var options = [
    
  ];

class SelectCellUI extends React.PureComponent {


    componentDidMount() {
        // var items = this.props.items;
        // options=items.split(" "); 
        
    }


    state = {
        anchorEl: null,
        open: false,
        selectedIndex: 0,
      };

    button = undefined;
    
      handleClickListItem = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
      };
    
      handleMenuItemClick = (event, index) => {
        this.setState({ selectedIndex: index, open: false });

        var inputData =options[index];
        this.props.onCompleteInput(inputData, this.props.name,this.props.tableIndex);
      };
    
      handleRequestClose = () => {
        this.setState({ open: false });
      };



  showInputCell = () => {
    this.setState({ cellShow: true });
  }
  closeInputCell = () => {
    this.setState({ cellShow: false });
  }
  

  shouldComponentUpdate(nextProps,nextStates){
    const {name,key2}=this.props;
    if(!key2)
      return true;
    return name === key2;
  }

  render() {
    const { 
      // onCompleteInput, 
      // dialogShow, 
      key2, 
      name,
      title,
      tips 
    } = this.props;
    let value ="未填";
    if(name ===key2){
      value =this.props[key2]||"未填";
    }
    var items = this.props.items;
    options=items.split(" "); 
    
  
    return (
        <div width="100%" height="100%">
  
  
          <ListItem button>
          <Input
          id="placeholder"
          
         width="50px"
         multiline
          margin="normal"
          value={value}
          onClick={this.showInputCell}
          style={{ fontSize: '15px',color: '#000000',fontFamily: "微软雅黑", fontWeight: 'bold',padding: '0px',}}
        />
          
          </ListItem>
          <Dialog open={this.state.cellShow}>
            <DialogTitle>
            {title}
            </DialogTitle>
            <DialogContent>
            <List>
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
           
            onClick={this.handleClickListItem}
          >
            <ListItemText
          
              primary={options[this.state.selectedIndex]}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
            
              <br/>
              提示
              <br />
  {tips}
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={this.closeInputCell}>
                确定
              </Button>
  
            </DialogActions>
          </Dialog>
  
        </div>
      )
  }
}

SelectCellUI.propTypes = {
  
  onCompleteInput: PropTypes.func.isRequired,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectCellUI)

