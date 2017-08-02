import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import UI
import {ListItem} from 'material-ui/List';
import Switch from 'material-ui/Switch';

class RealtimeMapping extends Component {

  render() {
    const {realtimeMappingIsChecked,handleRealtimeMapping}=this.props;

    return (
        <div>
          <ListItem style={{
            flexDirection: 'column', 
            border: 0,    
            background: 'rgba(255, 255, 255, .75)',
            borderRadius: 5,      
          }}>
            <Switch
            onClick={handleRealtimeMapping}
            checked={realtimeMappingIsChecked}
            />
            <span>实时<br/>成图</span>
          </ListItem>
        </div>
    );
  }
}

RealtimeMapping.propTypes = {
  // realtimeMappingIsChecked:PropTypes.bool.isRequired,
  // handleRealtimeMapping:PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        realtimeMappingIsChecked:state.realtimeMappingIsChecked
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      handleRealtimeMapping:()=>{
        dispatch({
          type:'handleRealtimeMapping'
				})
            }
        }
}  		
export default connect(mapStateToProps, mapDispatchToProps)(RealtimeMapping);