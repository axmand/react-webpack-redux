import React, { Component } from 'react';
import PropTypes from 'prop-types';
//UI
import { FormLabel, FormControlLabel } from 'material-ui/Form';
import Dialog,{ DialogActions, DialogContent, DialogContentText } from 'material-ui/Dialog';
import Switch from 'material-ui/Switch';
import Button from 'material-ui/Button';
//自定义组件
import SelfCard from './SelfCard'
//Redux
import {connect} from 'react-redux'


class SelfContent extends Component {

  render() {
    const { 
      handleDeleteCard,
      handleShowDelDialog,
      showDelDialog,
      handleCloseDelDialog,
      SwitchChecked,
      handleSwitchChange,
      ButtonDisabled
    } = this.props
    
    return (
      <div>
        <FormControlLabel
          control={
            <Switch
               checked = { SwitchChecked }
               onChange = { handleSwitchChange }
            />
          }
          label="编辑"
        />
       <FormLabel  >
          <Button onClick={ handleShowDelDialog } disabled = { ButtonDisabled }>删除</Button>
          <Button disabled = { ButtonDisabled }>完成</Button>
       </FormLabel>
      
       <Dialog
          open={ showDelDialog }
          onRequestClose={ handleCloseDelDialog }
       >
          <DialogContent>
            <DialogContentText>
              确定删除所选项目？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={ handleCloseDelDialog } color="default">
              取消
            </Button>
            <Button onClick={ handleDeleteCard } color="primary">
              确认
            </Button>
          </DialogActions>
       </Dialog>
       <SelfCard/>
      </div>
    );
  }
}

SelfContent.propTypes = {
  handleDeleteCard:PropTypes.func.isRequired,
  handleCloseDelDialog:PropTypes.func.isRequired,
  handleShowDelDialog:PropTypes.func.isRequired,
  showDelDialog:PropTypes.bool.isRequired,
  SwitchChecked:PropTypes.bool.isRequired,
  handleSwitchChange:PropTypes.func.isRequired,
  ButtonDisabled:PropTypes.bool.isRequired,
}

//声明State与Action
const mapStateToProps = (state,ownProps) => {

  return {
     showDelDialog: state.ProjectReduce.showDelDialog,
     SwitchChecked: state.ProjectReduce.SwitchChecked,
     ButtonDisabled: state.ProjectReduce.ButtonDisabled
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDeleteCard:()=>{
      dispatch({
         type: 'handleDeleteCard',
			})
    },

    handleShowDelDialog:()=>{
      dispatch({
         type: 'handleShowDelDialog',
			})
    },

    handleCloseDelDialog:()=>{
      dispatch({
         type: 'handleCloseDelDialog',
			})
    },

    handleSwitchChange:()=>{
      dispatch({
        type: 'handleSwitchChange',
      })
    }
	} 
}  		

export default connect(mapStateToProps, mapDispatchToProps)(SelfContent);



