import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dialog, {
  DialogActions,
  DialogContent,
  // DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { ListItem } from 'material-ui/List'
// import Input from 'material-ui/Input';
// import List, { ListItem, ListItemText } from 'material-ui/List'
// import Tabs, { Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';


// Map Redux state to component props
function mapStateToProps(state,ownProps) {
   
    
return {
    value:state.ObContentReducer[ownProps.tableIndex][ownProps.name][ownProps.row]//state.ObContentReducer[ownProps.tableIndex][ownProps.name][ownProps.row]
}
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
//修改命令 修改的字段名 修改字段的值
onCompleteInput: (value,name,row,tableID) => {

      dispatch({
        type: "changelist", 
        payload: {
            type:name,
          row:row,
          value:value,
          tableID:tableID

        }
      });
    }
  }
}


class ListInputCellUI extends React.PureComponent {
    state = {
        cellShow: false,
        
      };
    
    showInputCell = () => {
        this.setState({ cellShow: true });
      }
      closeInputCell = () => {
        this.setState({ cellShow: false });
      }
      onChanged = (e) => {
        var inputData = e.target.value;
        this.props.onCompleteInput(inputData,this.props.name,this.props.row,this.props.tableIndex);
      }
    
      
    
      render() {
        const { 
          // row,
          // onclick,
          // onCompleteInput,
          title,
          tips,
          // name,
          // key2,
          value,
          // tableIndex 
        } = this.props;
       // let value ="";
        // if(name ===key2){
        //   value =this.props[key2]||"";
        // }
    
      
        return (
          <div width="100%" height="100%">
    
            <ListItem button  onClick={this.showInputCell} >
           
            <TextField
              id="placeholder"
              style={{ fontSize: '15px',color: '#000000',fontFamily: "微软雅黑", fontWeight: 'bold',padding: '0px',}}
              fullWidth
              multiline
              margin="normal"
              value={value}
            />
              {/* <ListItemText primary={value}/> */}
            </ListItem>
    
         
            <Dialog open={this.state.cellShow}>
              <DialogTitle>
              {title}
              </DialogTitle>
              <DialogContent>
    
                {/* <Input ref="NameInput" defaultValue={value} onChange={this.onChanged} /> */}
    
    
                <TextField
              id="placeholder"
            
              fullWidth
              multiline
              margin="normal"
              value={value}
              defaultValue={value} 
              onChange={this.onChanged}
            />
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

ListInputCellUI.propTypes = {
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListInputCellUI)