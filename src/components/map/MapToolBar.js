/**
 * 
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
//ui
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon } from 'material-ui/List'
//图标
// import ContentCopy from 'material-ui-icons/ContentCopy';
import FontAwesome from 'react-fontawesome'
// import Flag from 'material-ui-icons/Flag';
// import Add from 'material-ui-icons/Add';
// import  Remove from 'material-ui-icons/Remove';
// import  Search from 'material-ui-icons/Search';
// import  RadioButtonChecked from 'material-ui-icons/RadioButtonChecked';
//组件
import LayerControl from './LayerControl';
import RealtimeMapping from './RealtimeMapping';

const styles ={
  list:{
    position:'absolute',
    top:'80px',
    right:'20px',
    width: '40px'
  },
  listitem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '40px',
    padding: '0px',
    border: 0,    
    background: 'rgba(255, 255, 255, .75)',
    borderRadius: 5,
  },
}

class MapToolBar extends Component{

    render(){
      
        const classes = this.props.classes;
        const { onClick }= this.props;

        return(
          <div>
            <List className={classes.list}>
              <LayerControl  />
              <ListItem dense={true} />
              <ListItem button className={classes.listitem} disableGutters={true} onClick={()=>onClick("get_location")}>
                <ListItemIcon>
                  <FontAwesome
                    name='location-arrow'
                    size='lg'
                    style={{
                      width: '16.76px',
                      height: '21.33px',
                      marginRight: '0px',
                      marginTop: '5.33px',
                      color: '#000000',
                    }}
                  />
                </ListItemIcon>
              </ListItem>
              <ListItem dense={true} />
              <ListItem button className={classes.listitem} disableGutters={true} onClick={()=>onClick("zoom_in")}>
                <ListItemIcon>
                  <FontAwesome
                    name='plus'
                    size='lg'
                    style={{
                      width: '16.76px',
                      height: '21.33px',
                      marginRight: '0px',
                      marginTop: '5.33px',
                      color: '#000000',
                    }}
                  />
                </ListItemIcon>                          
              </ListItem>
              <ListItem dense={true} />
              <ListItem button className={classes.listitem} disableGutters={true} onClick={()=>onClick("zoom_out")}>
                <ListItemIcon>
                  <FontAwesome
                    name='minus'
                    size='lg'
                    style={{
                      width: '16.76px',
                      height: '21.33px',
                      marginRight: '0px',
                      marginTop: '5.33px',
                      color: '#000000',
                    }}
                  />
                </ListItemIcon>                          
              </ListItem>
              <ListItem dense={true} />
              <ListItem button className={classes.listitem} disableGutters={true} onClick={()=>onClick("zoom_out")}>
                <ListItemIcon>
                  <FontAwesome
                    name='search'
                    size='lg'
                    style={{
                      width: '19.8px',
                      height: '21.33px',
                      marginRight: '0px',
                      marginTop: '5.33px',
                      color: '#000000',
                    }}
                  />
                </ListItemIcon>                          
              </ListItem>
              <ListItem dense={true} />              
              <RealtimeMapping />             
            </List>
          </div>
        )
    }
}

MapToolBar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles,{name:'MapToolBar'})(MapToolBar);
